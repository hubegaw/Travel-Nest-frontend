import {Injectable} from "@angular/core";
import {ApiService} from "../api/services/api.service";
import {ApiConfiguration} from "../api/api-configuration";
import {HttpClient, HttpContext, HttpHeaders, HttpResponse} from "@angular/common/http";
import {HotelResponse} from "../api/models/hotel-response";
import {Observable} from "rxjs";
import {StrictHttpResponse} from "../api/strict-http-response";
import {GetHotels$Params} from "../api/fn/operations/get-hotels";
import {RequestBuilder} from "../api/request-builder";
import {filter, map} from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class HotelsService extends ApiService {
  private accessToken: any;

  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  override getHotels$Response(params: GetHotels$Params, context?: HttpContext): Observable<StrictHttpResponse<HotelResponse>> {
    const rb = new RequestBuilder(this.rootUrl, ApiService.GetHotelsPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }
    this.getAccessToken();

    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.accessToken,
    })

    const httpRequest = rb.build<HotelResponse>({
      responseType: 'json',
      accept: 'application/json',
      context: context,
    })

    const modifiedRequest = httpRequest.clone({headers});

    return this.http.request(modifiedRequest).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<HotelResponse>;
      })
    );
  }

  private getAccessToken() {
    this.accessToken = localStorage.getItem('access_token');
  }
}
