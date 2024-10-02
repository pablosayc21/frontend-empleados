import { Component } from '@angular/core';
import { BackendDepartamentosService } from 'src/app/servicios/backend-departamentos.service';
import { BackendEmpleadoService } from 'src/app/servicios/backend-empleado.service';
import { Departamento } from 'src/app/modelos/departamento.mode';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NuevoEmpleado } from 'src/app/modelos/empleado.model';
import { formatDate } from '@angular/common';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-agregar-empleado',
  templateUrl: './agregar-empleado.component.html',
  styleUrls: ['./agregar-empleado.component.scss'],
  providers: [MessageService]
})
export class AgregarEmpleadoComponent {

  departamentos!: Departamento[]

  formularioIngresoEmpleado:FormGroup

  constructor(private empleadosBS: BackendEmpleadoService, private departamentosBS: BackendDepartamentosService, private messageService: MessageService, private fb: FormBuilder){

    this.formularioIngresoEmpleado = this.fb.group({

      nombre: ['', [Validators.required, Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$')]],
      apellido: ['', [Validators.required, Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$')]],
      cargo: ['', [Validators.required, Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$')]],
      fecha_contratacion: [, [Validators.required]],
      departamento_id: [, [Validators.required]]

    })

  }

  ngOnInit(){

    this.departamentosBS.listarDepartamentos().pipe(
      catchError(() => {

        this.messageService.add({severity: 'error', detail: 'No se pudo conectar al servidor. Verifica tu conexión.' })

        return of([]); 
        
      })
    ).subscribe((response) => {

      console.log(response)

      if('message' in response) {

        this.messageService.add({ severity: 'danger', detail: response.message})

      } else {
        
        this.departamentos = response;

      }

    });

  }

  agregarEmpleado(){

    const nuevoEmpleado:NuevoEmpleado = this.formularioIngresoEmpleado.value;

    nuevoEmpleado.departamento_id = this.formularioIngresoEmpleado.controls['departamento_id'].value.id

    const fechaContratacion = this.formularioIngresoEmpleado.controls['fecha_contratacion'].value

    nuevoEmpleado.fecha_contratacion = formatDate(fechaContratacion, 'dd-MM-yyyy', 'en-US')

    this.empleadosBS.agregarEmpleado(nuevoEmpleado).subscribe((response) => {

      if(response.message === "Empleado agregado") {

        this.messageService.add({ severity: 'success', detail: response.message})

        this.formularioIngresoEmpleado.reset()

      } else {

        this.messageService.add({ severity: 'error', detail: response.message})

      }

    });

  }

}
