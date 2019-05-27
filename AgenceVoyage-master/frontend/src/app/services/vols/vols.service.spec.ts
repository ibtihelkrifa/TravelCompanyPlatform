import { TestBed } from '@angular/core/testing';

import { VolsService } from './vols.service';

describe('VolsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VolsService = TestBed.get(VolsService);
    expect(service).toBeTruthy();
  });
});
