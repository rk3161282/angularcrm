import { TestBed, inject } from '@angular/core/testing';

import { OpentokService } from './opentok.service';

describe('OpentokService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OpentokService]
    });
  });

  it('should be created', inject([OpentokService], (service: OpentokService) => {
    expect(service).toBeTruthy();
  }));
});
