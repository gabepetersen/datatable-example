import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { LoadingComponent } from 'src/app/components/loading/loading.component';



@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  public dialogRef: MatDialogRef<any>;

  constructor(
    private dialog: MatDialog,
  ) { }

  start() {
    this.dialogRef = this.dialog.open(LoadingComponent);
    console.log('opened', this.dialogRef)
  }

  stop() {
    this.dialogRef.close();
    console.log('closed', this.dialogRef);
  }
}
