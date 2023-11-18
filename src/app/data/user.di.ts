import {inject, InjectionToken} from "@angular/core";
import {distinctUntilChanged, Observable, shareReplay} from "rxjs";
import {map} from "rxjs/operators";
import {UserApiService} from "../services/user-api.service";
import {UserDto} from "../api/models/user-dto";

export const DiUser = new InjectionToken<Observable<UserDto>>('User Data', {
  providedIn: 'root',
  factory: () => {
    const userService = inject(UserApiService);
    return userService.getUserByEmail({email: 'hubert.gawczynski@gmail.com'}).pipe(
      map(response => response as UserDto),
      distinctUntilChanged(),
      shareReplay({bufferSize: 1, refCount: true})
    );
  }
});
