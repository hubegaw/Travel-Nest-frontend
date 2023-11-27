/* tslint:disable */
/* eslint-disable */
import { AmadeusAddress } from '../models/amadeus-address';
import { AmadeusGeoCode } from '../models/amadeus-geo-code';
export interface HotelResponse {
  address?: AmadeusAddress;
  chainCode?: string;
  dupeId?: number;
  geoCode?: AmadeusGeoCode;
  hotelId?: string;
  iataCode?: string;
  name?: string;
}
