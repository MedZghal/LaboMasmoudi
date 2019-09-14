import { Component, OnInit } from '@angular/core';
import {BackendService} from '../backend.service';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {FileModalComponent} from '../file-modal/file-modal.component';
import {AddDsPatientModalComponent} from '../add-ds-patient-modal/add-ds-patient-modal.component';
import {ResultatModalComponent} from '../resultat-modal/resultat-modal.component';
import {RowContentComponent} from '../row-content/row-content.component';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.scss']
})
export class DashbordComponent implements OnInit {

  public rows:Array<any> = [];
  public columns:Array<any> = [
    {title: 'nom', name: 'nom', filtering: {filterString: '', placeholder: 'Filter by name'}},
    {title: 'prenom', name: 'prenom', editable:true, options:["France", "Venezuela", "Macao"]},
    {title: 'date_Ness', name: 'date_Ness', editable: true, editWith: 'position'},
    {title: 'e_mail', name: 'e_mail', editable: true, editWith: 'position'},
    {title: 'adresse', name: 'adresse', editable: true, editWith: 'position'},
    {title: 'numero', name: 'numero', editable: true, editWith: 'position'},
  ];

  public page:number = 1;
  public itemsPerPage:number = 10;
  public maxSize:number = 5;
  public numPages:number = 1;
  public length:number = 0;
  public rowsToRender:number = 35;
  public rowInputs = {
    data : <any>[],
    parent :this
  };
  public rowComponent = RowContentComponent;


  public config:any = {
    paging: false,
    sorting: {columns: this.columns},
    filtering: {filterString: ''},
    className: ['table-striped', 'table-bordered'],
    height: '100%',
    renderMoreAt : 0.85,
    infiniteScroll : true
  };

  private data:Array<any> = [];


  constructor(private authenticationService :BackendService,
              private router: Router,
              public dialog: MatDialog) {

    this.length = this.data.length;
    if (this.authenticationService.isAuthenticated()) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.getAllPatient();


  }


  getAllPatient(){
    this.authenticationService.get('patient/')
      .subscribe(
        (data:any) => {
          console.log(data);
          this.data = data;

          console.log(this.rowInputs);

          // if(this.rowInputs.data.length > 0)
          //   this.rowInputs.data = this.data.find(item => item.id === this.rowInputs.data.row.id);

          this.onChangeTable(this.config);

        },
        error => {
          console.log(error);

        });
  }

  openDialog(data,component){
    let dialogRef;
    if(component === 'FileModalComponent')
      dialogRef = this.dialog.open(FileModalComponent, {
        width: '1200px',
        data: data
      });
    else
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



  public changePage(page:any, data:Array<any> = this.data):Array<any> {
    let start = (page.page - 1) * page.itemsPerPage;
    let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
    return data.slice(start, end);
  }

  public changeSort(data:any, config:any):any {
    if (!config.sorting) {
      return data;
    }

    let columns = this.config.sorting.columns || [];
    let columnName:string = void 0;
    let sort:string = void 0;

    for (let i = 0; i < columns.length; i++) {
      if (columns[i].sort !== '' && columns[i].sort !== false) {
        columnName = columns[i].name;
        sort = columns[i].sort;
      }
    }

    if (!columnName) {
      return data;
    }

    // simple sorting
    return data.sort((previous:any, current:any) => {
      if (previous[columnName] > current[columnName]) {
        return sort === 'desc' ? -1 : 1;
      } else if (previous[columnName] < current[columnName]) {
        return sort === 'asc' ? -1 : 1;
      }
      return 0;
    });
  }

  public changeFilter(data:any, config:any):any {
    let filteredData:Array<any> = data;
    this.columns.forEach((column:any) => {
      if (column.filtering) {
        filteredData = filteredData.filter((item:any) => {
          return item[column.name].match(column.filtering.filterString);
        });
      }
    });

    if (!config.filtering) {
      return filteredData;
    }

    if (config.filtering.columnName) {
      return filteredData.filter((item:any) =>
        item[config.filtering.columnName].match(this.config.filtering.filterString));
    }

    let tempArray:Array<any> = [];
    filteredData.forEach((item:any) => {
      let flag = false;
      this.columns.forEach((column:any) => {
        if (item[column.name].toString().match(this.config.filtering.filterString)) {
          flag = true;
        }
      });
      if (flag) {
        tempArray.push(item);
      }
    });
    filteredData = tempArray;

    return filteredData;
  }

  public onChangeTable(config:any, page:any = {page: this.page, itemsPerPage: this.itemsPerPage}):any {
    if (config.filtering) {
      Object.assign(this.config.filtering, config.filtering);
    }

    if (config.sorting) {
      Object.assign(this.config.sorting, config.sorting);
    }

    let filteredData = this.changeFilter(this.data, this.config);
    let sortedData = this.changeSort(filteredData, this.config);

    if(sortedData.length > this.rowsToRender && config.infiniteScroll){
      this.rows = sortedData.slice(0, this.rowsToRender);
      this.length = this.rows.length;
    }else{
      this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
      this.length = sortedData.length;
    }
  }

  public onScrollDown(){
    this.rowsToRender += 25;
    this.onChangeTable(this.config);
  }

  public expanderClicked(row: any){
    this.rowInputs.data = row;
  }

  editRow(changeData:any){
    console.log(changeData);
    // here you would maybe make some http request or do validation
    for(let change of changeData){
      if(change.newValue !== ""){
        this.rows[change.rowIndex][change.columnChanged] = change.newValue;
      }
    }
  }

  public onCellClick(data: any): any {
    console.log(data);
  }

}
