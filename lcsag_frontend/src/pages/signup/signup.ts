import { Component } from '@angular/core';
import { ToastController,ViewController, PopoverController, AlertController, App, ItemSliding, List, ModalController, NavController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';
import { Http } from '@angular/http';
import { NetworkProvider } from '../../providers/network-provider';


@Component({
  selector: 'page-user',
  templateUrl: 'signup.html'
})
export class SignupPage {
  signup: { id?: string, 
            lastname?: string,
            firstname?: string,
            username?: string,
            password?: string,
            conpassword?: string,
            } = {};
  submitted = false;

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
      public viewCtrl: ViewController,
      public toastCtrl: ToastController) {}

  onSignup(form) {
    this.submitted = true;

    if (form.valid) {
        
        this.ifAlready_exist();
        
    }
      else{
          
           this.onSignupResponse('Whoops...', 'Please complete all fields.');
      }
  }
 
 check_fields(){
     
     let title = 'Whoops...';
     let subtitle = 'Complete all fields';
     
     if(this.signup.id == null){
         subtitle = 'Identification number is required.';
         this.onSignupResponse(title, subtitle);
     }
     else if(this.signup.lastname == null){
        subtitle = 'Lastname is required.';
         this.onSignupResponse(title, subtitle);
     }
      else if(this.signup.firstname == null){
         subtitle = 'Firstname is required.';
         this.onSignupResponse(title, subtitle);
     }
      else if(this.signup.username == null){
        subtitle = 'Please create a username.';
         this.onSignupResponse(title, subtitle);
     }
       else if(this.signup.username == null){
        subtitle = 'Please create a password';
         this.onSignupResponse(title, subtitle);
     }
     else{
         
         this.ifAlready_exist();
     }
 }
  onSignupResponse(title, subtitle) {
      let alert = this.alertCtrl.create({
        title: title,
        subTitle: subtitle,
        buttons: ['Ok']
      });

    alert.present();
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }

  ifAlready_exist(){

          let title = '';
          this.http.get('http://'+ this.networkProvider.server_address +'/lcsagapp/lcsag_backend/checkuser/?id=' + this.signup.id)
            .map(res => res.json())
            .subscribe(data => {

                let  value = data;
               if(value == true){

                  this.onSignupResponse('Account already exist!', 'Please check your ID number or maybe it is not yet confirmed.' );
                      console.log(data);
                 
               }
               else if(value == false){

                    this.check_password();
                   
               }
              console.log(value);
             },   error => {
                  
                    this.onSignupResponse('Something went wrong' , 'Cannot connect to server, make sure you are connected to LC Wifi ');
                    this.dismiss();
              });
     
  
  }

  /*check_username(){


          this.http.get('http://'+ this.networkProvider.server_address +'/lcsagapp/lcsag_backend/checkusername/?username=' + this.signup.username)
            .map(res => res.json())
            .subscribe(data => {
                
                if(data == true){

                    this.onSignupResponse('Invalid username' , 'Username ' + this.signup.username + ' already exist please choose another one.');
                   
                }
                else{

                      this.check_password();
                }
            
           },   error => {
                  
                    this.onSignupResponse('Something went wrong' , 'Cannot connect to server, make sure you are connected to LC Wifi ');
                    this.dismiss();
              });
  }*/

  check_password(){

      let pass = this.signup.password;

      if(pass.length < 8){

          this.onSignupResponse('Invalid password' , 'Password must be atleast 8 characters');
      } 
      else{

          this.confirm_password();
      }
  }

  confirm_password(){
       let title = '';
       let subtitle = '';
        if(this.signup.password != this.signup.conpassword){

            title = 'Password typed mismatch';
            subtitle = 'Please try again';
            this.onSignupResponse(title, subtitle);
        }
        else{
                 let loading = this.loadingCtrl.create({content:'Creating account...'});
                   loading.present(); 

                     let link = 'http://'+ this.networkProvider.server_address +'/lcsagapp/lcsag_backend/instructor/';
                     let data = JSON.stringify(
                        {
                            username: this.signup.username,
                            id: this.signup.id,
                            lastname: this.signup.lastname,
                            firstname: this.signup.firstname,
                            password: this.signup.password,
                            confirmed: 0
                   
                          }

                  );
        
                  this.http.post(link, data)
                  .subscribe(data => {
                 

                        loading.dismiss();
                        title = this.signup.lastname + ', ' + this.signup.firstname;
                        this.onSignupResponse(title , 'Registration successful, please wait for your account confirmation.');
                        this.dismiss();
                         console.log(data);
            
              }, error => {
                    loading.dismiss();
                    this.onSignupResponse('Username already exist' , 'Select another one');
                    //this.dismiss();
                    console.log(error);
              });
        
        }
  }


 
}
