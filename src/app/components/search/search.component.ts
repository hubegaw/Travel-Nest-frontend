import {Component, inject, Input, OnInit} from '@angular/core';
import {FlightService} from "../../services/flight.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {FlightOfferDto} from "../../api/models/flight-offer-dto";
import {SharedService} from "../../services/shared.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  private readonly flightService = inject(FlightService);
  @Input() currentComponent!: string;

  currentForm: string = 'flights';
  searchForm!: FormGroup;
  travelClasses = ['ECONOMY', 'PREMIUM_ECONOMY', 'BUSINESS', 'FIRST']

  constructor(private sharedService: SharedService, private router: Router) { }

  ngOnInit() {
    this.searchForm = new FormGroup({
      departure: new FormControl('', Validators.required),
      arrival: new FormControl('', Validators.required),
      startDate: new FormControl<Date | null>(null, Validators.required),
      endDate: new FormControl<Date | null>(null, Validators.required),
      adults: new FormControl('', Validators.required),
      children: new FormControl(''),
      travelClass: new FormControl(''),
      nonStop: new FormControl('', Validators.required)
    });
  }

  searchFlights(searchForm: FormGroup) {
    const flightDto: FlightOfferDto = {
      originLocationCode: searchForm.get('departure')?.value || '', // Ustawienie wartości domyślnej
      destinationLocationCode: searchForm.get('arrival')?.value || '', // Ustawienie wartości domyślnej
      departureDate: this.changeDateFormat(searchForm.get('startDate')?.value) || '', // Ustawienie wartości domyślnej
      returnDate: this.changeDateFormat(searchForm.get('endDate')?.value) || '', // Ustawienie wartości domyślnej
      adults: parseInt(searchForm.get('adults')?.value) || 0, // Ustawienie wartości domyślnej
      children: parseInt(searchForm.get('children')?.value) || 0, // Ustawienie wartości domyślnej
      travelClass: searchForm.get('travelClass')?.value || '', // Ustawienie wartości domyślnej
      nonStop: searchForm.get('nonStop')?.value || false, // Ustawienie wartości domyślnej,
      currencyCode: 'PLN',
      max: 250
    };

    this.flightService.postFlightOffers({body: flightDto}).subscribe(result => {
      this.sharedService.updateResults(result.data);
    });

    this.router.navigate(['/flights']).then();
  }

  private changeDateFormat(date: any) {
    let day = date.getDate();
    let month = date.getMonth() + 1; // add 1 because months are indexed from 0
    let year = date.getFullYear();

    return year + '-' + month + '-' + day;
  }
}
