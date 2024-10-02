import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Departamento } from 'src/app/modelos/departamento.mode';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { BackendDepartamentosService } from 'src/app/servicios/backend-departamentos.service';
import { BackendEmpleadoService } from 'src/app/servicios/backend-empleado.service';
import { Empleado } from 'src/app/modelos/empleado.model';
import { formatDate } from '@angular/common';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { CompartirEmpleadoService } from 'src/app/servicios/compartir-empleado.service';
@Component({
  selector: 'app-editar-empleado',
  templateUrl: './editar-empleado.component.html',
  styleUrls: ['./editar-empleado.component.scss'],
  providers: [MessageService]
})
export class EditarEmpleadoComponent {

  departamentos!: Departamento[]

  empleado: Empleado | undefined

  formularioActualizarEmpleado:FormGroup

  constructor(private router: Router, private fb: FormBuilder, private empleadosBS: BackendEmpleadoService, private departamentosBS: BackendDepartamentosService, private messageService: MessageService ,private usuarioCompartidoS: CompartirEmpleadoService){

    this.formularioActualizarEmpleado = this.fb.group({

      nombre: ['', [Validators.required, Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$')]],
      apellido: ['', [Validators.required, Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$')]],
      cargo: ['', [Validators.required, Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$')]],
      fecha_contratacion: [, [Validators.required]],
      departamento_id: [, [Validators.required]]

    })

  }

  ngOnInit() {

    this.departamentosBS.listarDepartamentos().pipe(
      catchError(() => {

        this.messageService.add({ severity: 'error', detail: 'No se pudo conectar al servidor. Verifica tu conexión.' })

        return of([]);

      })).subscribe((response) => {

        console.log(response)

        if ('message' in response) {

          this.messageService.add({ severity: 'danger', detail: response.message })

        } else {

          this.departamentos = response;

        }

      }
    );

    this.usuarioCompartidoS.obtenerEmpleadoCompartido().subscribe(empleado => {

      if(empleado) {

        this.empleado = empleado

        this.formularioActualizarEmpleado.patchValue({

          nombre: this.empleado.nombre,
          apellido: this.empleado.apellido,
          cargo: this.empleado.cargo,
          fecha_contratacion: this.empleado.fecha_contratacion,
          departamento_id: this.empleado.departamento_id

        })

      } else {

        this.router.navigateByUrl('/')

      }

    })



  }

  regresar(){

    this.router.navigateByUrl('/')

  }

  actualizarEmpleado(){

    this.empleado!.nombre = this.formularioActualizarEmpleado.controls['nombre'].value
    this.empleado!.apellido = this.formularioActualizarEmpleado.controls['apellido'].value
    this.empleado!.cargo = this.formularioActualizarEmpleado.controls['cargo'].value
    this.empleado!.departamento_id = this.formularioActualizarEmpleado.controls['departamento_id'].value.id
    const fechaContratacion = this.formularioActualizarEmpleado.controls['fecha_contratacion'].value
    this.empleado!.fecha_contratacion = formatDate(fechaContratacion, 'dd-MM-yyyy', 'en-US');

    this.empleadosBS.actualizarEmpleado(this.empleado!).subscribe((response) => {

      if(response.message === "Empleado actualizado") {

        this.messageService.add({ severity: 'success', detail: response.message})

        this.regresar()

      } else {

        this.messageService.add({ severity: 'error', detail: response.message})

      }

    })


  }

}
