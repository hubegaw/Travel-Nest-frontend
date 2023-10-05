/* tslint:disable */
/* eslint-disable */
import { AddressDto } from '../models/address-dto';
import { PlaceDto } from '../models/place-dto';
export interface JourneyDto {
  destination?: Array<AddressDto>;
  end_date?: string;
  id?: string;
  places_to_visit?: Array<PlaceDto>;
  start_date?: string;
  start_place?: Array<AddressDto>;
  user?: string;
}
