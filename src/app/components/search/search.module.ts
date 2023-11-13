import {NgModule} from "@angular/core";
import {SearchComponent} from "./search.component";
import {ButtonModule} from "primeng/button";
import {CalendarModule} from "primeng/calendar";
import {CheckboxModule} from "primeng/checkbox";
import {DropdownModule} from "primeng/dropdown";
import {InputTextModule} from "primeng/inputtext";
import {ReactiveFormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {PanelModule} from "primeng/panel";

@NgModule({
  declarations: [SearchComponent],
    imports: [
        ButtonModule,
        CalendarModule,
        CheckboxModule,
        DropdownModule,
        InputTextModule,
        ReactiveFormsModule,
        NgIf,
        PanelModule
    ],
  exports: [
    SearchComponent
  ],
  providers: []
})
export class SearchModule {}
