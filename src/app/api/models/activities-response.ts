/* tslint:disable */
/* eslint-disable */
import { AmadeusGeoCode } from '../models/amadeus-geo-code';
export type ActivitiesResponse = Array<{
'type'?: string;
'name'?: string;
'description'?: string;
'bookingLink'?: string;
'minimumDuration'?: string;
'pictures'?: Array<string>;
'geoCode'?: AmadeusGeoCode;
}>;
