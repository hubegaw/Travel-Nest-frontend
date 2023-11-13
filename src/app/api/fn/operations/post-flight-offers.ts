/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { FlightOfferDto } from '../../models/flight-offer-dto';
import { FlightOfferResponse } from '../../models/flight-offer-response';

export interface PostFlightOffers$Params {
      body: FlightOfferDto
}

export function postFlightOffers(http: HttpClient, rootUrl: string, params: PostFlightOffers$Params, context?: HttpContext): Observable<StrictHttpResponse<FlightOfferResponse>> {
  const rb = new RequestBuilder(rootUrl, postFlightOffers.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<FlightOfferResponse>;
    })
  );
}

postFlightOffers.PATH = '/v1/amadeus/flights/flight-offers';
