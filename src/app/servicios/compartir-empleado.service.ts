import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Empleado } from '../modelos/empleado.model';

@Injectable({
  providedIn: 'root'
})
export class CompartirEmpleadoService {

  private empleadoCompartido = new BehaviorSubject<Empleado | null>(null);

  constructor() { }

  obtenerEmpleadoCompartido(){

    return this.empleadoCompartido;

  }

  cambiarEmpleadoCompartido(empleado: Empleado){

    this.empleadoCompartido.next(empleado);

  }


}
