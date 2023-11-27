/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { AirportAndCityRequest } from '../../models/airport-and-city-request';
import { AirportAndCityResponse } from '../../models/airport-and-city-response';

export interface GetAirports$Params {
      body: AirportAndCityRequest
}

export function getAirports(http: HttpClient, rootUrl: string, params: GetAirports$Params, context?: HttpContext): Observable<StrictHttpResponse<AirportAndCityResponse>> {
  const rb = new RequestBuilder(rootUrl, getAirports.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<AirportAndCityResponse>;
    })
  );
}

getAirports.PATH = '/v1/amadeus/airports';
