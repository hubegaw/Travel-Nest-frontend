import {NgModule} from "@angular/core";
import {SearchComponent} from "./search.component";
import {ButtonModule} from "primeng/button";
import {CalendarModule} from "primeng/calendar";
import {CheckboxModule} from "primeng/checkbox";
import {DropdownModule} from "primeng/dropdown";
import {InputTextModule} from "primeng/inputtext";
import {ReactiveFormsModule} from "@angular/forms";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {PanelModule} from "primeng/panel";
import {BrowserModule} from "@angular/platform-browser";
import {AutoCompleteModule} from "primeng/autocomplete";
import {MultiSelectModule} from "primeng/multiselect";
import {PasswordModule} from "primeng/password";

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
        PanelModule,
        BrowserModule,
        AutoCompleteModule,
        MultiSelectModule,
        NgOptimizedImage,
        PasswordModule
    ],
  exports: [
    SearchComponent
  ],
  providers: []
})
export class SearchModule {}
