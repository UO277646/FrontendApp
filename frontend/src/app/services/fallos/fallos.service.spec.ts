import { TestBed } from '@angular/core/testing';

import { FallosService } from './fallos.service';

describe('FallosService', () => {
  let service: FallosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FallosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
