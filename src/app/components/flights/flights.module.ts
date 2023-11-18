import {NgModule} from "@angular/core";
import {FlightsComponent} from "./flights.component";
import {ButtonModule} from "primeng/button";
import {CalendarModule} from "primeng/calendar";
import {CheckboxModule} from "primeng/checkbox";
import {DropdownModule} from "primeng/dropdown";
import {InputTextModule} from "primeng/inputtext";
import {PaginatorModule} from "primeng/paginator";
import {ReactiveFormsModule} from "@angular/forms";
import {RippleModule} from "primeng/ripple";
import {TableModule} from "primeng/table";
import {SearchModule} from "../search/search.module";
import {NgIf} from "@angular/common";
import {CardModule} from "primeng/card";
import {DataViewModule} from "primeng/dataview";

@NgModule({
    declarations: [FlightsComponent],
  imports: [
    ButtonModule,
    CalendarModule,
    CheckboxModule,
    DropdownModule,
    InputTextModule,
    PaginatorModule,
    ReactiveFormsModule,
    RippleModule,
    TableModule,
    SearchModule,
    NgIf,
    CardModule,
    DataViewModule
  ],
    exports: [
        FlightsComponent
    ],
    providers: []
})
export class FlightsModule {
}
