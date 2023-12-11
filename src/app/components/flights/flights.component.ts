import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {FlightOfferDto} from "../../api/models/flight-offer-dto";
import {JourneyApiService} from "../../services/journey-api.service";
import {SharedService} from "../../services/shared.service";
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
  private readonly sharedService = inject(SharedService);
  protected journeys$: Observable<Array<JourneyDto>> = inject(DiJourneys);
  protected result: any = {};
  protected loading: boolean = true;
  protected journeys!: JourneyDto[];
  protected selectedFlight: any;
  @ViewChild(OverlayPanel) overlayPanel!: OverlayPanel;

  ngOnInit() {
    this.sharedService.currentResults.subscribe((result) => {
      if (result.length != 0) {
        this.loading = false;
      }
      this.result = result;
    });

    this.journeys$.subscribe((result) => {
      this.journeys = result;
    })

  }

  showJourneys(event: any, flight: FlightOfferDto, overlayPanel: OverlayPanel) {
    this.selectedFlight = flight;
    overlayPanel.toggle(event);
  }

  addFlightToJourney(journey: JourneyDto) {
    if (!journey.flights) {
      journey.flights = [];
    }
    journey.flights.push(this.selectedFlight);

    this.journeyService.updateJourney$Response({
      id: <string>journey.id,
      body: journey
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

}
