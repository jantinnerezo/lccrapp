import { Component } from '@angular/core';
import { ToastController,ViewController, PopoverController, AlertController, App, ItemSliding, List, ModalController, NavController, LoadingController, NavParams, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { NetworkProvider } from '../../providers/network-provider';
import { Http } from '@angular/http';
import { UserData } from '../../providers/user-data';
import { LoginPage } from '../login/login';


@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})
export class AccountPage {
  instructor_array = [];
  instructor_firstname:any;
  instructor_id:any;
  instructor_lastname:any;
  instructor_password:any;
  instructor_username:any;
  school_id:any;

  constructor( public popoverCtrl: PopoverController, 
      public alertCtrl: AlertController,
      public app: App,
      public loadingCtrl: LoadingController,
      public modalCtrl: ModalController,
      public navCtrl: NavController,
      public navParams: NavParams,
      public storage: Storage,
      public http: Http,
      public events: Events,
      public userdata: UserData,
      public networkProvider: NetworkProvider,
      public viewCtrl: ViewController,
      public toastCtrl: ToastController) {


      this.instructor_data();
      

  }
  instructor_data(){

      this.storage.get('userdata').then((value) =>{

          
              this.instructor_firstname = value[0].instructor_firstname,
              this.instructor_id = value[0].instructor_id,
              this.instructor_lastname = value[0].instructor_lastname,
              this.instructor_password = value[0].instructor_password,
              this.instructor_username = value[0].instructor_username,
              this.school_id = value[0].school_id
        
          
         
      });
  }
  dismiss(){

    this.viewCtrl.dismiss();
  }

  edit(){

      let alert = this.alertCtrl.create();
    alert.setTitle('Edit Account');
    alert.addInput({
      name: 'school_id',
      type: 'text',
      value: this.school_id
    });
     alert.addInput({
      name: 'instructor_firstname',
      type: 'text',
      value: this.instructor_firstname
    });
       alert.addInput({
      name: 'instructor_lastname',
      type: 'text',
      value: this.instructor_lastname
    });
       alert.addInput({
      name: 'instructor_username',
      type: 'text',
      value: this.instructor_username
    });
       alert.addInput({
      name: 'instructor_password',
      type: 'text',
      value: this.instructor_password
    });
     
   
    alert.addButton({
      text: 'Cancel',
      handler: (data: any) => {
          alert.dismiss(data);
      }
        });
      
        
    alert.addButton({
      text: 'Save',
      handler: (data: any) => {
          console.log(data);
          this.update_profile(data.school_id, data.instructor_firstname, data.instructor_lastname, data.instructor_username, data.instructor_password);
           alert.dismiss(data);
      }
    });
    alert.present();
  }

   update_profile(data1, data2, data3, data4, data5){

    

        let url = 'http://'+ this.networkProvider.server_address +'/lcsagapp/lcsag_backend/update_profile/';

          let newdata = JSON.stringify(
                        { 
                            
                            instructor_id: this.instructor_id,
                            school_id:data1,
                            instructor_firstname:data2,
                            instructor_lastname:data3,
                            instructor_username:data4,
                            instructor_password:data5
                         
                          });


          let userdata =  { 
                            
                            instructor_id: this.instructor_id,
                            school_id:data1,
                            instructor_firstname:data2,
                            instructor_lastname:data3,
                            instructor_username:data4,
                            instructor_password:data5
                         
                          };

          this.http.post(url, newdata)
          .subscribe(data => {
                
                 

                 this.instructor_array.push(userdata);
                 this.storage.set('userdata', this.instructor_array).then((value) =>{

                      this.onSuccess('Saved.');
                      console.log(value);
                      this.instructor_data();
                     
                  });

               
            
          }, error => {
            //loading.dismiss();
              console.log(error);
              // this.dismiss();
          });


  }
   onSuccess(message) {
      let toast = this.toastCtrl.create({
        message: message,
        duration: 3000,
        position: 'top'
      });

      toast.present(toast);
      
  }
  onLogout(){
     this.userdata.logout();
     this.navCtrl.setRoot(LoginPage);
  }
}

