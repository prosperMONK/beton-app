import { TestBed } from '@angular/core/testing';

import { CimentService } from './ciment.service';

describe('CimentService', () => {
  let service: CimentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CimentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
