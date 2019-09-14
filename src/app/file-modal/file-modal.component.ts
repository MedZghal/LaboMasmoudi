import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {BackendService} from '../backend.service';
import {catchError, timeout} from 'rxjs/operators';

declare var $ : any;
import Swal from 'sweetalert2';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});

@Component({
  selector: 'app-file-modal',
  templateUrl: './file-modal.component.html',
  styleUrls: ['./file-modal.component.scss']
})
export class FileModalComponent implements OnInit {

  Files = [];
  Resultat :any=[];
  Exist;
  action;

  constructor(private authenticationService: BackendService,
              public dialogRef: MatDialogRef<any>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.Resultat = data;
    console.log(this.Resultat.id);
  }

  ngOnInit() {

    this.action = false;
    this.Exist = true;
    let dataParam ={
      idResultat:this.Resultat.id
    };

    this.authenticationService.get('files/',dataParam).pipe(
      timeout(10000),
      catchError(error => {

        if(error.status === 404){
          this.Exist = false;
          this.InitFiles();
          Toast.fire({
            type: 'warning',
            title: 'Aucun fichier pour cet examen'
          });
          console.log('aucune fichiers pour ce examen');
        }else
          Toast.fire({
            type: 'error',
            title: 'Le délai d\'attente est écoulé'
          });

        throw new Error(error);

      })
    )
      .subscribe(
        (data:any) => {
          this.Exist = true;
          this.action = true;
          console.log(data);
          this.Files = data;
          this.initfiles();


        },
        error => {
            //console.log(error)

        });
  }

  initfiles() {

    let initialPreviewsConfig =[];
    let initialPreviews =[];

    for(let res of this.Files){
      initialPreviews.push('https://labo-benyoussef.tn/api/v1/files?id='+res.id);

      console.log(res.type === 'application/pdf'?'pdf':'png');
      if(res.type === 'application/pdf' || res.type === 'application/vnd.open' || res.type === 'application/octet-st' || res.type === 'text/plain'){
        let Filetype ='';

        switch (res.type) {
          case 'application/pdf': {Filetype = 'pdf';break;}
          case 'application/vnd.open': {Filetype = 'gdocs';break;}
          case 'application/octet-st': {Filetype = 'pdf';break;}
          case 'text/plain': {Filetype = 'text';break;}
        }

        initialPreviewsConfig.push({
          key:res.id,
          filename :res.name,
          type: Filetype,
          caption :res.name+'_'+res.id,
          url :'https://labo-benyoussef.tn/api/v1/files/',
          extra: {id: res.id,action:'delete'}
        });
      }else
        initialPreviewsConfig.push({
          key:res.id,
          filename :res.name,
          caption :res.name+'_'+res.id,
          url :'https://labo-benyoussef.tn/api/v1/files/',
          extra: {id: res.id,action:'delete'}
        });
    }


    $("#file").fileinput('destroy');
    $("#file").fileinput({
      overwriteInitial: false,
      uploadUrl:'https://labo-benyoussef.tn/api/v1/files/',
      uploadExtraData: {
        action: "set",
        id_result: this.Resultat.id,
      },
      browseOnZoneClick: true,
      initialPreviewAsData: true,
      initialPreview: initialPreviews,
      initialPreviewConfig: initialPreviewsConfig,
      fileActionSettings: {
        'showRemove':true,
        'showDrag' :false,
        'showDownload': true,
        'zoomIcon': '<i class="fas fa-search-plus text-primary"></i>',
        'removeIcon': '<i class="fas fa-trash-alt text-primary"></i>',
        'uploadIcon': '<i class="fas fa-file-upload text-primary"></i>',
        'downloadIcon': '<i class="fas fa-download text-primary"></i>',
        'indicatorNew': '&nbsp;'
      },
      language: 'fr', // utilise le js de traduction
      showClose: false,
      showCaption: false,
      showBrowse: false,
      showUpload: true,
      maxFileCount: 4,
      allowedPreviewTypes: null,
      preferIconicPreview: true,
      previewFileIconSettings: {
        'doc': '<i class="fa fa-file-word text-primary"></i>',
        'xls': '<i class="fa fa-file-excel text-success"></i>',
        'ppt': '<i class="fa fa-file-powerpoint text-danger"></i>',
        'jpg': '<i class="fas fa-file-image text-danger"></i>',
        'gif': '<i class="fas fa-file-image text-muted"></i>',
        'png': '<i class="fas fa-file-image text-primary"></i>',
        'pdf': '<i class="fas fa-file-pdf text-danger"></i>',
        'zip': '<i class="fas fa-file-archive text-muted"></i>',
        'htm': '<i class="fas fa-file-code text-info"></i>',
        'txt': '<i class="fas fa-file-alt text-primary"></i>',
        'mov': '<i class="fas fa-file-movie text-warning"></i>',
        'mp3': '<i class="fas fa-file-audio text-warning"></i>',
        'jpeg': '<i class="fas fa-file-image text-danger"></i>',
      },
      previewFileExtSettings: {
        'doc': function (ext) {
          return ext.match(/(doc|docx)$/i);
        },
        'xls': function (ext) {
          return ext.match(/(xls|xlsx)$/i);
        },
        'ppt': function (ext) {
          return ext.match(/(ppt|pptx)$/i);
        },
        'zip': function (ext) {
          return ext.match(/(zip|rar|tar|gzip|gz|7z)$/i);
        },
        'htm': function (ext) {
          return ext.match(/(php|js|css|htm|html)$/i);
        },
        'txt': function (ext) {
          return ext.match(/(txt|ini|md)$/i);
        },
        'mov': function (ext) {
          return ext.match(/(avi|mpg|mkv|mov|mp4|3gp|webm|wmv)$/i);
        },
        'mp3': function (ext) {
          return ext.match(/(mp3|wav)$/i);
        },
      }

    });

    $("#file").fileinput('enable');
  }


