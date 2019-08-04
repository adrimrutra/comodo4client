import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-internal-server',
  templateUrl: './internal-server.component.html'
})
export class InternalServerComponent implements OnInit {
  public errorMessage = '500 SERVER ERROR, CONTACT ADMINISTRATOR !';
  constructor() { }

  ngOnInit() {
  }

}
