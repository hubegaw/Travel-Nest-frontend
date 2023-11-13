import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {NotFoundComponent} from "./components/errors/not-found/not-found.component";
import {FlightsComponent} from "./components/flights/flights.component";
import {JourneyComponent} from "./components/user/journey/journey.component";
import {ProfileComponent} from "./components/user/profile/profile.component";

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {path: 'home', component: HomeComponent},
  {path: 'flights', component: FlightsComponent},
  {path: 'user/journeys', component: JourneyComponent},
  {path: 'user/profile', component: ProfileComponent},
  {path: 'not-found', component: NotFoundComponent},
  {path: '**', redirectTo: 'not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
