import {Injectable} from "@angular/core";
import {ApiConfiguration} from "../api/api-configuration";
import {HttpClient, HttpContext, HttpHeaders, HttpResponse} from "@angular/common/http";
import {ApiService} from "../api/services";
import {Observable, tap} from "rxjs";
import {UserDto} from "../api/models/user-dto";
import {StrictHttpResponse} from "../api/strict-http-response";
import {RequestBuilder} from "../api/request-builder";
import {filter, map} from "rxjs/operators";
import {AuthDto} from "../api/models/auth-dto";
import {AuthResponse} from "../api/models/auth-response";

@Injectable({ providedIn: 'root' })
export class UserApiService extends ApiService {
  private accessToken: any;

  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  override authenticate$Response(
    params: {
      body: AuthDto
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<AuthResponse>> {
    const rb = new RequestBuilder(this.rootUrl, ApiService.AuthenticatePath, 'post');
    if (params) {
       rb.body(params.body, 'application/json');
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'application/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<AuthResponse>;
      })
    );
  }

  override getAllUsers$Response(
    params: {

    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<Array<UserDto>>> {
    const rb = new RequestBuilder(this.rootUrl, ApiService.GetAllUsersPath, 'get');
    if (params) {
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
        return r as StrictHttpResponse<Array<UserDto>>;
      })
    );
  }

  override getUserById$Response(params: {
    userId: string
  }, context?: HttpContext): Observable<StrictHttpResponse<UserDto>> {
    const rb = new RequestBuilder(this.rootUrl, ApiService.GetUserByIdPath, 'get');
    if (params) {
      rb.path('userId', params.userId, {});
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
        return r as StrictHttpResponse<UserDto>;
      })
    );
  }

  override updateUserProfile$Response(params: {
    userId: string,
    body: UserDto
  }, context?: HttpContext): Observable<StrictHttpResponse<UserDto>> {
    const rb = new RequestBuilder(this.rootUrl, ApiService.UpdateUserProfilePath, 'put');
    if (params) {
      rb.path('userId', params.userId, {});
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
        return r as StrictHttpResponse<UserDto>;
      })
    );
  }

  override getUserByEmail$Response(params: {
    email: string
  }, context?: HttpContext): Observable<StrictHttpResponse<UserDto>> {
    const rb = new RequestBuilder(this.rootUrl, ApiService.GetUserByEmailPath, 'get');
    if (params) {
      rb.path('email', params.email, {});
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
        return r as StrictHttpResponse<UserDto>;
      })
    );
  }

  private getAccessToken() {
    this.accessToken = localStorage.getItem('access_token');
  }
}
