import {HotelOfferRequest} from "../api/models/hotel-offer-request";
import {BehaviorSubject} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable({ providedIn: 'root' })
export class HotelDataService {
  private hotelOfferRequestSource = new BehaviorSubject<HotelOfferRequest | null>(null);

  currentHotelOfferRequest = this.hotelOfferRequestSource.asObservable();

  passHotelOfferRequest(hotelOfferRequest: HotelOfferRequest) {
    this.hotelOfferRequestSource.next(hotelOfferRequest);
  }
}
