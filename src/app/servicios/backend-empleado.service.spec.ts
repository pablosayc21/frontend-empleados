import { TestBed } from '@angular/core/testing';

import { BackendEmpleadoService } from './backend-empleado.service';

describe('BackendService', () => {
  let service: BackendEmpleadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackendEmpleadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
