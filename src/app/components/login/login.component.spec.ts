import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import {AuthenticationService} from "../../services/auth.service";
import {HttpClientModule} from "@angular/common/http";
import {UserApiService} from "../../services/user-api.service";
import {MessageService} from "primeng/api";

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [AuthenticationService, UserApiService ,MessageService],
      imports: [HttpClientModule],
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize loginForm in ngOnInit', () => {
    component.ngOnInit();
    expect(component.loginForm).toBeDefined();
    expect(component.loginForm.get('email')).toBeDefined();
    expect(component.loginForm.get('password')).toBeDefined();
  });

  it('should call login method and emit closeDialog on onSubmit', () => {
    jest.spyOn(component.closeDialog, 'emit');

    component.loginForm.setValue({ email: 'test@example.com', password: 'password' });
    component.onSubmit(component.loginForm);

    expect(component.closeDialog.emit).toHaveBeenCalled();
  });

});
