import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BarraOpcionesComponent } from './componentes/barra-opciones/barra-opciones.component';
import { ListaEmpleadosComponent } from './componentes/lista-empleados/lista-empleados.component';
import { EditarEmpleadoComponent } from './componentes/editar-empleado/editar-empleado.component';
import { AgregarEmpleadoComponent } from './componentes/agregar-empleado/agregar-empleado.component';
import { TableModule } from 'primeng/table';


@NgModule({
  declarations: [
    AppComponent,
    BarraOpcionesComponent,
    ListaEmpleadosComponent,
    EditarEmpleadoComponent,
    AgregarEmpleadoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TableModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
