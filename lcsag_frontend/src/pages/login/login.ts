import { Component, ViewChild } from '@angular/core';
import { ToastController,ViewController, Nav, PopoverController, AlertController, App, ItemSliding, List, ModalController, NavController, LoadingController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import { UserData } from '../../providers/user-data';
import { NetworkProvider } from '../../providers/network-provider';
import { HomePage } from '../home/home';
import { TabsPage } from '../tabs/tabs';
import {ForgotPasswordPage} from '../forgot-password/forgot-password';

@Component({
  selector: 'page-user',
  templateUrl: 'login.html'
})
export class LoginPage {

   @ViewChild(Nav) nav: Nav;
  login: {username?: string, password?: string} = {};
  submitted = false;
  instructor_data: any;
  rootPage: any;
  incorrect = false;


  constructor( 
     public popoverCtrl: PopoverController, 
      public alertCtrl: AlertController,
      public app: App,
      public loadingCtrl: LoadingController,
      public modalCtrl: ModalController,
      public navCtrl: NavController,
      public http: Http,
      public storage: Storage,
      public networkProvider: NetworkProvider,
      public userData: UserData,
      public viewCtrl: ViewController,
      public toastCtrl: ToastController) { }

  onLogin(form) {
    this.submitted = true;

    if (form.valid) {
        this.getInstructorData();
    }

  }

  onSignup() {
    
     let addModal = this.modalCtrl.create(SignupPage);
       addModal.onDidDismiss(() => {
       
      });
      addModal.present();
  }
     showForgot() {
    
      this.navCtrl.push(ForgotPasswordPage);
  }
   getInstructorData(){
       let udata = [];
       let loading = this.loadingCtrl.create({content:'Please wait...'});
        loading.present(); 

          this.http.get('http://'+ this.networkProvider.server_address +'/lcsagapp/lcsag_backend/login/?username=' + this.login.username + '&password=' + this.login.password)
            .map(res => res.json())
            .subscribe(data => {

                if(data == false){
                    loading.dismiss();
                    this.submitted = true;
                    this.incorrect = true;

                   // this.onLoginFailed('Login failed', 'Username and password is incorrect')
                }
                else{
                    loading.dismiss();
                    this.showToast('Login successful');
                    this.userData.login(data);
                    let dt =  this.storage.get('userdata');
                    console.log(dt);
                    this.navCtrl.setRoot(HomePage);
                }
             
            
            },   error => {
                    
                    loading.dismiss();
                    console.log(error);
                    this.onLoginFailed('Something went wrong' , 'Cannot connect to server, make sure you are connected to LC Wifi ');
                   
              });
  }
    
  hideInvalid(ev: any){
      
   
        this.submitted = false;
        this.incorrect = false;
   
   
  }
   onLoginFailed(title, subtitle) {
      let alert = this.alertCtrl.create({
        title: title,
        subTitle: subtitle,
        buttons: ['Ok']
      });

    alert.present();
  }
    showToast(message) {
      let toast = this.toastCtrl.create({
        message: message,
        duration: 3000,
        position: 'top'
      });

      toast.present(toast);
     
  }
}
