import {booleanAttribute, Component, inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {JourneyApiService} from "../../services/journey-api.service";
import {FlightService} from "../../services/flight.service";
import {FlightOfferDto} from "../../api/models/flight-offer-dto";
import {FlightOfferResponse} from "../../api/models/flight-offer-response";
import {catchError, map} from "rxjs/operators";
import {of} from "rxjs";
import {SharedService} from "../../services/shared.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  componentName: string = "home"
  constructor() {
  }

  ngOnInit() {

  }
}