  InitFiles(){
    $("#file").fileinput('destroy');
    $("#file").fileinput({
      overwriteInitial: false,
      uploadUrl:'https://labo-benyoussef.tn/api/v1/files/',
      uploadExtraData: {
        action: "set",
        id_result: this.Resultat.id,
      },
      browseOnZoneClick: true,
      initialPreviewAsData: true,
      fileActionSettings: {
        'showRemove':true,
        'showDrag' :false,
        'showDownload': true,
        'zoomIcon': '<i class="fas fa-search-plus text-primary"></i>',
        'removeIcon': '<i class="fas fa-trash-alt text-primary"></i>',
        'uploadIcon': '<i class="fas fa-file-upload text-primary"></i>',
        'downloadIcon': '<i class="fas fa-download text-primary"></i>',
        'indicatorNew': '&nbsp;'
      },
      language: 'fr', // utilise le js de traduction
      showClose: false,
      maxFileCount: 4,
      showCaption: false,
      showBrowse: false,
      showUpload: true,
      browseClass: "btn btn-primary btn-block",
      allowedPreviewTypes: null,
      preferIconicPreview: true,
      previewFileIconSettings: {
        'doc': '<i class="fa fa-file-word text-primary"></i>',
        'xls': '<i class="fa fa-file-excel text-success"></i>',
        'ppt': '<i class="fa fa-file-powerpoint text-danger"></i>',
        'jpg': '<i class="fas fa-file-image text-danger"></i>',
        'gif': '<i class="fas fa-file-image text-muted"></i>',
        'png': '<i class="fas fa-file-image text-primary"></i>',
        'pdf': '<i class="fas fa-file-pdf text-danger"></i>',
        'zip': '<i class="fas fa-file-archive text-muted"></i>',
        'htm': '<i class="fas fa-file-code text-info"></i>',
        'txt': '<i class="fas fa-file-alt text-primary"></i>',
        'mov': '<i class="fas fa-file-movie text-warning"></i>',
        'mp3': '<i class="fas fa-file-audio text-warning"></i>',
        'jpeg': '<i class="fas fa-file-image text-danger"></i>',
      },
      previewFileExtSettings: {
        'doc': function (ext) {
          return ext.match(/(doc|docx)$/i);
        },
        'xls': function (ext) {
          return ext.match(/(xls|xlsx)$/i);
        },
        'ppt': function (ext) {
          return ext.match(/(ppt|pptx)$/i);
        },
        'zip': function (ext) {
          return ext.match(/(zip|rar|tar|gzip|gz|7z)$/i);
        },
        'htm': function (ext) {
          return ext.match(/(php|js|css|htm|html)$/i);
        },
        'txt': function (ext) {
          return ext.match(/(txt|ini|md)$/i);
        },
        'mov': function (ext) {
          return ext.match(/(avi|mpg|mkv|mov|mp4|3gp|webm|wmv)$/i);
        },
        'mp3': function (ext) {
          return ext.match(/(mp3|wav)$/i);
        },
      }

    });

    $("#file").fileinput('enable');
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
