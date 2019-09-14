import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-content-example-dialog',
  templateUrl: './dialog-content-example-dialog.component.html',
  styleUrls: ['./dialog-content-example-dialog.component.scss']
})
export class DialogContentExampleDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    console.log(this.data);
  }

}
