import {Component, OnInit} from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import {AuthenticationService} from "./services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Travel-Nest-frontend';

  constructor(private primengConfig: PrimeNGConfig, private authService: AuthenticationService) {}

  ngOnInit() {
    this.authService.checkTokenValidity();
  }
}
