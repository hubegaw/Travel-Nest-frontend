/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { HotelRequest } from '../../models/hotel-request';
import { HotelResponse } from '../../models/hotel-response';

export interface GetHotelsByCity$Params {
      body: HotelRequest
}

export function getHotelsByCity(http: HttpClient, rootUrl: string, params: GetHotelsByCity$Params, context?: HttpContext): Observable<StrictHttpResponse<HotelResponse>> {
  const rb = new RequestBuilder(rootUrl, getHotelsByCity.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<HotelResponse>;
    })
  );
}

getHotelsByCity.PATH = '/v1/amadeus/hotels';
