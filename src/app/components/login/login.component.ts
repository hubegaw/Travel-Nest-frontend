import {Component, EventEmitter, inject, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private readonly authService = inject(AuthenticationService);
  loginForm!: FormGroup;
  @Output() closeDialog = new EventEmitter<void>();

  ngOnInit() {
    this.loginForm =new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }

  onSubmit(form: FormGroup) {
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password);
  }
}
