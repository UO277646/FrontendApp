import { TestBed } from '@angular/core/testing';

import { DeteccionService } from './deteccion.service';

describe('DeteccionService', () => {
  let service: DeteccionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeteccionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
