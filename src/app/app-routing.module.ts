import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaEmpleadosComponent } from './componentes/lista-empleados/lista-empleados.component';
import { AgregarEmpleadoComponent } from './componentes/agregar-empleado/agregar-empleado.component';
import { EditarEmpleadoComponent } from './componentes/editar-empleado/editar-empleado.component';

const routes: Routes = [

  {path: '', redirectTo: 'listaEmpleados', pathMatch: 'full'},
  {path: 'listaEmpleados', component: ListaEmpleadosComponent},
  {path: 'agregarEmpleado', component: AgregarEmpleadoComponent},
  {path: 'editarEmpleado', component: EditarEmpleadoComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
