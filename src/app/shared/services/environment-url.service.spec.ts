import { TestBed } from '@angular/core/testing';

import { EnvironmentUrlService } from './environment-url.service';

describe('EnvironmentUrlService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      EnvironmentUrlService
    ]
  }));

  function setup() {
    return { service: TestBed.get(EnvironmentUrlService)};
  }

  it('should be created', () => {
    const service = setup();
    expect(service).toBeTruthy();
  });

  it('#urlAddres public variable should return real url', () => {
    const service = setup();
    expect(service.service.urlAddress).toBe('https://localhost:5000/api');
  });
});
