#Curve text in Ionic 2

install ionic and cordova [documentación](http://ionicframework.com/docs/v2/getting-started/installation/)

    $ npm install -g ionic cordova

###Create Model List
    src/models/list.ts

´´´javascript
    export class List{
        title: string;
        image: string;
    }
´´´
###Create Provider ListProvider
    $ ionic g provider ListProvider

add model List to provider
´´´javascript
    import {List} from "../models/list";
´´´
Create data and method return data
´´´javascript
    lists: Array<List> = [
        {title: 'People', image: 'assets/img/people400x500.jpg'},
        {title: 'Business list', image: 'assets/img/business400x300.jpg'},
        {title: 'Water sports list', image: 'assets/img/deportes400x200.jpg'},
    ];

    constructor(public http: Http) {}

    getAll(){
        return this.lists;
    }
´´´

###Edit home.ts
    src/pages/home.ts

add import

´´´javascript
    import { DomSanitizer} from '@angular/platform-browser';
    import {ListProvider} from "../../providers/list-provider";
    import {List} from "../../models/list";
´´´


add to class Home
´´´javascript
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
´´´
### Edit home.html
´´´html
    <ion-content>
        <div class="box-lists">
            <div class="box-list" *ngFor="let list of lists">
            <div class="title-list" [innerHTML]="list.title"></div>
            <div class="img-list" [ngStyle]="{'background-image': 'url(' + list.image + ')'}"></div>
            </div>
        </div>
    </ion-content>
´´´
### home.scss
´´´css
    page-home {
        .box-lists{
            margin: 0 16px;
            padding: 0;
            .box-list{
                float: left;
                margin: 30px 2px 0;
                position: relative;
                text-align: center;
                width: 156px;
                .title-list{
                    bottom: 0;
                    left: 0;
                    position: absolute;
                    right: 0;
                    top: 0;
                    p{
                        bottom: 0;
                        color: #000000;
                        display: inline-block;
                        font-size: 12px;
                        left: 0;
                        margin: -20px;
                        position: absolute;
                        right: 0;
                        top: 0;
                        text-transform: none;
                        transform-origin:50% 50%;
                        transition: all 1s ease;
                    }
                }
                .img-list{
                    background-position: center center;
                    background-repeat: no-repeat;
                    background-size: cover;
                    border-radius: 50%;
                    height: 156px;
                    margin: auto;
                    width: 156px;
                }
            }
        }
    }
´´´
