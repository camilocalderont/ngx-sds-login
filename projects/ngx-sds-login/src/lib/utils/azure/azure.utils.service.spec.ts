import { TestBed } from '@angular/core/testing';

import { AzureUtilsService } from './azure.utils.service';

describe('AzureUtilsService', () => {
  let service: AzureUtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AzureUtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
