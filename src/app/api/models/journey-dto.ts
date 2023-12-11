/* tslint:disable */
/* eslint-disable */
import { AddressDto } from '../models/address-dto';
import { FlightData } from '../models/flight-data';
import { PlaceDto } from '../models/place-dto';
import { Price } from '../models/price';
import { Room } from '../models/room';
export interface JourneyDto {
  destination?: Array<AddressDto>;
  endDate?: string;
  flights?: Array<FlightData>;
  hotels?: Array<{
'hotelId'?: string;
'name'?: string;
'checkIn'?: string;
'checkOut'?: string;
'price'?: Price;
'room'?: Room;
'geoCode'?: {
'latitude'?: number;
'longitude'?: number;
};
}>;
  id?: string;
  placesToVisit?: Array<PlaceDto>;
  startDate?: string;
  startPlace?: Array<AddressDto>;
  user?: string;
}
