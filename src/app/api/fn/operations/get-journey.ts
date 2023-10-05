/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { JourneyDto } from '../../models/journey-dto';

export interface GetJourney$Params {
  id: string;
}

export function getJourney(http: HttpClient, rootUrl: string, params: GetJourney$Params, context?: HttpContext): Observable<StrictHttpResponse<JourneyDto>> {
  const rb = new RequestBuilder(rootUrl, getJourney.PATH, 'get');
  if (params) {
    rb.path('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<JourneyDto>;
    })
  );
}

getJourney.PATH = '/v1/journeys/{id}';
