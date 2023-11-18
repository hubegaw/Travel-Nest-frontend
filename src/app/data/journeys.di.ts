import {inject, InjectionToken} from "@angular/core";
import {distinctUntilChanged, Observable, shareReplay} from "rxjs";
import {JourneyDto} from "../api/models/journey-dto";
import {JourneyApiService} from "../services/journey-api.service";
import {map} from "rxjs/operators";

export const DiJourneys = new InjectionToken<Observable<Array<JourneyDto>>>('Available journeys', {
  providedIn: 'root',
  factory: () => {
    const journeyService = inject(JourneyApiService);
    return journeyService.getAllUserJourneys$Response({id: '1'}).pipe(
      map(response => response.body as Array<JourneyDto>),
      distinctUntilChanged(),
      shareReplay({bufferSize: 1, refCount: true})
    );
  }
});
