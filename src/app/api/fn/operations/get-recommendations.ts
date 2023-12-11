/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { RecommendationResponse } from '../../models/recommendation-response';

export interface GetRecommendations$Params {
  city: string;
}

export function getRecommendations(http: HttpClient, rootUrl: string, params: GetRecommendations$Params, context?: HttpContext): Observable<StrictHttpResponse<RecommendationResponse>> {
  const rb = new RequestBuilder(rootUrl, getRecommendations.PATH, 'get');
  if (params) {
    rb.path('city', params.city, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<RecommendationResponse>;
    })
  );
}

getRecommendations.PATH = '/v1/amadeus/recommendations/{city}';
