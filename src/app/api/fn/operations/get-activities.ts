/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ActivitiesResponse } from '../../models/activities-response';
import { AmadeusGeoCode } from '../../models/amadeus-geo-code';

export interface GetActivities$Params {
      body: AmadeusGeoCode
}

export function getActivities(http: HttpClient, rootUrl: string, params: GetActivities$Params, context?: HttpContext): Observable<StrictHttpResponse<ActivitiesResponse>> {
  const rb = new RequestBuilder(rootUrl, getActivities.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<ActivitiesResponse>;
    })
  );
}

getActivities.PATH = '/v1/amadeus/recommendations/activities';
