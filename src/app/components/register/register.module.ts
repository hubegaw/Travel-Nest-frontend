import {NgModule} from "@angular/core";
import {LoginComponent} from "../login/login.component";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {PasswordModule} from "primeng/password";
import {UserApiService} from "../../services/user-api.service";
import {MessageService} from "primeng/api";
import {RegisterComponent} from "./register.component";

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    PasswordModule,
  ],
  exports: [
    RegisterComponent
  ],
  providers: [UserApiService, MessageService]
})
export class RegisterModule {

}
