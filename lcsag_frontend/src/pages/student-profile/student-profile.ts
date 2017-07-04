import { Component } from '@angular/core';
import { ToastController,ViewController, PopoverController, AlertController, App, ItemSliding, List, ModalController, NavController, LoadingController, NavParams, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { NetworkProvider } from '../../providers/network-provider';
import { Http } from '@angular/http';

/*
  Generated class for the StudentProfile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-student-profile',
  templateUrl: 'student-profile.html'
})
export class StudentProfilePage {
	student_data: any;
  student_class = [];
  count_class: any;
  attendance: any;
  late: any;
  absent: any;
  constructor(
  	 public popoverCtrl: PopoverController, 
      public alertCtrl: AlertController,
      public app: App,
      public loadingCtrl: LoadingController,
      public modalCtrl: ModalController,
      public navCtrl: NavController,
      public navParams: NavParams,
      public storage: Storage,
      public http: Http,
      public events: Events,
      public networkProvider: NetworkProvider,
      public viewCtrl: ViewController,
      public toastCtrl: ToastController) {

  	 this.student_data = navParams.data;
     this.display_classes();
     this.display_attendance();
  }

  dismiss(){

      this.viewCtrl.dismiss();
  }
  display_classes(){
     
  
          let student_id = this.navParams.data.student_id;
      
          this.http.get('http://' +  this.networkProvider.server_address +'/lcsagapp/lcsag_backend/student_class/?id=' + student_id )
            .map(res => res.json())
            .subscribe(data => {
              
              if(data == false){
                 
              }
              else{
                

                  for(let x = 0; x < data.length; x++){

                      let pushdata = {

                            class_name: data[x].class_name,
                            instructor_firstname: data[x].instructor_firstname,
                            instructor_lastname: data[x].instructor_lastname,
                           

                      };

                      this.student_class.push(pushdata);           
                  }
                  this.count_class = this.student_class.length;
                
              }

            console.log(data);
           }, error =>{
             
          
           });

      
  }
   display_attendance(){
     
  
          let student_id = this.navParams.data.student_id;

           this.storage.get('classid').then((value) =>{
      
          this.http.get('http://' +  this.networkProvider.server_address +'/lcsagapp/lcsag_backend/student_attendance_record/?student_id=' + student_id + '&class_id=' + value.class_id )
            .map(res => res.json())
            .subscribe(data => {
              
                  this.attendance = data[0].present;
                  this.late = data[0].late;
                  this.absent = data[0].absent;
                
            
            console.log(data);
           }, error =>{
             
          
           });
         });

      
  }
 onRemove() {
    let name = this.navParams.data.student_lastname + ', ' + this.navParams.data.student_firstname;
    let alert = this.alertCtrl.create({
      title: 'Remove student',
      message: 'Are you sure do you want to remove ' + name + ' in this class?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.remove_student(name);
          }
        },
        {
          text: 'No',
          handler: () => {
            
          }
        }
      ]
    });

    alert.present();
  }
 remove_student(name){

            let student_id = this.navParams.data.student_id;

           this.storage.get('classid').then((value) =>{


          let class_id = this.navParams.data.class_id;
          let class_name = this.navParams.data.class_name;
          this.http.get('http://'+ this.networkProvider.server_address +'/lcsagapp/lcsag_backend/remove_student/?student_id=' +  student_id + '&class_id=' + value.class_id)
            .map(res => res.json())
            .subscribe(data => {
                  
                this.onSuccess(name + ' removed from ' + value.class_name);
               
                //this.display_students();
               
                this.viewCtrl.dismiss();
           },   error => {
                    
                   
                  
                   // this.onLoginFailed('Something went wrong' , 'Cannot connect to server, make sure you are connected to LC Wifi ');
                   
              });

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
 



}
