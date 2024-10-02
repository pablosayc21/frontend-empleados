import { TestBed } from '@angular/core/testing';

import { CompartirEmpleadoService } from './compartir-empleado.service';

describe('CompartirEmpleadoService', () => {
  let service: CompartirEmpleadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompartirEmpleadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
