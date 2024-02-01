import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {FlightOfferDto} from "../../api/models/flight-offer-dto";
import {SharedService} from "../../services/shared.service";
import {AmadeusDataService} from "../../services/amadeus-data.service";
import {HotelRequest} from "../../api/models/hotel-request";
import {HotelOfferRequest} from "../../api/models/hotel-offer-request";
import {HotelDataService} from "../../services/hotel-data.service";
import {ApiService} from "../../api/services";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  private readonly apiService = inject(ApiService);
  private readonly amadeusData = inject(AmadeusDataService);
  private readonly sharedService = inject(SharedService);
  private readonly hotelDataService = inject(HotelDataService);
  @Input() currentComponent!: string;
  @Output() cityName!: string;
  @Output() searchedSection: EventEmitter<string> = new EventEmitter<string>();
  suggestions: any[] = [];

  @Input() currentForm: string = 'flights';
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
  amenities = [{label: 'SWIMMING_POOL', value: 'SWIMMING_POOL'}, {label: 'SPA', value: 'SPA'}, {
    label: 'FITNESS_CENTER',
    value: 'FITNESS_CENTER'
  }, {label: 'AIR_CONDITIONING', value: 'AIR_CONDITIONING'},
    {label: 'RESTAURANT', value: 'RESTAURANT'}, {label: 'PARKING', value: 'PARKING'}, {
      label: 'PETS_ALLOWED',
      value: 'PETS_ALLOWED'
    }, {label: 'AIRPORT_SHUTTLE', value: 'AIRPORT_SHUTTLE'}, {label: 'BUSINESS_CENTER', value: 'BUSINESS_CENTER'},
    {label: 'DISABLED_FACILITIES', value: 'DISABLED_FACILITIES'}, {
      label: 'WIFI',
      value: 'WIFI'
    }, {label: 'MEETING_ROOMS', value: 'MEETING_ROOMS'}, {
      label: 'NO_KID_ALLOWED',
      value: 'NO_KID_ALLOWED'
    }, {label: 'TENNIS', value: 'TENNIS'},
    {label: 'GOLF', value: 'GOLF'}, {label: 'KITCHEN', value: 'KITCHEN'}, {
      label: 'ANIMAL_WATCHING',
      value: 'ANIMAL_WATCHING'
    }, {label: 'BABY-SITTING', value: 'BABY-SITTING'}, {label: 'BEACH', value: 'BEACH'}, {
      label: 'CASINO',
      value: 'CASINO'
    },
    {label: 'JACUZZI', value: 'JACUZZI'}, {label: 'SAUNA', value: 'SAUNA'}, {
      label: 'SOLARIUM',
      value: 'SOLARIUM'
    }, {label: 'MASSAGE', value: 'MASSAGE'}, {label: 'VALET_PARKING', value: 'VALET_PARKING'}, {
      label: 'BAR or LOUNGE',
      value: 'BAR or LOUNGE'
    },
    {label: 'KIDS_WELCOME', value: 'KIDS_WELCOME'}, {label: 'MINIBAR', value: 'MINIBAR'}, {
      label: 'TELEVISION',
      value: 'TELEVISION'
    }, {label: 'WI-FI_IN_ROOM', value: 'WI-FI_IN_ROOM'}, {label: 'ROOM_SERVICE', value: 'ROOM_SERVICE'},
    {label: 'GUARDED_PARKG', value: 'GUARDED_PARKG'}, {label: 'SERV_SPEC_MENU', value: 'SERV_SPEC_MENU'}];

  ngOnInit() {
    this.flightForm = new FormGroup({
      departure: new FormControl('', Validators.required),
      arrival: new FormControl('', Validators.required),
      startDate: new FormControl<Date | null>(null, Validators.required),
      endDate: new FormControl<Date | null>(null),
      adults: new FormControl(1),
      children: new FormControl(''),
      travelClass: new FormControl(''),
      nonStop: new FormControl(false)
    });
    this.hotelForm = new FormGroup({
      cityCode: new FormControl('', Validators.required),
      amenities: new FormControl<string[] | null>(null),
      ratings: new FormControl<string[] | null>(null),
      adults: new FormControl<number | null>(1),
      checkInDate: new FormControl<string | null>('', Validators.required),
      checkOutDate: new FormControl<string | null>(''),
      roomQuantity: new FormControl<number | null>(null)
    });
  }

  searchFlights(flightForm: FormGroup) {
    if(flightForm.valid) {
      const flightDto: FlightOfferDto = {
        originLocationCode: flightForm.get('departure')?.value['value'] || '',
        destinationLocationCode: flightForm.get('arrival')?.value['value'] || '',
        departureDate: this.changeDateFormat(flightForm.get('startDate')?.value) || '',
        returnDate: this.changeDateFormat(flightForm.get('endDate')?.value) || '',
        adults: parseInt(flightForm.get('adults')?.value) || 0,
        children: parseInt(flightForm.get('children')?.value) || 0,
        travelClass: flightForm.get('travelClass')?.value || null,
        nonStop: flightForm.get('nonStop')?.value || false,
        currencyCode: 'PLN',
        max: 250
      };

      this.apiService.postFlightOffers({body: flightDto}).subscribe(result => {
        this.sharedService.updateResults(result.data);
      });

      this.searchedSection.emit('flights');
    }
  }

  searchHotels(hotelsForm: FormGroup) {
    if(hotelsForm.valid) {
      const hotelRequest: HotelRequest = {
        cityCode: hotelsForm.get('cityCode')?.value['value'] || '',
        amenities: hotelsForm.get('amenities')?.value?.map(amenity => amenity.value) || [],
        ratings: hotelsForm.get('ratings')?.value?.map(rating => rating.value) || []
      }


      const hotelOfferRequest: HotelOfferRequest = {
        checkInDate: this.changeDateFormat(hotelsForm.get('checkInDate')?.value) || '',
        checkOutDate: this.changeDateFormat(hotelsForm.get('checkOutDate')?.value) || '',
        adults: hotelsForm.get('adults')?.value || 1,
        priceRange: hotelsForm.get('priceRange')?.value || null,
        roomQuantity: hotelsForm.get('roomQuantity')?.value || null
      }

      this.apiService.getHotelsByCity({body: hotelRequest}).subscribe(result => {
        this.sharedService.updateResults(result);
      })

      this.hotelDataService.passHotelOfferRequest(hotelOfferRequest);
      this.searchedSection.emit('hotels');
    }
  }

  onCitySelected(event: any) {
    const cityCode = event.value;
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
    if (!date) {
      return null;
    }
    let day = date.getDate()
    if (day < 10) {
      day = '0' + day;
    }
    let month = date.getMonth() + 1;
    if (month < 10) {
      month = '0' + month;
    }
    let year = date.getFullYear();

    return `${year}-${month}-${day}`;
  }
}
