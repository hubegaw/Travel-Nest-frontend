import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {MenuItem} from "primeng/api";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AuthenticationService} from "../../services/auth.service";
import {SpeedDialModule} from "primeng/speeddial";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule,  BrowserAnimationsModule, SpeedDialModule]
})
export class HeaderComponent implements OnInit {
  protected readonly authService = inject(AuthenticationService);
  itemsUser: MenuItem[] = [];

  ngOnInit() {
    this.itemsUser = [
      {
        tooltipOptions: {
          tooltipLabel: 'Account'
        },
        label: 'Account',
        icon: 'pi pi-user',
        routerLink: '/fileupload'
      },
      {
        tooltipOptions: {
          tooltipLabel: 'Log out'
        },
        label: 'Logout',
        icon: 'pi pi-sign-out',
        command: () => {
          this.authService.logout();
        }
      }
    ];
  }
}
