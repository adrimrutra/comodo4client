import { Component, OnInit, ViewChild} from '@angular/core';
import { RepositoryService } from '../shared/services/repository.service';
import { Info } from '../models/info';
import { Friend } from '../models/friend';
import {NgbPaginationConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css'],
  providers: [ RepositoryService, NgbPaginationConfig ]
})
export class InfoComponent implements OnInit {
  private gridApi: any;
  private columnDefs: any;
  private rowData: any;
  private defaultColDef: any;
  private gridColumnApi: any;
  private apiAddress = 'info';

  private page = 1;
  private pageSize = 50;
  private collectionSize = 0;
  private _count: any;

  constructor(private repositoryService: RepositoryService, private config: NgbPaginationConfig) {
    this.columnDefs = [
      {headerName: 'Index', field: 'index', checkboxSelection: true },
      {headerName: 'Name', field: 'name'},
      {headerName: 'Gender', field: 'gender'},
      {headerName: 'Age', field: 'age'},
      {headerName: 'EyeColor', field: 'eyeColor'},
      {headerName: 'Company', field: 'company'},
      {headerName: 'Email', field: 'email'},
      {headerName: 'Phone', field: 'phone'},
      {headerName: 'Address', field: 'address'},
      {headerName: 'About', field: 'about'},
      {headerName: 'IsActive', field: 'isActive' },
      {headerName: 'Balance', field: 'balance'},
      {headerName: 'Picture', field: 'picture'},
      {headerName: 'Registered', field: 'registered'},
      {headerName: 'Latitude', field: 'latitude'},
      {headerName: 'Longitude', field: 'longitude'},
      {headerName: 'Greeting', field: 'greeting'},
      {headerName: 'FavoriteFruit', field: 'favoriteFruit'}
    ];

    this.defaultColDef = {
      width: 100,
      editable: true,
      resizable: true
    };

    this.repositoryService.getData(`${this.apiAddress}/count`)
    .subscribe(
      res => {
        this._count = res;
        this.collectionSize = this._count / 5;
      }
    );

    this.config.boundaryLinks = true;
    this.config.ellipses = false;
    this.config.maxSize = 10;
    this.config.rotate = true;
  }

  ngOnInit() {
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.reloadData();
  }

  reloadData() {
    this.repositoryService.getData(`${this.apiAddress}/${this.page}/${this.pageSize}`)
    .subscribe(
      res => {
        this.rowData = res;
      }
    );
  }

  insertRow() {
    const newItem = this.createNewRowData();
    this.gridApi.updateRowData({
      add: [newItem],
      addIndex: 0,
      checkboxSelection: true
    });
  }

  saveSelectedRow() {
    const selectedData = this.gridApi.getSelectedRows();
    if (selectedData.length > 0) {
      this.repositoryService.create(this.apiAddress, selectedData[0])
      .subscribe(
        res => {
          this.reloadData();
        }
      );
    }
  }

  updateRow() {
    const selectedData = this.gridApi.getSelectedRows();
    if (selectedData.length > 0) {
      this.gridApi.updateRowData({ update: selectedData });
      this.repositoryService.update(`${this.apiAddress}/${selectedData[0].id}`, selectedData[0])
      .subscribe(
        res => {
          this.reloadData();
        }
      );
    }
  }

  removeSelectedRow() {
    const selectedData = this.gridApi.getSelectedRows();
    if (selectedData.length > 0) {
      this.gridApi.updateRowData({ remove: selectedData });
      this.repositoryService.delete(`${this.apiAddress}/${selectedData[0].id}`)
      .subscribe(
        res => {
          this.reloadData();
        }
      );
    }
  }

   private createNewRowData() {
    let newInfo: Info;
    let newFriend: Friend;
    newFriend = { id: 0, name: ''};
    newInfo = {
      id: '',
      index: 0,
      guid: '',
      isActive: false,
      balance: '',
      picture: '',
      age: 0,
      eyeColor: '',
      name: '',
      gender: '',
      company: '',
      email: '',
      phone: '',
      address: '',
      about: '',
      registered: '',
      latitude: 0,
      longitude: 0,
      tags: [''],
      friends: [newFriend],
      greeting: '',
      favoriteFruit: ''
    };
    return newInfo;
  }
}
