import {NgModule} from "@angular/core";
import {ProfileComponent} from "./profile.component";
import {CardModule} from "primeng/card";
import {TableModule} from "primeng/table";
import {NgIf} from "@angular/common";
import {DialogModule} from "primeng/dialog";
import {LoginModule} from "../../login/login.module";
import {JourneyModule} from "../journey/journey.module";
import {ButtonModule} from "primeng/button";
import {ToastModule} from "primeng/toast";
import {BrowserModule} from "@angular/platform-browser";

@NgModule({
  declarations: [ProfileComponent],
    imports: [
        CardModule,
        TableModule,
        NgIf,
        DialogModule,
        LoginModule,
        JourneyModule,
        ButtonModule,
        ToastModule,
        BrowserModule
    ],
  exports: [],
  providers: []
})
export class ProfileModule {
}
