import { TestBed } from '@angular/core/testing';

import { BackendDepartamentosService } from './backend-departamentos.service';

describe('BackendDepartamentosService', () => {
  let service: BackendDepartamentosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackendDepartamentosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
