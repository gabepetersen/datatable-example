import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl } from '@angular/forms';

import { MatPaginator } from '@angular/material/paginator'; 
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-firestore-table',
  templateUrl: './firestore-table.component.html',
  styleUrls: ['./firestore-table.component.scss']
})
export class FirestoreTableComponent implements OnInit {
  public preDataSource: Array<Object>;
  public currentIdList: Array<String>;
  public dataSource: MatTableDataSource<any>;
  public dataColumns: Array<String>;
  public errorText: String;
  public jsondata = new FormControl('');

  private sort: MatSort;
  private paginator: MatPaginator;
  /* 
    Trick I saw to set the paginator/sort correctly Since paginator/sort has problems being in conditional DOM 
    Set dataSource paginator/sort immediatley on viewing the element
  */
  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.dataSource.sort = this.sort;
  }
  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.dataSource.paginator = this.paginator;
  }

  constructor(
    private firestore: AngularFirestore
  ) {}

  async ngOnInit() {
    this.dataSource = new MatTableDataSource();
    
    await this.updateTableData();

    this.dataSource.sort = this.sort;

    this.errorText = '';
  }

  /**
   * submit submits the json array to the database
   */
  public async submit() {
    await this.deleteCollection();
    await this.uploadData();
    this.updateTableData();
  }

  public uploadData() {
    return new Promise((resolve, reject) => {
      try {
        // get data from form control
        var jsonArray = JSON.parse(this.jsondata.value);
        if (jsonArray[0]) {
          // declare collection
          const tableCollection = this.firestore.collection<any>('table');
          var matchKeys = Object.keys(jsonArray[0])

          // for each object in array
          jsonArray.forEach((item: Object) => {
            // check if it is valid to the first object
            const match = matchKeys.every(key => item.hasOwnProperty(key));
            console.log(match);
            // if the entry is valid 
            if (match) {
              // put in 
              tableCollection.add(item).catch((err) => {
                console.error(err);
                reject(err)
                this.errorText = err;
                return;
              });
            }
          });
          resolve();
        }
      } catch (err) {
        console.error(err);
        this.errorText = err;
        reject(err);
      }
    });
  }

  public async updateTableData() {
    // declare collection
    const tableCollection = this.firestore.collection<any>('table');
    tableCollection.valueChanges().subscribe(dataArray => {
      console.log(dataArray);
      this.dataSource.data = dataArray.map((item) => {
        var newItem = {};
        var keys = Object.keys(item);
        keys.forEach((key) => {
          // if the key-value is an array
          if (Array.isArray(item[key])) {
            // replace so table can read
            newItem[key] = item[key].length;
          } else {
            newItem[key] = item[key];
          }
        });
        return newItem;
      });
    });
    console.log(this.dataSource.data);
    this.dataColumns = Object.keys(this.dataSource.data[0]);
  }

  public async deleteCollection() {
    this.firestore.collection<any>('table').get().subscribe((res) => {
      res.docs.forEach((doc) => {
        doc.ref.delete();
      })
    });
    console.log('delete complete');
  }

}
