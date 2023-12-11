/* tslint:disable */
/* eslint-disable */
import { Hotel } from '../models/hotel';
import { Offer } from '../models/offer';
import { Price } from '../models/price';
export interface HotelOffer {
  available?: boolean;
  hotel?: Hotel;
  offers?: Array<Offer>;
  price?: Price;
  type?: string;
}
