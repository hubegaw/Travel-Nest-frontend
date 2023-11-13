import {BehaviorSubject} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private resultsSource = new BehaviorSubject<any>([]);
  currentResults = this.resultsSource.asObservable();

  constructor() { }

  updateResults(result: any) {
    this.resultsSource.next(result);
  }
}
