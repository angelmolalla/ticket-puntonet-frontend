import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Ticket } from '../model/ticket';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private urlEndPoint: string = `${environment.apiUrl}/ticket`;
  constructor(private http: HttpClient) { }

  create(ticket: Ticket): Observable<any> {
    return this.http.post<any>(this.urlEndPoint, ticket).pipe(
      catchError(e => {
        if (e.status == 400) {
          if (e.error.apierror) {
            swal.fire(e.error.apierror.message, e.error.apierror.debugMessage, 'warning');
          }
        }
        if (e.status == 404) {
          if (e.error.apierror) {
            swal.fire(e.error.apierror.message, e.error.apierror.debugMessage, 'warning');
          }
        }
        if (e.status == 422) {
          if (e.error.apierror.subErrors) {
            let subErrorList = [];
            subErrorList = e.error.apierror.subErrors;
            let message = subErrorList.map(function (x) {
              return " " + x.message;
            })
            swal.fire(e.error.apierror.message, message.toString(), 'error');
          }
        }
        if (e.status == 500) {
          swal.fire('Error en el servidor', 'Disculpe las molestias el servidor está presentando problemas, por favor inténtelo más tarde o comuníquese con nosotros');
        }
        return throwError(e);
      })
    );
  }

  update(ticket: Ticket, id: number): Observable<any> {
    return this.http.put<any>(`${this.urlEndPoint}/${id}`, ticket).pipe(
      catchError(e => {
        if (e.status == 400) {
          if (e.error.apierror) {
            swal.fire(e.error.apierror.message, e.error.apierror.debugMessage, 'warning');
          }
        }
        if (e.status == 404) {
          if (e.error.apierror) {
            swal.fire(e.error.apierror.message, e.error.apierror.debugMessage, 'warning');
          }
        }
        if (e.status == 422) {
          if (e.error.apierror.subErrors) {
            let subErrorList = [];
            subErrorList = e.error.apierror.subErrors;
            let message = subErrorList.map(function (x) {
              return " " + x.message;
            })
            swal.fire(e.error.apierror.message, message.toString(), 'error');
          }
        }
        if (e.status == 500) {
          swal.fire('Error en el servidor', 'Disculpe las molestias el servidor está presentando problemas, por favor inténtelo más tarde o comuníquese con nosotros');
        }
        return throwError(e);
      })
    );
  }

  findAll(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(this.urlEndPoint);
  }

  find(id: number): Observable<Ticket> {
    return this.http.get<Ticket>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if (e.status == 400) {
          if (e.error.apierror) {
            swal.fire(e.error.apierror.message, e.error.apierror.debugMessage, 'warning');
          }
        }
        if (e.status == 404) {
          if (e.error.apierror) {
            swal.fire(e.error.apierror.message, e.error.apierror.debugMessage, 'warning');
          }
        }
        if (e.status == 500) {
          swal.fire('Error en el servidor', 'Disculpe las molestias el servidor está presentando problemas, por favor inténtelo más tarde o comuníquese con nosotros');
        }
        return throwError(e);
      })
    );
  }

  delete(id: number): Observable<Ticket> {
    return this.http.delete<Ticket>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if (e.status == 400) {
          if (e.error.apierror) {
            swal.fire(e.error.apierror.message, e.error.apierror.debugMessage, 'warning');
          }
        }
        if (e.status == 404) {
          if (e.error.apierror) {
            swal.fire(e.error.apierror.message, e.error.apierror.debugMessage, 'warning');
          }
        }
        if (e.status == 500) {
          swal.fire('Error en el servidor', 'Disculpe las molestias el servidor está presentando problemas, por favor inténtelo más tarde o comuníquese con nosotros');
        }
        return throwError(e);
      })
    );
  }

}
