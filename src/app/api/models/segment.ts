/* tslint:disable */
/* eslint-disable */
import { Arrival } from '../models/arrival';
import { Departure } from '../models/departure';
export interface Segment {
  arrival?: Arrival;
  blacklistedInEU?: boolean;
  carrierCode?: string;
  departure?: Departure;
  id?: string;
  numberOfStops?: number;
}
