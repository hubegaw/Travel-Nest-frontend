import {Component, inject, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {FlightOfferDto} from "../../api/models/flight-offer-dto";
import {JourneyApiService} from "../../services/journey-api.service";
import {FlightService} from "../../services/flight.service";
import {SharedService} from "../../services/shared.service";

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css']
})
export class FlightsComponent implements OnInit {
  private readonly journeyService = inject(JourneyApiService);
  private readonly flightService = inject(FlightService);
  result: any = {};
  loading: boolean = true;

  constructor(private sharedService: SharedService) { }

  ngOnInit() {
    this.sharedService.currentResults.subscribe((result) => {
      if(result.length != 0) {
        this.loading = false;
      }
      this.result = result;
    });
  }

}
