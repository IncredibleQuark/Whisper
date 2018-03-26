import { TestBed, inject } from '@angular/core/testing';

import { ChatConnectionService } from './chatConnection.service';

describe('ConnectionServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChatConnectionService]
    });
  });

  it('should be created', inject([ChatConnectionService], (service: ChatConnectionService) => {
    expect(service).toBeTruthy();
  }));
});
