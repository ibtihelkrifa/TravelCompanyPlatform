import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService as AuthGuard } from './services/auth/auth-guard.service';

import { AcceuilComponent } from './components/acceuil/acceuil.component';
import { AdminComponent } from './components/admin/admin.component';
import { VilleComponent } from './components/ville/ville.component';
import { LoginComponent } from './components/login/login.component';
import { VolComponent } from './components/vol/vol.component';
import { ReservationComponent } from './components/reservation/reservation.component';
import { HotelComponent } from './components/hotel/hotel.component';
import { TransportComponent } from './components/transport/transport.component';
const routes: Routes = [
  { path: '', component: AcceuilComponent },
  { path: 'vols', component: VolComponent },
  { path: 'Ville', component: VilleComponent },
  { path: 'Login', component: LoginComponent },
  { path: 'hotels', component: HotelComponent },
  { path: 'transport', component: TransportComponent },
  { path: 'Admin', component: AdminComponent, canActivate: [AuthGuard] },
  { path: 'reservations', component: ReservationComponent },
  { path: '**', redirectTo: '' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
