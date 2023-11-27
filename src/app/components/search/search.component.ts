import {Component, inject, Input, OnInit} from '@angular/core';
import {FlightService} from "../../services/flight.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {FlightOfferDto} from "../../api/models/flight-offer-dto";
import {SharedService} from "../../services/shared.service";
import {Router} from "@angular/router";
import {AmadeusDataService} from "../../services/amadeus-data.service";
import {HotelRequest} from "../../api/models/hotel-request";
import {HotelsService} from "../../services/hotels.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  private readonly flightService = inject(FlightService);
  private readonly hotelsService = inject(HotelsService);
  private readonly amadeusData = inject(AmadeusDataService);
  @Input() currentComponent!: string;
  suggestions: any[] = [];

  currentForm: string = 'flights';
  flightForm!: FormGroup;
  hotelForm!: FormGroup;
  travelClasses = ['ECONOMY', 'PREMIUM_ECONOMY', 'BUSINESS', 'FIRST']
  ratings = [
    {label: '1 Star', value: 1},
    {label: '2 Stars', value: 2},
    {label: '3 Stars', value: 3},
    {label: '4 Stars', value: 4},
    {label: '5 Stars', value: 5}
  ];
  amenities = [{label: 'SWIMMING_POOL', value: 'SWIMMING_POOL'}, {label: 'SPA', value: 'SPA'}, {label: 'FITNESS_CENTER', value: 'FITNESS_CENTER'}, {label: 'AIR_CONDITIONING', value: 'AIR_CONDITIONING'},
    {label: 'RESTAURANT', value: 'RESTAURANT'}, {label: 'PARKING', value: 'PARKING'}, {label: 'PETS_ALLOWED', value: 'PETS_ALLOWED'}, {label: 'AIRPORT_SHUTTLE', value: 'AIRPORT_SHUTTLE'}, {label: 'BUSINESS_CENTER', value: 'BUSINESS_CENTER'},
    {label: 'DISABLED_FACILITIES', value: 'DISABLED_FACILITIES'}, {label: 'WIFI', value: 'WIFI'}, {label: 'MEETING_ROOMS', value: 'MEETING_ROOMS'}, {label: 'NO_KID_ALLOWED', value: 'NO_KID_ALLOWED'}, {label: 'TENNIS', value: 'TENNIS'},
    {label: 'GOLF', value: 'GOLF'}, {label: 'KITCHEN', value: 'KITCHEN'}, {label: 'ANIMAL_WATCHING', value: 'ANIMAL_WATCHING'}, {label: 'BABY-SITTING', value: 'BABY-SITTING'}, {label: 'BEACH', value: 'BEACH'}, {label: 'CASINO', value: 'CASINO'},
    {label: 'JACUZZI', value: 'JACUZZI'}, {label: 'SAUNA', value: 'SAUNA'}, {label: 'SOLARIUM', value: 'SOLARIUM'}, {label: 'MASSAGE', value: 'MASSAGE'}, {label: 'VALET_PARKING', value: 'VALET_PARKING'}, {label: 'BAR or LOUNGE', value: 'BAR or LOUNGE'},
    {label: 'KIDS_WELCOME', value: 'KIDS_WELCOME'}, {label: 'MINIBAR', value: 'MINIBAR'}, {label: 'TELEVISION', value: 'TELEVISION'}, {label: 'WI-FI_IN_ROOM', value: 'WI-FI_IN_ROOM'}, {label: 'ROOM_SERVICE', value: 'ROOM_SERVICE'},
    {label: 'GUARDED_PARKG', value: 'GUARDED_PARKG'}, {label: 'SERV_SPEC_MENU', value: 'SERV_SPEC_MENU'}];

  constructor(private sharedService: SharedService, private router: Router) {
  }

  ngOnInit() {
    this.flightForm = new FormGroup({
      departure: new FormControl('', Validators.required),
      arrival: new FormControl('', Validators.required),
      startDate: new FormControl<Date | null>(null, Validators.required),
      endDate: new FormControl<Date | null>(null, Validators.required),
      adults: new FormControl('', Validators.required),
      children: new FormControl(''),
      travelClass: new FormControl(''),
      nonStop: new FormControl('', Validators.required)
    });
    this.hotelForm = new FormGroup({
      cityCode: new FormControl('', Validators.required),
      amenities: new FormControl<string[] | null>(null, Validators.required),
      ratings: new FormControl<string[] | null>(null, Validators.required),
      adults: new FormControl<number | null>(1, Validators.required),
      checkInDate: new FormControl<string | null>('', Validators.required),
      checkOutDate: new FormControl<string | null>('', Validators.required),
      roomQuantity: new FormControl<number | null>(null, Validators.required)
    });
  }

  searchFlights(flightForm: FormGroup) {
    const flightDto: FlightOfferDto = {
      originLocationCode: flightForm.get('departure')?.value['value'] || '',
      destinationLocationCode: flightForm.get('arrival')?.value['value'] || '',
      departureDate: this.changeDateFormat(flightForm.get('startDate')?.value) || '',
      returnDate: this.changeDateFormat(flightForm.get('endDate')?.value) || '',
      adults: parseInt(flightForm.get('adults')?.value) || 0,
      children: parseInt(flightForm.get('children')?.value) || 0,
      travelClass: flightForm.get('travelClass')?.value || '',
      nonStop: flightForm.get('nonStop')?.value || false,
      currencyCode: 'PLN',
      max: 250
    };

    this.flightService.postFlightOffers({body: flightDto}).subscribe(result => {
      this.sharedService.updateResults(result.data);
    });

    this.router.navigate(['/flights']).then();
  }

  searchHotels(hotelsForm: FormGroup) {
    const hotelRequest: HotelRequest = {
      cityCode: hotelsForm.get('cityCode')?.value || '',
      amenities: hotelsForm.get('amenities')?.value || '',
      ratings: hotelsForm.get('ratings')?.value || ''

    }

    this.hotelsService.getHotels({body: hotelRequest}).subscribe(result => {
      this.sharedService.updateResults(result);
    })
  }

  protected searchCity(event) {
    const query = event.query;
    if (!query || query.length < 2) {
      this.suggestions = [];
      return;
    }
    this.amadeusData.getData({body: {keyword: query, include: ['AIRPORTS']}})
      .subscribe(response => {
        this.suggestions = (response.data ?? []).map(city => ({
          label: `${city.name}, ${city.address?.countryCode}`,
          value: `${city.iataCode}`
        }))
      }, error => {
        this.suggestions = [];
      });
  }

  protected searchAirports(event) {
    const query = event.query;
    if (!query || query.length < 2) {
      this.suggestions = [];
      return;
    }
    this.amadeusData.getData({body: {keyword: query, include: ['AIRPORTS']}})
      .subscribe(response => {
        this.suggestions = []
        response.data?.forEach(city => {
          if (city.relationships) {
            const cityAirports = city.relationships.map(rel => {
              if (response.included && response.included.airports && rel.id) {
                const airport = response.included.airports[rel.id];
                return {
                  label: `${airport.name} (${airport.iataCode}), ${city.name}`,
                  value: airport.iataCode
                }
              }
              return null;
            }).filter(item => item !== null);
            this.suggestions.push(...cityAirports);
          }
        })
      }, error => {
        this.suggestions = [];
      });
  }

  private changeDateFormat(date: any) {
    let day = date.getDate();
    let month = date.getMonth() + 1; // add 1 because months are indexed from 0
    let year = date.getFullYear();

    return year + '-' + month + '-' + day;
  }
}
