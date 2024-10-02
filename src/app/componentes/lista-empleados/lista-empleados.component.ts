import { Component } from '@angular/core';
import { BackendEmpleadoService } from 'src/app/servicios/backend-empleado.service';
import { Empleado, EmpleadoResponse } from 'src/app/modelos/empleado.model';
import { BackendDepartamentosService } from 'src/app/servicios/backend-departamentos.service';
import { Departamento } from 'src/app/modelos/departamento.mode';
import { MessageService } from 'primeng/api';
import { CompartirEmpleadoService } from 'src/app/servicios/compartir-empleado.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-lista-empleados',
  templateUrl: './lista-empleados.component.html',
  styleUrls: ['./lista-empleados.component.scss'],
  providers: [MessageService]
})
export class ListaEmpleadosComponent {

  empleados!: Empleado[]

  departamentos!: Departamento[]

  departamentoMap: { [key: number]: string } = {}

  loading: boolean = false

  constructor(private empleadoBS: BackendEmpleadoService, 
    private departamentoBS: BackendDepartamentosService, 
    private messageService: MessageService,
    private compartirEmpleadoS: CompartirEmpleadoService,
    private router: Router){

    this.empleados = []

  }

  ngOnInit(){

    this.departamentoBS.listarDepartamentos().pipe(

      catchError(() => {

        this.messageService.add({severity: 'error', detail: 'No se pudo conectar al servidor. Verifica tu conexión.' })

        return of([])

      })
    ).subscribe((response) => {

      if('message' in response) {

        this.messageService.add({ severity: 'danger', detail: response.message})

      } else {
        
        this.departamentos = response;

        this.departamentos.forEach(departamento => {

          this.departamentoMap[departamento.id] = departamento.nombre

        });

      }

    });

    this.empleadoBS.listarEmpleados().pipe(
      catchError(() => {

        this.messageService.add({severity: 'error', detail: 'No se pudo conectar al servidor. Verifica tu conexión.' })

        return of([]); 
        
      })
    ).subscribe((response) => {

      if('message' in response) {

        this.messageService.add({ severity: 'error', detail: response.message})

      } else {

        this.empleados = response;

      }

    });

  }

  eliminarEmpleado(empleado: Empleado) {

    this.empleadoBS.eliminarEmpleado(empleado).subscribe((response) => {

      if(response.message === "Empleado eliminado.") {

        this.empleados = this.empleados.filter(e => e.id !== empleado.id)

        this.messageService.add({ severity: 'success', detail: response.message})

      } else {

        this.messageService.add({ severity: 'danger', detail: response.message})

      }

    });

  }

  editarEmpleado(empleado: Empleado) {

    this.compartirEmpleadoS.cambiarEmpleadoCompartido(empleado)

    this.router.navigateByUrl('/editarEmpleado')

  }

}
