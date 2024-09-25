import { TestBed } from '@angular/core/testing';

import { RestriccionService } from './restriccion.service';

describe('RestriccionService', () => {
  let service: RestriccionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestriccionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
