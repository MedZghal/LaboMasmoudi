import { BrowserModule } from '@angular/platform-browser';
import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccueilComponent } from './accueil/accueil.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatVideoModule } from 'mat-video';
import {
  MAT_DATE_FORMATS, MatAutocompleteModule,
  MatButtonModule, MatCardModule, MatDatepickerModule,
  MatDialogModule,
  MatFormFieldModule,
  MatGridListModule, MatIconModule,
  MatInputModule, MatMenuModule, MatNativeDateModule, MatRippleModule, MatSelectModule,
  MatTableModule,
  MatToolbarModule
} from '@angular/material';
import { SimulateurComponent } from './simulateur/simulateur.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { DialogContentExampleDialogComponent } from './dialog-content-example-dialog/dialog-content-example-dialog.component';
import { DocumentComponent } from './document/document.component';
import { PresentationComponent } from './presentation/presentation.component';
import { VisiteComponent } from './visite/visite.component';
import { VenirJeunComponent } from './venir-jeun/venir-jeun.component';
import { PrelevementDomicileComponent } from './prelevement-domicile/prelevement-domicile.component';
import { ActivitesComponent } from './activites/activites.component';
import { ContactComponent } from './contact/contact.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LoginComponent } from './login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DashbordComponent } from './dashbord/dashbord.component';
import {HttpClientModule} from '@angular/common/http';
import {ResultatModalComponent} from './resultat-modal/resultat-modal.component';
import {AddDsPatientModalComponent} from './add-ds-patient-modal/add-ds-patient-modal.component';
import {FileModalComponent} from './file-modal/file-modal.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import { RowContentComponent } from './row-content/row-content.component';
import {Ng2TableModule} from 'ng2-expanding-table';


@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    SimulateurComponent,
    DialogContentExampleDialogComponent,
    DocumentComponent,
    PresentationComponent,
    VisiteComponent,
    VenirJeunComponent,
    PrelevementDomicileComponent,
    ActivitesComponent,
    ContactComponent,
    LoginComponent,
    DashbordComponent,
    FileModalComponent,
    AddDsPatientModalComponent,
    ResultatModalComponent,
    DashboardComponent,
    RowContentComponent
  ],
  entryComponents: [
    DialogContentExampleDialogComponent,
    FileModalComponent,
    AddDsPatientModalComponent,
    ResultatModalComponent,
    RowContentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatVideoModule,
    MatIconModule,
    DragDropModule,
    MatButtonModule,
    ScrollingModule,
    MatDialogModule,
    LeafletModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule,
    MatMenuModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    MatTableModule,
    FormsModule,
    MatInputModule,
    MatToolbarModule,
    MatGridListModule,
    MatCardModule,
    MatNativeDateModule,
    MatRippleModule,
    MatSelectModule,
    Ng2TableModule
  ],
  providers: [ {
    provide: MAT_DATE_FORMATS,
    useValue: {
      parse: {
        dateInput: ['LL'],
      },
      display: {
        dateInput: 'YYYY-MM-DD',
        monthYearLabel: 'YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'YYYY',
      },
    },
  }],
  bootstrap: [AppComponent],
  schemas:[NO_ERRORS_SCHEMA]
})
export class AppModule { }
