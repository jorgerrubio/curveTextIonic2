import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {List} from "../models/list";

/*
  Generated class for the ListProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ListProvider {

  lists: Array<List> = [
    {title: 'People', image: 'assets/img/people400x500.jpg'},
    {title: 'Business list', image: 'assets/img/business400x300.jpg'},
    {title: 'Water sports list', image: 'assets/img/deportes400x200.jpg'},
  ];

  constructor(public http: Http) {}

  getAll(){
    return this.lists;
  }

}
