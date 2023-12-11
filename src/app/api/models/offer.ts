/* tslint:disable */
/* eslint-disable */
import { Price } from '../models/price';
import { Room } from '../models/room';
export interface Offer {
  checkInDate?: string;
  checkOutDate?: string;
  id?: string;
  price?: Price;
  room?: Room;
}
