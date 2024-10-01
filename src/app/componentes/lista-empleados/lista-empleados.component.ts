import { Component } from '@angular/core';
import { BackendEmpleadoService } from 'src/app/servicios/backend-empleado.service';
import { Empleado } from 'src/app/modelos/empleado.model';
@Component({
  selector: 'app-lista-empleados',
  templateUrl: './lista-empleados.component.html',
  styleUrls: ['./lista-empleados.component.scss']
})
export class ListaEmpleadosComponent {
  empleados: Empleado[] = [];

  constructor(private empleadoBS: BackendEmpleadoService){}

  ngOnInit(){

    this.empleadoBS.listarEmpleados().subscribe((response) => {

      if('message' in response) {

        alert(response.message)

      } else {

        this.empleados = response;

        console.log(this.empleados)

      }

    })

  }

}
