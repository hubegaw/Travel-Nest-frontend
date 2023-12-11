import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {NotFoundComponent} from "./components/errors/not-found/not-found.component";
import {FlightsComponent} from "./components/flights/flights.component";
import {JourneyComponent} from "./components/user/journey/journey.component";
import {ProfileComponent} from "./components/user/profile/profile.component";
import {HotelsComponent} from "./components/hotels/hotels.component";
import {authGuard} from "./services/auth.guard";

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {path: 'home', component: HomeComponent},
  {path: 'flights', component: FlightsComponent},
  {path: 'hotels', component: HotelsComponent},
  {path: 'user/journeys', component: JourneyComponent, canActivate: [authGuard]},
  {path: 'user/profile', component: ProfileComponent, canActivate: [authGuard]},
  {path: 'not-found', component: NotFoundComponent},
  {path: '**', redirectTo: 'not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
