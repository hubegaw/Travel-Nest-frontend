import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {FlightOfferDto} from "../../api/models/flight-offer-dto";
import {JourneyApiService} from "../../services/journey-api.service";
import {SharedService} from "../../services/shared.service";
import {SelectItem} from "primeng/api";
import {Observable} from "rxjs";
import {JourneyDto} from "../../api/models/journey-dto";
import {DiJourneys} from "../../data";
import {OverlayPanel} from "primeng/overlaypanel";

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css']
})
export class FlightsComponent implements OnInit {
  private readonly journeyService = inject(JourneyApiService);
  private readonly sharedService = inject(SharedService)
  protected journeys$: Observable<Array<JourneyDto>> = inject(DiJourneys);
  protected result: any = {};
  protected loading: boolean = true;
  protected sortOptions!: SelectItem[];
  protected sortOrder!: number;
  protected sortField!: string;
  protected journeys!: JourneyDto[];
  protected selectedFlight: any;
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

  showJourneys(event: any, flight: FlightOfferDto, overlayPanel: OverlayPanel) {
    this.selectedFlight = flight; // Set the selected flight
    overlayPanel.toggle(event);
  }

  addFlightToJourney(journey: JourneyDto) {
    if (!journey.flights) {
      journey.flights = [];
    }
    journey.flights.push(this.selectedFlight);

    this.journeyService.updateJourney$Response({
      id: <string> journey.id,
      body: this.selectedFlight
    }).subscribe({
      next: () => {
        console.log('Journey updated with new flight');
      },
      error: error => {
        console.error('Error updating journey:', error);
      }
    });

    this.overlayPanel.hide();
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
