import { TestBed } from '@angular/core/testing';

import { GravierService } from './gravier.service';

describe('GravierService', () => {
  let service: GravierService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GravierService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
