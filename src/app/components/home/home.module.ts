import {NgModule} from "@angular/core";
import {HomeComponent} from "./home.component";
import {InputTextModule} from "primeng/inputtext";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {CalendarModule} from "primeng/calendar";
import {DropdownModule} from "primeng/dropdown";
import {CheckboxModule} from "primeng/checkbox";
import {FlightsModule} from "../flights/flights.module";
import {NgIf} from "@angular/common";
import {SearchModule} from "../search/search.module";
import {ToastModule} from "primeng/toast";
import {GalleriaModule} from "primeng/galleria";

@NgModule({
  declarations: [HomeComponent],
    imports: [
        InputTextModule,
        FormsModule,
        ButtonModule,
        CalendarModule,
        ReactiveFormsModule,
        DropdownModule,
        CheckboxModule,
        FlightsModule,
        NgIf,
        SearchModule,
        ToastModule,
        GalleriaModule
    ],
  providers: []
})
export class HomeModule {}
