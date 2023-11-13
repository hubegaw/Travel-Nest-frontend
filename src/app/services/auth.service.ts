import {inject, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {UserApiService} from "./user-api.service";
import {MessageService} from "primeng/api";

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private access_token = 'access_token';

  constructor(
    private authenticationClient: UserApiService,
    private router: Router,
    private messageService: MessageService
  ) {
  }

  public login(email: string, password: string): void {
    this.authenticationClient.authenticate({body: {email: email, password: password}}).subscribe({
      next: (response) => {
        localStorage.setItem(this.access_token, <string>response.accessToken);
        this.messageService.add({
          severity: 'success',
          summary: 'Logged in',
          detail: 'Logged in successfully!',
        })
        this.router.navigate(['/home']).then();
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Log in error',
          detail: 'Could not log in',
        })
      }
    });
  }

  public register(email: string, password: string): void {
    this.authenticationClient
      .register({body: {email: email, password: password}})
      .subscribe({
        next: (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Registered',
            detail: 'Registered successfully! Please log in.',
          })
          this.router.navigate(['/home']).then();
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Register error',
            detail: 'Could not register',
          })
        }
      });
  }

  public logout() {
    localStorage.removeItem(this.access_token);
    this.messageService.add({
      severity: 'success',
      summary: 'Logged out',
      detail: 'Logged out successfully!',
    })
    this.router.navigate(['/home']).then();
  }

  public isLoggedIn(): boolean {
    let token = localStorage.getItem(this.access_token);
    return token != null && token.length > 0;
  }

  public getToken(): string | null {
    return this.isLoggedIn() ? localStorage.getItem(this.access_token) : null;
  }
}
