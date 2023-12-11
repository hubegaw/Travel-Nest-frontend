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
import {InputTextModule} from "primeng/inputtext";
import {ReactiveFormsModule} from "@angular/forms";
import {LoginModule} from "./components/login/login.module";
import {HttpClientModule} from "@angular/common/http";
import {MatIconModule} from "@angular/material/icon";
import {FlightsModule} from "./components/flights/flights.module";
import {ButtonModule} from "primeng/button";
import {SearchModule} from "./components/search/search.module";
import {ProfileModule} from "./components/user/profile/user.module";
import {JourneyModule} from "./components/user/journey/journey.module";
import {HotelsModule} from "./components/hotels/hotels.module";
import {PasswordModule} from "primeng/password";
import {RegisterModule} from "./components/register/register.module";
import {RecommendationsModule} from "./components/recommendations/recommendations.module";

@NgModule({
  declarations: [
    AppComponent,
    ForbiddenComponent,
    NotFoundComponent,
    UnauthorizedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    FlightsModule,
    SearchModule,
    ProfileModule,
    JourneyModule,
    LoginModule,
    RegisterModule,
    HotelsModule,
    HeaderComponent,
    FooterComponent,
    RecommendationsModule,
    InputTextModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatIconModule,
    ButtonModule,
    PasswordModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
