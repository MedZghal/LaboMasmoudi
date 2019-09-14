import {Component, Input, OnInit} from '@angular/core';
import {FileModalComponent} from '../file-modal/file-modal.component';
import {MatDialog} from '@angular/material';
import {ResultatModalComponent} from '../resultat-modal/resultat-modal.component';

@Component({
  selector: 'app-row-content',
  templateUrl: './row-content.component.html',
  styleUrls: ['./row-content.component.scss']
})
export class RowContentComponent implements OnInit {

  @Input() data:any = {};
  @Input() parent:any;
  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    console.log(this.data);
  }

  openDialog(data,component){
    let dialogRef;

    if(component === 'ResultatModalComponent')
      dialogRef = this.dialog.open(ResultatModalComponent, {
        width: '1200px',
        data: data
      });
    else
      dialogRef = this.dialog.open(FileModalComponent, {
        width: '1200px',
        data: data
      });


    dialogRef.afterClosed().subscribe((result:any) => {
      if(result !== undefined)
        if(result.action === true)
          this.parent.getAllPatient();
    });
  }
}
