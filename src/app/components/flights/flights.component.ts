import {Component, inject, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {FlightOfferDto} from "../../api/models/flight-offer-dto";
import {JourneyApiService} from "../../services/journey-api.service";
import {FlightService} from "../../services/flight.service";
import {SharedService} from "../../services/shared.service";
import {SelectItem} from "primeng/api";

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css']
})
export class FlightsComponent implements OnInit {
  private readonly journeyService = inject(JourneyApiService);
  private readonly flightService = inject(FlightService);
  private readonly sharedService = inject(SharedService)
  result: any = {};
  loading: boolean = true;
  sortOptions!: SelectItem[];
  sortOrder!: number;
  sortField!: string;

  ngOnInit() {
    this.sharedService.currentResults.subscribe((result) => {
      if(result.length != 0) {
        this.loading = false;
      }
      this.result = result;
      console.log(result)
    });

    this.sortOptions = [
      { label: 'Price High to Low', value: '!price' },
      { label: 'Price Low to High', value: 'price' }
    ];
  }

  onSortChange(event: any) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }

}
