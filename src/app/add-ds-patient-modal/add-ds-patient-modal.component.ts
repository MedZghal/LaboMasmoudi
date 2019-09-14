import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DatePipe} from '@angular/common';
import {MatDialogRef} from '@angular/material';
import {BackendService} from '../backend.service';
import Swal from 'sweetalert2';
import {catchError, timeout} from 'rxjs/operators';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});

@Component({
  selector: 'app-add-ds-patient-modal',
  templateUrl: './add-ds-patient-modal.component.html',
  styleUrls: ['./add-ds-patient-modal.component.scss'],
  providers:[DatePipe]
})
export class AddDsPatientModalComponent implements OnInit {

  PatientForm: FormGroup;
  loading = false;
  submitted = false;
  action;
  constructor(private formBuilder: FormBuilder,
              private authenticationService: BackendService,
              public dialogRef: MatDialogRef<any>,
              private datepipe :DatePipe) { }

  ngOnInit() {
    this.action = false;
    this.PatientForm = this.formBuilder.group({
      nom: ['', [Validators.required,Validators.pattern('[A-Z a-z]+')]],
      prenom: ['', [Validators.required,Validators.pattern('[A-Z a-z]+')]],
      datenaiss: ['', Validators.required],
      tel: ['', [Validators.required,Validators.pattern('[0-9]{8}')]],
      mail: ['', [Validators.required, Validators.email]],
      adresse: ['', Validators.required]
    });
  }

  get f() { return this.PatientForm.controls; }


  onSubmit() {
      this.submitted = true;

    // stop here if form is invalid
    if (this.PatientForm.invalid) {
      return;
    }

    this.loading = true;

    let dataParam = new FormData();
    dataParam.append('nom',this.f.nom.value);
    dataParam.append('prenom',this.f.prenom.value);
    dataParam.append('date_Ness',this.datepipe.transform(this.f.datenaiss.value,'yyyy-MM-dd') );
    dataParam.append('numero',this.f.tel.value);
    dataParam.append('e_mail',this.f.mail.value);
    dataParam.append('adresse',this.f.adresse.value);
    dataParam.append('action','set');

    this.authenticationService.post('patient/',dataParam ).pipe(
      timeout(10000),
      catchError(error => {

          Toast.fire({
            type: 'error',
            title: 'Le délai d\'attente est écoulé'
          });

        throw new Error(error);

      })
    ).subscribe(
        data => {
          Toast.fire({
            type: 'success',
            title: 'Patient ajouté avec succès'
          });
          this.loading = false;
          this.action = true;
          this.dialogRef.close({action:this.action});
          console.log(data);

        },
        error => {
          console.log(error);
          this.loading = false;
        });
  }
}
