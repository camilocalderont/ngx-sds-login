import { TestBed } from '@angular/core/testing';

import { NgxSdsLoginService } from './ngx-sds-login.service';

describe('NgxSdsLoginService', () => {
  let service: NgxSdsLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxSdsLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
