import {Injectable} from "@angular/core";
import {ApiService} from "../api/services/api.service";
import {ApiConfiguration} from "../api/api-configuration";
import {HttpClient, HttpContext, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {StrictHttpResponse} from "../api/strict-http-response";
import {RequestBuilder} from "../api/request-builder";
import {filter, map} from "rxjs/operators";
import {FlightOfferDto} from "../api/models/flight-offer-dto";
import {FlightOfferResponse} from "../api/models/flight-offer-response";

@Injectable({ providedIn: 'root' })
export class FlightService extends ApiService {
  private accessToken: any;

  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  override postFlightOffers$Response(params: { body: FlightOfferDto }, context?: HttpContext): Observable<StrictHttpResponse<FlightOfferResponse>> {
    const rb = new RequestBuilder(this.rootUrl, ApiService.PostFlightOffersPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    this.getAccessToken();

    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.accessToken,
    })

    const httpRequest = rb.build<FlightOfferResponse>({
      responseType: 'json',
      accept: 'application/json',
      context: context,
    })

    const modifiedRequest = httpRequest.clone({headers});

    return this.http.request(modifiedRequest).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<FlightOfferResponse>;
      })
    );
  }

  private getAccessToken() {
    this.accessToken = localStorage.getItem('access_token');
  }
}
