import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Empleado, ErrorResponse, EmpleadoResponse } from '../modelos/empleado.model';
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



export class BackendEmpleadoService {

  constructor(private http: HttpClient) { }

  listarEmpleados(): Observable<Empleado[] | ErrorResponse> {

    const url = BackEndApi + "/api/empleados"

    return this.http.get<Empleado[]>(url, HttpOptions).pipe(catchError(this.handleError));

  }

  agregarEmpleado(empleado: Empleado): Observable<EmpleadoResponse | ErrorResponse> {

    const url = BackEndApi + '/api/empleados'

    return this.http.post<EmpleadoResponse>(url, empleado, HttpOptions).pipe(catchError(this.handleError));

  }

  actualizarEmpleado(empleado: Empleado): Observable<EmpleadoResponse | ErrorResponse> {

    const url = BackEndApi + '/api/empleados/' + empleado.id

    return this.http.put<EmpleadoResponse>(url, empleado, HttpOptions).pipe(catchError(this.handleError));

  }

  eliminarEmpleado(empleado: Empleado): Observable<EmpleadoResponse | ErrorResponse > {

    const url = BackEndApi +'/api/empleados/' + empleado.id

    return this.http.delete<EmpleadoResponse>(url, HttpOptions).pipe(catchError(this.handleError))

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
