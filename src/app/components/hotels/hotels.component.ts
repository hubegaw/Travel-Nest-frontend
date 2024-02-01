import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {JourneyApiService} from "../../services/journey-api.service";
import {SharedService} from "../../services/shared.service";
import {Observable} from "rxjs";
import {JourneyDto} from "../../api/models/journey-dto";
import {DiJourneys} from "../../data";
import {OverlayPanel} from "primeng/overlaypanel";
import {HotelDataService} from "../../services/hotel-data.service";
import {ApiService} from "../../api/services";

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.css']
})
export class HotelsComponent implements OnInit {
  private readonly journeyService = inject(JourneyApiService);
  private readonly sharedService = inject(SharedService);
  private readonly hotelService = inject(ApiService);
  private readonly hotelDataService = inject(HotelDataService);
  protected journeys$: Observable<Array<JourneyDto>> = inject(DiJourneys);
  protected result: any = {};
  protected journeys!: JourneyDto[];
  protected hotelOffers: { [key: string]: any[] } = {};
  protected selectedHotel: any;
  protected selectedOffer: any;
  @ViewChild(OverlayPanel) overlayPanel!: OverlayPanel;

  ngOnInit() {
    this.sharedService.currentResults.subscribe((result) => {
      this.result = result;
    });

    this.journeys$.subscribe((result) => {
      this.journeys = result;
    })
  }

  findHotelOffers(hotelId: string) {
    this.hotelDataService.currentHotelOfferRequest.subscribe(
      hotelOfferRequest => {
        if (hotelOfferRequest) {
          hotelOfferRequest.hotelIds = hotelId;
          this.hotelService.getHotelsOffers$Response({body: hotelOfferRequest}).subscribe(results => {
            this.hotelOffers[hotelId] = results.body;
          });
        }
      }
    );
  }

  showJourneys(event: any, hotel: any, offer: any, overlayPanel: OverlayPanel) {

    this.selectedHotel = hotel;
    this.selectedOffer = offer;
    overlayPanel.toggle(event);
  }

  addHotelToJourney(journey: JourneyDto) {
    if (!journey.hotels) {
      journey.hotels = [];
    }
    let hotel = {
      hotelId: this.selectedHotel.hotelId,
      name: this.selectedHotel.name,
      geoCode: this.selectedHotel.geoCode,
      checkInDate: this.selectedOffer.checkInDate,
      checkOutDate: this.selectedOffer.checkOutDate,
      room: this.selectedOffer.room,
      price: this.selectedOffer.price
    }
    journey.hotels.push(hotel);
    this.journeyService.updateJourney$Response({
      id: <string>journey.id,
      body: journey
    }).subscribe({
      next: () => {
        console.log('Journey updated with selected hotel');
      },
      error: error => {
        console.error('Error updating journey:', error);
      }
    });

    this.overlayPanel.hide();
  }
}
