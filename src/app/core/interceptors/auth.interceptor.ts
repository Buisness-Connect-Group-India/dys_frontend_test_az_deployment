import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const country = localStorage.getItem('country') || 'IND';
    const language = localStorage.getItem('language') || 'en';
    let headersConfig: Record<string, string> = {
      'apikey': 'D2C_1nD1A',
      'countryheader': country,
      'language': language,
      'content-type': 'application/json'
    };

    let params: HttpParams = req.params;

    const pageNumber = params.get('pageNumber');
    const pageSize = params.get('pageSize');

    if (pageNumber) {
      const adjustedPage = Math.max(0, +pageNumber - 1);
      headersConfig['pageNumber'] = adjustedPage.toString();
      params = params.delete('pageNumber');
    }

    if (pageSize) {
      headersConfig['pageSize'] = pageSize;
      params = params.delete('pageSize');
    }
    let body = req.body;

    if (['POST', 'PUT', 'PATCH'].includes(req.method.toUpperCase()) && body && typeof body === 'object') {
      if (Array.isArray(body)) {
        body = body.map(item => ({
          ...item,
          updatedBy: 'admin'
        }));
      } else {
        body = {
          ...body,
          updatedBy: 'admin'
        };
      }
    }

    const modifiedReq = req.clone({
      setHeaders: headersConfig,
      params,
      body
    });

    return next.handle(modifiedReq);
  }
}
