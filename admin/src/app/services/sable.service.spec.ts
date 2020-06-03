import { TestBed } from '@angular/core/testing';

import { SableService } from './sable.service';

describe('SableService', () => {
  let service: SableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
