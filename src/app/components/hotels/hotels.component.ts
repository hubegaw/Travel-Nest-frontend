import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {JourneyApiService} from "../../services/journey-api.service";
import {SharedService} from "../../services/shared.service";
import {Observable} from "rxjs";
import {JourneyDto} from "../../api/models/journey-dto";
import {DiJourneys} from "../../data";
import {SelectItem} from "primeng/api";
import {OverlayPanel} from "primeng/overlaypanel";
import {HotelResponse} from "../../api/models/hotel-response";

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.css']
})
export class HotelsComponent implements OnInit {
private readonly journeyService = inject(JourneyApiService);
private readonly sharedService = inject(SharedService)
protected journeys$: Observable<Array<JourneyDto>> = inject(DiJourneys);
protected result: any = {};
protected loading: boolean = true;
protected sortOptions!: SelectItem[];
protected journeys!: JourneyDto[];
protected selectedHotel: any;
@ViewChild(OverlayPanel) overlayPanel!: OverlayPanel;

  ngOnInit() {
    this.sharedService.currentResults.subscribe((result) => {
      if (result.length != 0) {
        this.loading = false;
      }
      this.result = result;
      console.log(result)
    });

    this.journeys$.subscribe((result) => {
      this.journeys = result;
    })

    this.sortOptions = [
      {label: 'Price High to Low', value: '!price'},
      {label: 'Price Low to High', value: 'price'}
    ];
  }

  showJourneys(event: any, hotel: HotelResponse, overlayPanel: OverlayPanel) {
    this.selectedHotel = hotel; // Set the selected flight
    overlayPanel.toggle(event);
  }

  addHotelToJourney(journey: JourneyDto) {
    if (!journey.flights) {
      journey.flights = [];
    }
    journey.flights.push(this.selectedHotel);

    this.journeyService.updateJourney$Response({
      id: <string> journey.id,
      body: this.selectedHotel
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
