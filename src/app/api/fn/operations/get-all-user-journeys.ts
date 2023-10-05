/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { JourneyDto } from '../../models/journey-dto';

export interface GetAllUserJourneys$Params {
}

export function getAllUserJourneys(http: HttpClient, rootUrl: string, params?: GetAllUserJourneys$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<JourneyDto>>> {
  const rb = new RequestBuilder(rootUrl, getAllUserJourneys.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<JourneyDto>>;
    })
  );
}

getAllUserJourneys.PATH = '/v1/journeys/list';
