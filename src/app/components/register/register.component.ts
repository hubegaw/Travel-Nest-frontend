import {Component, EventEmitter, inject, OnInit, Output} from '@angular/core';
import {AuthenticationService} from "../../services/auth.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  private readonly authService = inject(AuthenticationService);
  private readonly messageService = inject(MessageService);
  registerForm!: FormGroup;
  @Output() closeDialog = new EventEmitter<void>();
  @Output() showLogin = new EventEmitter<void>();

  ngOnInit() {
    this.registerForm =new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      cpassword: new FormControl('', Validators.required)
    })
  }

  onSubmit(form: FormGroup) {
    if(this.registerForm.value.password == this.registerForm.value.cpassword) {
      this.authService.register(this.registerForm.value.email, this.registerForm.value.password);
      this.closeDialog.emit();
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Password mismatch',
        detail: 'Please fill information correctly!',
      })
    }
  }
}
