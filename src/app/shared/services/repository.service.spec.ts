import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { RepositoryService } from './repository.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { EnvironmentUrlService } from './environment-url.service';
import { Info } from '../../models/info';


describe('RepositoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [
      RepositoryService,
      EnvironmentUrlService
    ]
  }));

  function setup() {
    const service: RepositoryService = TestBed.get(RepositoryService);
    return { service};
  }

  it('should be initialized with EnvironmentUrlService',
    inject([EnvironmentUrlService], (environmentUrlService: EnvironmentUrlService) => {
      expect(environmentUrlService).toBeTruthy();
  }));

  it('should be created', () => {
    const service = setup();
    expect(service).toBeTruthy();
  });

  function createNewRowData() {
    let newData: Info;
    newData = {
      id: '5bd72d1d613a0203028afe51',
      index: 0,
      guid: 'd942ce3e-9f0f-4d1c-92b7-951d3a2c820e',
      isActive: false,
      balance: '$3,770.24',
      picture: 'http://placehold.it/32x32',
      age: 36,
      eyeColor: 'brown',
      name:  'Haley Mcclure',
      gender: 'female',
      company: 'CEMENTION',
      email: 'haleymcclure@cemention.com',
      phone: '+1 (824) 540-3922',
      address: '971 Walker Court, Cresaptown, Arkansas, 9319',
      about: 'Adipisicing dolor culpa consequat commodo elit velit',
      registered: '2016-11-04T07:59:58 -01:00',
      latitude: -34.515381,
      longitude: 139.641275,
      tags: [ 'ut',
      'est',
      'fugiat',
      'nostrud',
      'ullamco',
      'ullamco',
      'esse'],
      friends: [
        {
          'id': 0,
          'name': 'Kerry Doyle'
        },
        {
          'id': 1,
          'name': 'Ward Park'
        },
        {
          'id': 2,
          'name': 'Mcintyre Blackwell'
        }
      ],
      greeting: 'Hello, Haley Mcclure! You have 9 unread messages.',
      favoriteFruit: 'strawberry'
    };
    return newData;
  }


  it('should retrieve all items',
    fakeAsync(
      inject([RepositoryService, EnvironmentUrlService, HttpTestingController],
        (repositoryService: RepositoryService,
          environmentUrlService: EnvironmentUrlService,
          httpMock: HttpTestingController) => {

          const infos = [createNewRowData()];
          const url = `${environmentUrlService.urlAddress}/info`;

          repositoryService.getData('info').subscribe(
            (event: HttpEvent<any>) => {
              switch (event.type) {
                case HttpEventType.Response:
                 // expect(event.body).toEqual(infos);
                  expect(event.body).toBe(infos);
              }
            }
          );

          const mockReq = httpMock.expectOne(url, 'call to api');
          expect(mockReq.cancelled).toBeFalsy();
          expect(mockReq.request.responseType).toEqual('json');
          expect(mockReq.request.method).toEqual('GET');
          mockReq.flush(infos);
          tick();
          httpMock.verify();
        }
      )
    )
  );

  it('should post the correct data',
    fakeAsync(
      inject([RepositoryService, EnvironmentUrlService, HttpTestingController],
        (repositoryService: RepositoryService,
          environmentUrlService: EnvironmentUrlService,
          httpMock: HttpTestingController) => {

          const info = createNewRowData();
          const url = `${environmentUrlService.urlAddress}/info`;

          repositoryService.create('info', info).subscribe(
            (event: HttpEvent<any>) => {
              switch (event.type) {
                case HttpEventType.Response:
                  expect(event.body).toBeTruthy();
              }
            }
          );

          const mockReq = httpMock.expectOne(url, 'post to api');
          expect(mockReq.cancelled).toBeFalsy();
          expect(mockReq.request.responseType).toEqual('json');
          expect(mockReq.request.method).toEqual('POST');
          mockReq.flush(info);

          httpMock.verify();
        }
      )
    )
  );

  it('should put the correct data',
  fakeAsync(
    inject([RepositoryService, EnvironmentUrlService, HttpTestingController],
      (repositoryService: RepositoryService,
        environmentUrlService: EnvironmentUrlService,
        httpMock: HttpTestingController) => {

        const info = createNewRowData();
        const url = `${environmentUrlService.urlAddress}/info`;

        repositoryService.update(`info/ ${info.id}`, info).subscribe(
          (event: HttpEvent<any>) => {
            switch (event.type) {
              case HttpEventType.Response:
                expect(event.body).toBeTruthy();
            }
          }
        );

        const mockReq = httpMock.expectOne(`${url}/ ${info.id}`, 'put to api');
        expect(mockReq.cancelled).toBeFalsy();
        expect(mockReq.request.responseType).toEqual('json');
        expect(mockReq.request.method).toEqual('PUT');
        mockReq.flush(info);

        httpMock.verify();
      }
    )
  )
);

it('should delete the correct data',
  fakeAsync(
    inject([RepositoryService, EnvironmentUrlService, HttpTestingController],
      (repositoryService: RepositoryService,
        environmentUrlService: EnvironmentUrlService,
        httpMock: HttpTestingController) => {

        const info = createNewRowData();
        const url = `${environmentUrlService.urlAddress}/info`;

        repositoryService.delete(`info/${info.id}`).subscribe(
          (event: HttpEvent<any>) => {
            switch (event.type) {
              case HttpEventType.Response:
                expect(event.body).toBeTruthy();
            }
          }
        );

        const mockReq = httpMock.expectOne(`${url}/${info.id}`, 'delete to api');
       // expect(mockReq.cancelled).toBeFalsy();

        expect(mockReq.request.method).toEqual('DELETE');
        mockReq.flush(info.id);

        httpMock.verify();
      }
    )
  )
);
});
