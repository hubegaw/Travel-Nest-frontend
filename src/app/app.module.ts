import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeModule} from "./components/home/home.module";
import {ForbiddenComponent} from './components/errors/forbidden/forbidden.component';
import {NotFoundComponent} from './components/errors/not-found/not-found.component';
import {UnauthorizedComponent} from './components/errors/unauthorized/unauthorized.component';
import {HeaderComponent} from "./components/header";
import {FooterComponent} from "./components/footer";
import {RegisterComponent} from './components/register/register.component';
import {InputTextModule} from "primeng/inputtext";
import {ReactiveFormsModule} from "@angular/forms";
import {LoginModule} from "./components/login/login.module";
import {HttpClientModule} from "@angular/common/http";
import {MatIconModule} from "@angular/material/icon";
import {FlightsModule} from "./components/flights/flights.module";
import {ButtonModule} from "primeng/button";
import {SearchModule} from "./components/search/search.module";
import { JourneyComponent } from './components/user/journey/journey.component';
import { ProfileComponent } from './components/user/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    ForbiddenComponent,
    NotFoundComponent,
    UnauthorizedComponent,
    RegisterComponent,
    JourneyComponent,
    ProfileComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HomeModule,
        FlightsModule,
        SearchModule,
        LoginModule,
        HeaderComponent,
        FooterComponent,
        InputTextModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatIconModule,
        ButtonModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
