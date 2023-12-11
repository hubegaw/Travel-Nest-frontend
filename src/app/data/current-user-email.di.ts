import {inject, InjectionToken} from "@angular/core";
import {distinctUntilChanged, Observable, of, shareReplay} from "rxjs";
import {map} from "rxjs/operators";
import {AuthenticationService} from "../services/auth.service";

export const DiCurrentUserEmail = new InjectionToken<Observable<string>>('Current user email', {
  providedIn: 'root',
  factory: () => {
    const authService = inject(AuthenticationService);
    return of(authService.decodeToken()).pipe(
      map(response => (response as any)?.email as string),
      distinctUntilChanged(),
      shareReplay({bufferSize: 1, refCount: true})
    );
  }
});
