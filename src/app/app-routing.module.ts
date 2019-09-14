import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AccueilComponent} from './accueil/accueil.component';
import {SimulateurComponent} from './simulateur/simulateur.component';
import {DocumentComponent} from './document/document.component';
import {PresentationComponent} from './presentation/presentation.component';
import {VisiteComponent} from './visite/visite.component';
import {VenirJeunComponent} from './venir-jeun/venir-jeun.component';
import {PrelevementDomicileComponent} from './prelevement-domicile/prelevement-domicile.component';
import {ActivitesComponent} from './activites/activites.component';
import {ContactComponent} from './contact/contact.component';
import {LoginComponent} from './login/login.component';
import {AuthGuardGuard} from './auth-guard.guard';
import {DashboardComponent} from './dashboard/dashboard.component';
import {DashbordComponent} from './dashbord/dashbord.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/Accueil',
    pathMatch: 'full'
  },
  {
    path : 'Accueil',
    component : AccueilComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path : 'Simulateur',
    component : SimulateurComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path : 'Document',
    component : DocumentComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path : 'Présentation',
    component : PresentationComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path : 'Preparer-votre-visite',
    component : VisiteComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path : 'Venir-jeun',
    component : VenirJeunComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path : 'Prelevement-domicile',
    component : PrelevementDomicileComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path : 'Activites',
    component : ActivitesComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path : 'Contact',
    component : ContactComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path : 'login',
    component : LoginComponent
  },
  {
    path : 'Dashboard',
    component : DashbordComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true,onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
