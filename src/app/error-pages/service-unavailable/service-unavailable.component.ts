import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-service-unavailable',
  templateUrl: './service-unavailable.component.html'
})
export class ServiceUnavailableComponent implements OnInit {

  public notFoundText: string;
  constructor() {
    this.notFoundText = `503 SERVICE UNAVAILABLE !`;
   }

  ngOnInit() {
  }
}
