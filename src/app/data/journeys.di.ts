import {inject, InjectionToken} from "@angular/core";
import {distinctUntilChanged, Observable, of, shareReplay, switchMap} from "rxjs";
import {JourneyDto} from "../api/models/journey-dto";
import {JourneyApiService} from "../services/journey-api.service";
import {map} from "rxjs/operators";
import {DiCurrentUserId} from "./current-user.id.di";

export const DiJourneys = new InjectionToken<Observable<Array<JourneyDto>>>('Available journeys', {
  providedIn: 'root',
  factory: () => {
    const journeyService = inject(JourneyApiService);
    const currentUserId$ = inject(DiCurrentUserId);

    return currentUserId$.pipe(
      switchMap(userId => {
        if (userId) {
          return journeyService.getAllUserJourneys$Response({id: userId}).pipe(
            map(response => response.body as Array<JourneyDto>)
          );
        } else {
          return of([]);
        }
      }),
      distinctUntilChanged(),
      shareReplay({bufferSize: 1, refCount: true})
    );
  }
});
