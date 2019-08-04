import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html'
})
export class NotFoundComponent implements OnInit {
  public errorMessage: `404 SORRY COULDN'T FIND IT!!!`;
  constructor() { }

  ngOnInit() {
  }

}
