import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { SessionStorageService } from '../service/session-storage.service';
import { LOCALSTORAGE_KEY, SESSION_STORAGE_KEY } from '../../config/config';
import { LocalStorageService } from '../service/localstorage.service';

export const adminGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const sessionStorageService = inject(SessionStorageService)
  sessionStorageService.set(SESSION_STORAGE_KEY.CURRENT_PAGE, state.url)

  const localstorage = inject(LocalStorageService)
  const token = localstorage.get(LOCALSTORAGE_KEY.TOKEN)
  if(!token) {
    const router = inject(Router)
    router.navigateByUrl("/login")
  }
  return true;
};
