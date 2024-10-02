import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Departamento, ErrorResponse } from '../modelos/departamento.mode';
import { environment } from 'src/environments/environment';
import { Observable, throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';

const BackEndApi = environment.urlBackend;

const HttpOptions = {

  headers: new HttpHeaders({
    
    'Content-Type': 'application/json',

  })

}

@Injectable({
  providedIn: 'root'
})
export class BackendDepartamentosService {

  constructor(private http: HttpClient) { }

  listarDepartamentos() {

    const url = BackEndApi + '/api/departamentos'

    return this.http.get<Departamento[]>(url, HttpOptions).pipe(catchError(this.handleError));

  } 

  private handleError(error: HttpErrorResponse): Observable<ErrorResponse> {

    let errorMessage = 'Ha ocurrido un error inesperado.';

    if (error.error instanceof ErrorEvent) {

      errorMessage = `Error: ${error.error.message}`;

    } else {

      errorMessage = `Código de error: ${error.status}\nMensaje: ${error.message}`;

    }

    return throwError(() => ({ message: errorMessage } as ErrorResponse));

  }

}


