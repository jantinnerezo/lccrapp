import { Component } from '@angular/core';
import {  NavParams, PopoverController, AlertController, App, ItemSliding, List, ModalController, NavController, LoadingController, ViewController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';
import { UserData } from '../../providers/user-data';
/*
  Generated class for the HomePopupover page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-home-popupover',
  templateUrl: 'home-popupover.html'
})
export class HomePopupoverPage {

  constructor(
  	  public navParams: NavParams,
      public popoverCtrl: PopoverController, 
      public alertCtrl: AlertController,
      public app: App,
      public userData: UserData,
      public loadingCtrl: LoadingController,
      public modalCtrl: ModalController,
      public navCtrl: NavController,
      public viewCtrl: ViewController,
      public storage: Storage) {}

  
  	  logOut(){

  	  		this.viewCtrl.dismiss();
          this.userData.logout();
          this.navCtrl.setRoot(LoginPage);
  	  }
  	  viewProfile(){
  	  	//empty
  	  }
}
