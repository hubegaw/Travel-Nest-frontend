/* tslint:disable */
/* eslint-disable */
import { Airport } from '../models/airport';
export interface Included {
  airports?: {
[key: string]: Airport;
};
}
