import {inject, InjectionToken} from "@angular/core";
import {distinctUntilChanged, Observable, of, shareReplay} from "rxjs";
import {AuthenticationService} from "../services/auth.service";
import {map} from "rxjs/operators";

export const DiCurrentUserId = new InjectionToken<Observable<string>>('Current user id', {
  providedIn: 'root',
  factory: () => {
    const authService = inject(AuthenticationService);
    return of(authService.decodeToken()).pipe(
      map(response => (response as any)?.userId as string),
      distinctUntilChanged(),
      shareReplay({bufferSize: 1, refCount: true})
    );
  }
});
