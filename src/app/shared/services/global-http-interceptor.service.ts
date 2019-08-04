import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GlobalHttpInterceptorService implements HttpInterceptor {
  private router: any;
  constructor(private injector: Injector) {
    this.router = this.injector.get(Router);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
          return next.handle(req).pipe(
             catchError((error) => {
              if (error instanceof HttpErrorResponse) {
                if (error.error instanceof ErrorEvent) {
                  console.error('Error Event');
                } else {
                  console.log(`error status : ${error.status} ${error.statusText}`);
                  switch (error.status) {
                    case 404:
                      this.router.navigateByUrl('/404');
                      break;
                    case 500:
                      this.router.navigateByUrl('/500');
                      break;
                    default :
                      this.router.navigateByUrl('/error');
                      break;
                  }
                }
              } else {
                console.error('some thing else happened');
              }
              return throwError(error);
          })
        )
    }
}
