import {Injectable} from "@angular/core";
import {ApiService} from "../api/services/api.service";
import {ApiConfiguration} from "../api/api-configuration";
import {HttpClient, HttpContext, HttpHeaders, HttpRequest, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {StrictHttpResponse} from "../api/strict-http-response";
import {JourneyDto} from "../api/models/journey-dto";
import {RequestBuilder} from "../api/request-builder";
import {UserDto} from "../api/models/user-dto";
import {filter, map} from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class JourneyApiService extends ApiService {
  private accessToken: any;

  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  override getAllUserJourneys$Response(params?: {
    id: string
  }, context?: HttpContext): Observable<StrictHttpResponse<Array<JourneyDto>>> {
    let url = this.rootUrl + ApiService.GetAllUserJourneysPath;

    if (params?.id) {
      url += `?id=${encodeURIComponent(params.id)}`;
    }

    this.getAccessToken();

    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.accessToken,
    });

    const httpRequest = new HttpRequest<Array<UserDto>>('GET', url, {
      headers: headers,
      responseType: 'json',
      context: context,
    });

    return this.http.request(httpRequest).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<JourneyDto>>;
      })
    );
  }


  override getJourney$Response(params: {
    id: string
  }, context?: HttpContext): Observable<StrictHttpResponse<JourneyDto>> {
    const rb = new RequestBuilder(this.rootUrl, ApiService.GetJourneyPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    this.getAccessToken();

    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.accessToken,
    })

    const httpRequest = rb.build<Array<UserDto>>({
      responseType: 'json',
      accept: 'application/json',
      context: context,
    })

    const modifiedRequest = httpRequest.clone({headers});

    return this.http.request(modifiedRequest).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<JourneyDto>;
      })
    );
  }

  override updateJourney$Response(params: {
    id: string,
    body: { [key: string]: any }
  }, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(this.rootUrl, ApiService.UpdateJourneyPath, 'put');
    if (params) {
      rb.path('id', params.id, {});
      rb.body(params.body, 'application/json');
    }

    this.getAccessToken();

    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.accessToken,
    })

    const httpRequest = rb.build<Array<UserDto>>({
      responseType: 'json',
      accept: 'application/json',
      context: context,
    })

    const modifiedRequest = httpRequest.clone({headers});

    return this.http.request(modifiedRequest).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({body: undefined}) as StrictHttpResponse<void>;
      })
    );
  }

  override saveJourney$Response(params: {
    body: JourneyDto
  }, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(this.rootUrl, ApiService.SaveJourneyPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    this.getAccessToken();

    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.accessToken,
    })

    const httpRequest = rb.build<Array<UserDto>>({
      responseType: 'json',
      accept: 'application/json',
      context: context,
    })

    const modifiedRequest = httpRequest.clone({headers});

    return this.http.request(modifiedRequest).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({body: undefined}) as StrictHttpResponse<void>;
      })
    );
  }

  override deleteJourney$Response(params: {
    id: string
  }, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(this.rootUrl, ApiService.DeleteJourneyPath, 'delete');
    if (params) {
      rb.path('id', params.id, {});
    }

    this.getAccessToken();

    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.accessToken,
    })

    const httpRequest = rb.build<Array<UserDto>>({
      responseType: 'json',
      accept: 'application/json',
      context: context,
    })

    const modifiedRequest = httpRequest.clone({headers});

    return this.http.request(modifiedRequest).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({body: undefined}) as StrictHttpResponse<void>;
      })
    );
  }

  private getAccessToken() {
    this.accessToken = localStorage.getItem('access_token');
  }
}
