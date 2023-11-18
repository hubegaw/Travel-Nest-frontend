/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface RefreshAccessToken$Params {
      body: {

/**
 * Refresh token to obtain a new access token
 */
'refreshToken': string;
}
}

export function refreshAccessToken(http: HttpClient, rootUrl: string, params: RefreshAccessToken$Params, context?: HttpContext): Observable<StrictHttpResponse<{

/**
 * New access token
 */
'accessToken'?: string;
}>> {
  const rb = new RequestBuilder(rootUrl, refreshAccessToken.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<{
      
      /**
       * New access token
       */
      'accessToken'?: string;
      }>;
    })
  );
}

refreshAccessToken.PATH = '/auth/refresh-token';
