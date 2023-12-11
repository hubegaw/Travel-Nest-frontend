import {inject, InjectionToken} from "@angular/core";
import {distinctUntilChanged, Observable, of, shareReplay, switchMap, tap} from "rxjs";
import {map} from "rxjs/operators";
import {UserApiService} from "../services/user-api.service";
import {UserDto} from "../api/models/user-dto";
import {DiCurrentUserEmail} from "./current-user-email.di";

export const DiUser = new InjectionToken<Observable<UserDto | null>>('User Data', {
  providedIn: 'root',
  factory: () => {
    const userService = inject(UserApiService);
    const diCurrentUserEmail$ = inject(DiCurrentUserEmail);

    return diCurrentUserEmail$.pipe(
      switchMap(email => {
        if (email) {

          return userService.getUserByEmail({ email }).pipe(
            map(response => response as UserDto)
          );
        } else {
          return of(null);
        }
      }),
      distinctUntilChanged(),
      shareReplay({bufferSize: 1, refCount: true})
    );
  }
});
