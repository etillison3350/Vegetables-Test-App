import { TestBed } from '@angular/core/testing';

import { VegetablesService } from './vegetables.service';

describe('VegetablesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VegetablesService = TestBed.get(VegetablesService);
    expect(service).toBeTruthy();
  });
});
