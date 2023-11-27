/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { AirportAndCityResponse } from '../models/airport-and-city-response';
import { authenticate } from '../fn/operations/authenticate';
import { Authenticate$Params } from '../fn/operations/authenticate';
import { AuthResponse } from '../models/auth-response';
import { deleteJourney } from '../fn/operations/delete-journey';
import { DeleteJourney$Params } from '../fn/operations/delete-journey';
import { FlightOfferResponse } from '../models/flight-offer-response';
import { getAirports } from '../fn/operations/get-airports';
import { GetAirports$Params } from '../fn/operations/get-airports';
import { getAllUserJourneys } from '../fn/operations/get-all-user-journeys';
import { GetAllUserJourneys$Params } from '../fn/operations/get-all-user-journeys';
import { getAllUsers } from '../fn/operations/get-all-users';
import { GetAllUsers$Params } from '../fn/operations/get-all-users';
import { getHotels } from '../fn/operations/get-hotels';
import { GetHotels$Params } from '../fn/operations/get-hotels';
import { getJourney } from '../fn/operations/get-journey';
import { GetJourney$Params } from '../fn/operations/get-journey';
import { getUserByEmail } from '../fn/operations/get-user-by-email';
import { GetUserByEmail$Params } from '../fn/operations/get-user-by-email';
import { getUserById } from '../fn/operations/get-user-by-id';
import { GetUserById$Params } from '../fn/operations/get-user-by-id';
import { HotelResponse } from '../models/hotel-response';
import { JourneyDto } from '../models/journey-dto';
import { postFlightOffers } from '../fn/operations/post-flight-offers';
import { PostFlightOffers$Params } from '../fn/operations/post-flight-offers';
import { refreshAccessToken } from '../fn/operations/refresh-access-token';
import { RefreshAccessToken$Params } from '../fn/operations/refresh-access-token';
import { register } from '../fn/operations/register';
import { Register$Params } from '../fn/operations/register';
import { saveJourney } from '../fn/operations/save-journey';
import { SaveJourney$Params } from '../fn/operations/save-journey';
import { updateJourney } from '../fn/operations/update-journey';
import { UpdateJourney$Params } from '../fn/operations/update-journey';
import { updateUserProfile } from '../fn/operations/update-user-profile';
import { UpdateUserProfile$Params } from '../fn/operations/update-user-profile';
import { UserDto } from '../models/user-dto';

