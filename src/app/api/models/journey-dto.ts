/* tslint:disable */
/* eslint-disable */
import { AddressDto } from '../models/address-dto';
import { PlaceDto } from '../models/place-dto';
export interface JourneyDto {
  destination?: Array<AddressDto>;
  endDate?: string;
  id?: string;
  placesToVisit?: Array<PlaceDto>;
  startDate?: string;
  startPlace?: Array<AddressDto>;
  user?: string;
}
