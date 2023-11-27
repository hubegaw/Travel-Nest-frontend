/* tslint:disable */
/* eslint-disable */
import { Dictionary } from '../models/dictionary';
import { FlightData } from '../models/flight-data';
export interface FlightOfferResponse {
  data?: Array<FlightData>;
  dictionaries?: Dictionary;
}
