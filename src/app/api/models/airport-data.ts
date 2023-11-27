/* tslint:disable */
/* eslint-disable */
import { AmadeusAddress } from '../models/amadeus-address';
import { AmadeusGeoCode } from '../models/amadeus-geo-code';
import { Relationship } from '../models/relationship';
export interface AirportData {
  address?: AmadeusAddress;
  geoCode?: AmadeusGeoCode;
  iataCode?: string;
  name?: string;
  relationships?: Array<Relationship>;
  subType?: string;
  timeZoneOffset?: string;
  type?: string;
}
