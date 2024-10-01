export interface Empleado {

  id: number;
  nombre: string;
  apellido: string;
  cargo: string;
  fecha_contratacion: string;
  departamento_id: number;

}

export interface EmpleadoResponse {
  message: string;
}


export interface ErrorResponse {

  message: string;

}