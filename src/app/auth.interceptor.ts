// auth.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Check if token exists in sessionStorage
    const accessToken = sessionStorage.getItem('accessToken');

    // Check if the request URL requires auth and if a token exists
    if (accessToken) {
      const authReq = req.clone({
        setHeaders: { Authorization: `Bearer ${accessToken}` },
      });
      return next.handle(authReq);
    }

    // If auth is not required or no token, pass the request as is
    return next.handle(req);
  }
}