@Injectable({ providedIn: 'root' })
export class ApiService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `register()` */
  static readonly RegisterPath = '/auth/register';

  /**
   * register user.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `register()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  register$Response(params: Register$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return register(this.http, this.rootUrl, params, context);
  }

  /**
   * register user.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `register$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  register(params: Register$Params, context?: HttpContext): Observable<void> {
    return this.register$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `authenticate()` */
  static readonly AuthenticatePath = '/auth/authenticate';

  /**
   * authenticate user.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authenticate()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  authenticate$Response(params: Authenticate$Params, context?: HttpContext): Observable<StrictHttpResponse<AuthResponse>> {
    return authenticate(this.http, this.rootUrl, params, context);
  }

  /**
   * authenticate user.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `authenticate$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  authenticate(params: Authenticate$Params, context?: HttpContext): Observable<AuthResponse> {
    return this.authenticate$Response(params, context).pipe(
      map((r: StrictHttpResponse<AuthResponse>): AuthResponse => r.body)
    );
  }

  /** Path part for operation `refreshAccessToken()` */
  static readonly RefreshAccessTokenPath = '/auth/refresh-token';

  /**
   * Refreshes the access token.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `refreshAccessToken()` instead.
   *
   * This method doesn't expect any request body.
   */
  refreshAccessToken$Response(params?: RefreshAccessToken$Params, context?: HttpContext): Observable<StrictHttpResponse<AuthResponse>> {
    return refreshAccessToken(this.http, this.rootUrl, params, context);
  }

  /**
   * Refreshes the access token.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `refreshAccessToken$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  refreshAccessToken(params?: RefreshAccessToken$Params, context?: HttpContext): Observable<AuthResponse> {
    return this.refreshAccessToken$Response(params, context).pipe(
      map((r: StrictHttpResponse<AuthResponse>): AuthResponse => r.body)
    );
  }

  /** Path part for operation `getAllUsers()` */
  static readonly GetAllUsersPath = '/v1/users';

  /**
   * Get list of all users.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllUsers()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllUsers$Response(params?: GetAllUsers$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<UserDto>>> {
    return getAllUsers(this.http, this.rootUrl, params, context);
  }

  /**
   * Get list of all users.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllUsers$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllUsers(params?: GetAllUsers$Params, context?: HttpContext): Observable<Array<UserDto>> {
    return this.getAllUsers$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<UserDto>>): Array<UserDto> => r.body)
    );
  }

  /** Path part for operation `getUserById()` */
  static readonly GetUserByIdPath = '/v1/users/{userId}';

  /**
   * Get user by id.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getUserById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUserById$Response(params: GetUserById$Params, context?: HttpContext): Observable<StrictHttpResponse<UserDto>> {
    return getUserById(this.http, this.rootUrl, params, context);
  }

  /**
   * Get user by id.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getUserById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUserById(params: GetUserById$Params, context?: HttpContext): Observable<UserDto> {
    return this.getUserById$Response(params, context).pipe(
      map((r: StrictHttpResponse<UserDto>): UserDto => r.body)
    );
  }

  /** Path part for operation `updateUserProfile()` */
  static readonly UpdateUserProfilePath = '/v1/users/{userId}';

  /**
   * Update user by id.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateUserProfile()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateUserProfile$Response(params: UpdateUserProfile$Params, context?: HttpContext): Observable<StrictHttpResponse<UserDto>> {
    return updateUserProfile(this.http, this.rootUrl, params, context);
  }

  /**
   * Update user by id.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateUserProfile$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateUserProfile(params: UpdateUserProfile$Params, context?: HttpContext): Observable<UserDto> {
    return this.updateUserProfile$Response(params, context).pipe(
      map((r: StrictHttpResponse<UserDto>): UserDto => r.body)
    );
  }

  /** Path part for operation `getUserByEmail()` */
  static readonly GetUserByEmailPath = '/v1/users/{email}';

  /**
   * Get user by email.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getUserByEmail()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUserByEmail$Response(params: GetUserByEmail$Params, context?: HttpContext): Observable<StrictHttpResponse<UserDto>> {
    return getUserByEmail(this.http, this.rootUrl, params, context);
  }

  /**
   * Get user by email.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getUserByEmail$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUserByEmail(params: GetUserByEmail$Params, context?: HttpContext): Observable<UserDto> {
    return this.getUserByEmail$Response(params, context).pipe(
      map((r: StrictHttpResponse<UserDto>): UserDto => r.body)
    );
  }

  /** Path part for operation `getAllUserJourneys()` */
  static readonly GetAllUserJourneysPath = '/v1/journeys';

  /**
   * Get list of all user's journeys.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllUserJourneys()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllUserJourneys$Response(params?: GetAllUserJourneys$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<JourneyDto>>> {
    return getAllUserJourneys(this.http, this.rootUrl, params, context);
  }

  /**
   * Get list of all user's journeys.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllUserJourneys$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllUserJourneys(params?: GetAllUserJourneys$Params, context?: HttpContext): Observable<Array<JourneyDto>> {
    return this.getAllUserJourneys$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<JourneyDto>>): Array<JourneyDto> => r.body)
    );
  }

  /** Path part for operation `saveJourney()` */
  static readonly SaveJourneyPath = '/v1/journeys';

  /**
   * save journey.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `saveJourney()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveJourney$Response(params: SaveJourney$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return saveJourney(this.http, this.rootUrl, params, context);
  }

  /**
   * save journey.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `saveJourney$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveJourney(params: SaveJourney$Params, context?: HttpContext): Observable<void> {
    return this.saveJourney$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `deleteJourney()` */
  static readonly DeleteJourneyPath = '/v1/journeys';

  /**
   * Delete journey.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteJourney()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteJourney$Response(params: DeleteJourney$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return deleteJourney(this.http, this.rootUrl, params, context);
  }

  /**
   * Delete journey.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteJourney$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteJourney(params: DeleteJourney$Params, context?: HttpContext): Observable<void> {
    return this.deleteJourney$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `getJourney()` */
  static readonly GetJourneyPath = '/v1/journeys/{id}';

  /**
   * Get journey.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getJourney()` instead.
   *
   * This method doesn't expect any request body.
   */
  getJourney$Response(params: GetJourney$Params, context?: HttpContext): Observable<StrictHttpResponse<JourneyDto>> {
    return getJourney(this.http, this.rootUrl, params, context);
  }

  /**
   * Get journey.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getJourney$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getJourney(params: GetJourney$Params, context?: HttpContext): Observable<JourneyDto> {
    return this.getJourney$Response(params, context).pipe(
      map((r: StrictHttpResponse<JourneyDto>): JourneyDto => r.body)
    );
  }

  /** Path part for operation `updateJourney()` */
  static readonly UpdateJourneyPath = '/v1/journeys/{id}';

  /**
   * Update journey.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateJourney()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateJourney$Response(params: UpdateJourney$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return updateJourney(this.http, this.rootUrl, params, context);
  }

  /**
   * Update journey.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateJourney$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateJourney(params: UpdateJourney$Params, context?: HttpContext): Observable<void> {
    return this.updateJourney$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `postFlightOffers()` */
  static readonly PostFlightOffersPath = '/v1/amadeus/flights/flight-offers';

  /**
   * post flight offers.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postFlightOffers()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postFlightOffers$Response(params: PostFlightOffers$Params, context?: HttpContext): Observable<StrictHttpResponse<FlightOfferResponse>> {
    return postFlightOffers(this.http, this.rootUrl, params, context);
  }

  /**
   * post flight offers.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `postFlightOffers$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postFlightOffers(params: PostFlightOffers$Params, context?: HttpContext): Observable<FlightOfferResponse> {
    return this.postFlightOffers$Response(params, context).pipe(
      map((r: StrictHttpResponse<FlightOfferResponse>): FlightOfferResponse => r.body)
    );
  }

  /** Path part for operation `getAirports()` */
  static readonly GetAirportsPath = '/v1/amadeus/airports';

  /**
   * get airports.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAirports()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  getAirports$Response(params: GetAirports$Params, context?: HttpContext): Observable<StrictHttpResponse<AirportAndCityResponse>> {
    return getAirports(this.http, this.rootUrl, params, context);
  }

  /**
   * get airports.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAirports$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  getAirports(params: GetAirports$Params, context?: HttpContext): Observable<AirportAndCityResponse> {
    return this.getAirports$Response(params, context).pipe(
      map((r: StrictHttpResponse<AirportAndCityResponse>): AirportAndCityResponse => r.body)
    );
  }

  /** Path part for operation `getHotels()` */
  static readonly GetHotelsPath = '/v1/amadeus/hotels';

  /**
   * get hotels.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getHotels()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  getHotels$Response(params: GetHotels$Params, context?: HttpContext): Observable<StrictHttpResponse<HotelResponse>> {
    return getHotels(this.http, this.rootUrl, params, context);
  }

  /**
   * get hotels.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getHotels$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  getHotels(params: GetHotels$Params, context?: HttpContext): Observable<HotelResponse> {
    return this.getHotels$Response(params, context).pipe(
      map((r: StrictHttpResponse<HotelResponse>): HotelResponse => r.body)
    );
  }

}
