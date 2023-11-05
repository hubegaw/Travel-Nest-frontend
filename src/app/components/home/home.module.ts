import {NgModule} from "@angular/core";
import {HomeComponent} from "./home.component";
import {InputTextModule} from "primeng/inputtext";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {CalendarModule} from "primeng/calendar";

@NgModule({
  declarations: [HomeComponent],
  imports: [
    InputTextModule,
    FormsModule,
    ButtonModule,
    CalendarModule,
    ReactiveFormsModule
  ],
  providers: []
})
export class HomeModule {}
