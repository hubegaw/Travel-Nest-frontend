import {Injectable} from "@angular/core";
import {distinctUntilChanged, Observable} from "rxjs";
import {map, shareReplay} from "rxjs/operators";
import {AirportAndCityResponse} from "../api/models/airport-and-city-response";
import {ApiService} from "../api/services/api.service";

@Injectable({
  providedIn: 'root'
})
export class AmadeusDataService {

  constructor(private flightService: ApiService) {
  }

  getData(request: { body: { keyword: string, include: [string] } }): Observable<AirportAndCityResponse> {
    return this.flightService.getAirports$Response(request).pipe(
      map(response => response.body as AirportAndCityResponse),
      distinctUntilChanged(),
      shareReplay({bufferSize: 1, refCount: true})
    );
  }
}
