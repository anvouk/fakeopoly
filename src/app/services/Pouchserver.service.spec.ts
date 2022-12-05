import { TestBed } from '@angular/core/testing';

import { PouchserverService } from './pouchserver.service';

describe('PouchserverService', () => {
  let service: PouchserverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PouchserverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
