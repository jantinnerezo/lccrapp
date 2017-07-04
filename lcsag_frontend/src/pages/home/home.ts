import { Component } from '@angular/core';

import {NavParams, PopoverController, AlertController, App, ItemSliding, List, ModalController, NavController, LoadingController } from 'ionic-angular';

import { Storage } from '@ionic/storage';


import { Http } from '@angular/http';

import { ClassListPage } from '../class-list/class-list';

import { HomePopupoverPage } from '../home-popupover/home-popupover';
import { LoginPage } from '../login/login';
import { UserData } from '../../providers/user-data';
import 'rxjs/add/operator/map';
import { AddClassPage } from '../add-class/add-class';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
 // conferenceDate = '2047-05-17';
 queryText = '';
 products: any;
 sortby: any;
 selected: any;
 
 constructor(
      public navParams: NavParams,
      public popoverCtrl: PopoverController, 
      public alertCtrl: AlertController,
      public app: App,
      public userdata: UserData,
      public loadingCtrl: LoadingController,
      public modalCtrl: ModalController,
      public navCtrl: NavController,
      public http: Http,
      public storage: Storage
 ) { 

   
 }
 showPopup(event) {
  let popover = this.popoverCtrl.create(HomePopupoverPage);
  popover.present({ ev: event });

 }


 myClassList(){

      this.navCtrl.push(ClassListPage);
      
  }
  onLogout(){

     this.navCtrl.setRoot(LoginPage);
  }

 addClass() {
      let addModal = this.modalCtrl.create(AddClassPage);
       addModal.onDidDismiss(() => {
        //this.display_classList();
      });
      addModal.present();
     
  }


}
