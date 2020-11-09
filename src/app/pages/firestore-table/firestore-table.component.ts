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
    private firestore: AngularFirestore,
  ) {}

  async ngOnInit() {
    this.dataSource = new MatTableDataSource();
    
    this.updateTableData();

    this.dataSource.sort = this.sort;
    this.errorText = '';
  }

  /**
   * submit submits the json array to the database
   */
  public async submit() {
    // await this.deleteCollection();
    await this.uploadData();
    this.updateTableData();
    this.jsondata.reset();
  }

  /**
   * uploadData() takes the data array from the textarea and tries to upload the entries into the firestore table collection
   */
  public async uploadData() {
    try {
      // get data from form control
      var jsonArray = JSON.parse(this.jsondata.value);
      if (jsonArray[0]) {
        // declare collection
        const tableCollection = this.firestore.collection<any>('table');
        var matchKeys = Object.keys(jsonArray[0])

        // for each object in array
        jsonArray.forEach( async (item: Object) => {
          // check if it is valid to the first object
          const match = matchKeys.every(key => item.hasOwnProperty(key));
          console.log(match);
          // if the entry is valid 
          if (match) {
            // put in firestore
            await tableCollection.add(item);
          }
        });
      }
    } catch (err) {
      console.error(err);
      this.errorText = err;
    }
  }

  /**
   * updateTableData refreshes the UI table with whatever is currently in the firestore table collection
   */
  public updateTableData() {
    try {
      // declare collection
      const tableCollection = this.firestore.collection<any>('table');
      // get the entire collection
      tableCollection.valueChanges().subscribe(dataArray => {
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
        // set the data columns for the ui
        this.setDataColumns();
      });
    } catch (err) {
      console.error(err);
      this.errorText = err;
    }
  }

  /**
   * setDataColumns sets the datacolumns and sorts them alphabetically
   */
  public setDataColumns() {
    if (this.dataSource.data[0]) {
      this.dataColumns = Object.keys(this.dataSource.data[0]);
      // sort the data columns alphabetically
      this.dataColumns = this.dataColumns.sort((a, b) => {
        return (a < b ? -1 : 1);
      });
    } 
  }

  /**
   * deleteCollection deletes all of the firestore collection under 'table'
   */
  public async deleteCollection() {
    this.firestore.collection<any>('table').get().subscribe((res) => {
      res.docs.forEach( async (doc) => {
        await doc.ref.delete();
      })
    });
  }

  /**
   * handleDelete deletes the collection from UI button press
   */
  public handleDelete() {
    console.log('Deleting...');
    this.deleteCollection().then(() => {
      // update the table data
      this.updateTableData();
      console.log("Collection Deleted!");
    }).catch((err) => {
      console.error(err);
      this.errorText = err;
    });
  }

  /**
   * applies a temporary filter to the users
   * @param filterValue 
   */
  public applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.toLowerCase();
  }

}
