import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {MenuItem} from "primeng/api";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AuthenticationService} from "../../services/auth.service";
import {SpeedDialModule} from "primeng/speeddial";
import {InputTextModule} from "primeng/inputtext";
import {ReactiveFormsModule} from "@angular/forms";
import {PasswordModule} from "primeng/password";
import {MenubarModule} from "primeng/menubar";
import {LoginModule} from "../login/login.module";
import {DialogModule} from "primeng/dialog";
import {Router} from "@angular/router";
import {RegisterModule} from "../register/register.module";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, BrowserAnimationsModule, SpeedDialModule, InputTextModule, ReactiveFormsModule, PasswordModule, MenubarModule, LoginModule, DialogModule, RegisterModule]
})
export class HeaderComponent implements OnInit {
  protected readonly authService = inject(AuthenticationService);
  protected readonly router = inject(Router);
  itemsUser: MenuItem[] = [];
  itemsGuest: MenuItem[] = [];
  displayLoginDialog: boolean = false;
  displayRegisterDialog: boolean = false;

  ngOnInit() {
    this.itemsUser = [
      {
        label: 'Flights',
        icon: '',
        routerLink: '/flights'
      },
      {
        label: 'Hotels',
        icon: 'pi pi-home',
        routerLink: '/hotels'
      },
      {
        label: 'Profile',
        icon: 'pi pi-user',
        routerLink: '/user/profile'
      },
      {
        label: 'Add journey',
        icon: 'pi pi-car',
        command: () => {
          this.router.navigate(['/user/profile'], { queryParams: { action: 'addJourney' } });
        }
      },
      {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        command: () => {
          this.authService.logout();
        }
      }
    ];

    this.itemsGuest = [
      {
        label: 'Flights',
        icon: '',
        routerLink: '/flights'
      },
      {
        label: 'Hotels',
        icon: 'pi pi-home',
        routerLink: '/hotels'
      },
      {
        label: 'Log in',
        icon: 'pi pi-sign-in',
        command: () => {
          this.displayLoginDialog = true;
        }
      }
    ]
  }

  showLoginDialog() {
    this.displayLoginDialog = true;
    this.displayRegisterDialog = false;
  }

  showRegisterDialog() {
    this.displayRegisterDialog = true;
    this.displayLoginDialog = false;
  }

  closeLoginDialog() {
    this.displayLoginDialog = false;
  }

  closeRegisterDialog() {
    this.displayRegisterDialog = false;
  }

}
