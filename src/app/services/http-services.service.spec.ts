import { TestBed, inject } from '@angular/core/testing';

import { HttpServicesService } from './http-services.service';

describe('HttpServicesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpServicesService]
    });
  });

  it('should be created', inject([HttpServicesService], (service: HttpServicesService) => {
    expect(service).toBeTruthy();
  }));
});
