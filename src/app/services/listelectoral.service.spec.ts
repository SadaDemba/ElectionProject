import { TestBed } from '@angular/core/testing';

import { ListelectoralService } from './listelectoral.service';

describe('ListelectoralService', () => {
  let service: ListelectoralService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListelectoralService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
