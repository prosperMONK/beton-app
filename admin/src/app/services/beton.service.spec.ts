import { TestBed } from '@angular/core/testing';

import { BetonService } from './beton.service';

describe('BetonService', () => {
  let service: BetonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BetonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
