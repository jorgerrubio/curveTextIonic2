import { Component } from '@angular/core';
import { DomSanitizer} from '@angular/platform-browser';
import { NavController } from 'ionic-angular';
import {ListProvider} from "../../providers/list-provider";
import {List} from "../../models/list";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  lists: Array<List>;
  constructor(public navCtrl: NavController, public domSanitizer: DomSanitizer, public listProvider: ListProvider) {}

  ionViewDidLoad() {
    this.lists = this.listProvider.getAll();

    this.curveText(this.lists);
  }

  private curveText(lists: any, separation: number = 6): void{
    lists.forEach((list) => {
      let htmlTitle: string;
      let title = list.title.split('');
      let origin = parseFloat('-' + ((separation * title.length) / 2));
  
      title.forEach((letter) => {
        htmlTitle += `<p style='transform:rotate(${origin}deg);'>${(letter == ' ') ? '&nbsp;' : letter}</p>`;
        origin += separation;
      });
  
      let parse = htmlTitle.split('undefined');
      list.title = this.domSanitizer.bypassSecurityTrustHtml(parse[1]);
    });
  }

}
