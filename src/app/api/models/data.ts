/* tslint:disable */
/* eslint-disable */
import { Itinerary } from '../models/itinerary';
import { Price } from '../models/price';
export interface Data {
  id?: string;
  itineraries?: Array<Itinerary>;
  lastTicketingDate?: string;
  numberOfBookableSeats?: number;
  oneWay?: boolean;
  price?: Price;
  source?: string;
  type?: string;
}
