/* tslint:disable */
/* eslint-disable */
import { AirportData } from '../models/airport-data';
import { Included } from '../models/included';
export interface AirportAndCityResponse {
  data?: Array<AirportData>;
  included?: Included;
}
