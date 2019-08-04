import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './/app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { InfoComponent } from './info/info.component';
import { NotFoundComponent } from './error-pages/not-found/not-found.component';
import { InternalServerComponent } from './error-pages/internal-server/internal-server.component';
import { ServiceUnavailableComponent } from './error-pages/service-unavailable/service-unavailable.component';

import { EnvironmentUrlService } from './shared/services/environment-url.service';
import { RepositoryService } from './shared/services/repository.service';
import { GlobalHttpInterceptorService } from './shared/services/global-http-interceptor.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    InfoComponent,
    NotFoundComponent,
    InternalServerComponent,
    ServiceUnavailableComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AgGridModule.withComponents([InfoComponent]),
    NgbPaginationModule
  ],
  providers: [
    RepositoryService,
    EnvironmentUrlService,
    { provide: HTTP_INTERCEPTORS, useClass: GlobalHttpInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
