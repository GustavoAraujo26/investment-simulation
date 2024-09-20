import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import Swal from "sweetalert2";
import { AppState } from "../state/app.state";
import { Store } from "@ngrx/store";
import { toogleLoading } from "../state/loading/loading.actions";

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private store: Store<AppState>) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMessage = '';
          if (error.error instanceof ErrorEvent){
            errorMessage = error.error.message;
            console.log(`Client side error: ${errorMessage}`);
          }
          else{
            errorMessage = `Código do erro: ${error.status}, Mensagem: ${error.message}`;
            console.log(`Server side error: ${errorMessage}`);
          }
          Swal.fire({
            icon: 'error',
            title: 'Ocorreu um erro na aplicação!',
            text: errorMessage
          });
          this.store.dispatch(toogleLoading({ show: false }));
          return throwError(errorMessage);
        })
      );
  }
}
