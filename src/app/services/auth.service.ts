import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {UserApiService} from "./user-api.service";
import {MessageService} from "primeng/api";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private access_token = 'access_token';
  private refresh_token = 'refresh_token';
  private refreshTimer: any;

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
        localStorage.setItem(this.refresh_token, <string>response.refreshToken);
        this.scheduleTokenRefresh();
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

  public checkTokenValidity() {

    let decodedToken = this.decodeToken()
    if(decodedToken != null) {
      const expiration = decodedToken.exp;
      const now = Date.now() / 1000;

      if(expiration < now) {
        localStorage.removeItem(this.access_token);
        localStorage.removeItem(this.refresh_token);
      }
    }
  }

  public decodeToken(): any | null {
    let token = this.getToken()
    if(token != null && token != '' && token != undefined) {
      const helper = new JwtHelperService();
      return helper.decodeToken(token);
    }
    return null;
  }

  private refreshToken(): void {
    this.authenticationClient.refreshAccessToken().subscribe({
      next: (response) => {
        localStorage.setItem(this.access_token, <string>response.accessToken);
        localStorage.setItem(this.refresh_token, <string>response.refreshToken);
        console.log('refreshed')
      }
    });
  }

  public isLoggedIn(): boolean {
    clearTimeout(this.refreshTimer);
    let token = localStorage.getItem(this.access_token);
    return token != null && token.length > 0;
  }

  private getToken(): string | null {
    return this.isLoggedIn() ? localStorage.getItem(this.access_token) : null;
  }

  private scheduleTokenRefresh(): void {
    const decodedToken = this.decodeToken();
    if(decodedToken != null) {
      const expiration = decodedToken.exp;
      const now = Date.now() / 1000;

      const delay = (expiration - now) * 1000 - (60 * 1000);

      setTimeout(() => this.refreshToken(), delay > 0 ? delay : 0);
    }
  }


}
