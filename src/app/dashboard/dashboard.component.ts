import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FileModalComponent} from '../file-modal/file-modal.component';
import {AddDsPatientModalComponent} from '../add-ds-patient-modal/add-ds-patient-modal.component';
import {ResultatModalComponent} from '../resultat-modal/resultat-modal.component';
import {BackendService} from '../backend.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class DashboardComponent implements OnInit {

  dataSource = [];
  columns =['nom', 'prenom', 'date_Ness', 'adresse', 'e_mail', 'numero'];
  columnsToDisplay = ['nom', 'prenom', 'date_Ness', 'adresse', 'e_mail', 'numero','Action'];
  displayedColumns: string[] = ['id', 'descp', 'Date_Creation','Action'];
  expandedElement: any | null;
  constructor(private authenticationService: BackendService,
              public dialog: MatDialog) { }

  ngOnInit() {

    this.getAllPatient();

  }


  getAllPatient(){
    this.authenticationService.get('patient/')
      .subscribe(
        (data:any) => {
          console.log(data);
          this.dataSource = data;

        },
        error => {
          console.log(error);

        });
  }

  openDialog(data,component): void {
    let dialogRef;

    if(component === 'AddDsPatientModalComponent')
        dialogRef = this.dialog.open(AddDsPatientModalComponent, {
          width: '1200px',
        });
      else
        if(component === 'ResultatModalComponent')
          dialogRef = this.dialog.open(ResultatModalComponent, {
            width: '1200px',
            data: data
          });

    dialogRef.afterClosed().subscribe((result:any) => {
      if(result !== undefined)
        if(result.action === true)
          this.getAllPatient();
    });
  }

  dropdown(ev){
    ev.stopPropagation();
    console.log('drop')
  }

  delete(id,obj){
    let formParam = new FormData();
    formParam.append('id',id);
    formParam.append('action','delete');

    this.authenticationService.post(obj,formParam)
      .subscribe(
        (data:any) => {
          console.log(data);
          this.getAllPatient();
        },
        error => {
          console.log(error);
          if(error.status === 400)
            if(obj === 'resultat/')
              alert('Avertissement résultat contient des fichiers');
            else
              alert('Avertissement patient a des résultats');

        });
  }
}
