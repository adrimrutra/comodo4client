import { TestBed, inject } from '@angular/core/testing';

import { Injectable, Injector } from '@angular/core';

import { GlobalHttpInterceptorService } from './global-http-interceptor.service';

describe('GlobalHttpInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      GlobalHttpInterceptorService,
      Injector
    ]
  }
  ));

  it('should be initialized with Injector', inject([Injector], (injector: Injector) => {
    expect(injector).toBeTruthy();
  }));

  it('should be created', () => {
    const service: GlobalHttpInterceptorService = TestBed.get(GlobalHttpInterceptorService);
    expect(service).toBeTruthy();
  });

});
