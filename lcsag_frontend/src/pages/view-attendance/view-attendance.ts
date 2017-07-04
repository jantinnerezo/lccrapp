import { Component } from '@angular/core';
import { ToastController,ViewController, PopoverController, AlertController, App, ItemSliding, List, ModalController, NavController, LoadingController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { NetworkProvider } from '../../providers/network-provider';
import { Http } from '@angular/http';
/*
  Generated class for the ViewAttendance page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-view-attendance',
  templateUrl: 'view-attendance.html'
})
export class ViewAttendancePage {

 	 attendance_date: any;
     attendance_time: any;
     attendance_details: any;
	 has_students = false;
  	 no_connection = false;
  	 students = [];
     students_saved = [];
     attendance_id: any;
     status: any;

     present: any;
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
      public networkProvider: NetworkProvider,
      public viewCtrl: ViewController,
      public toastCtrl: ToastController
  	) {

  		//this.display_details();
  		this.display_saved();
  }
   dismiss(){

      this.viewCtrl.dismiss();
  }


  

  display_saved(){

  	 this.attendance_details = this.navParams.data;

      this.has_students = false;
      this.no_connection = false;
 

          let id = this.navParams.data.attendance_id;
        
         
          this.http.get('http://' +  this.networkProvider.server_address +'/lcsagapp/lcsag_backend/student_attendance/?id=' + id )
            .map(res => res.json())
            .subscribe(data => {
              this.has_students = true;
       
                
                  this.no_connection = false;
                  //this.students_data = data;

                  for(let x = 0; x < data.length; x++){

                      let pushdata = {

                            student_id: data[x].student_id,
                            student_lastname: data[x].student_lastname,
                            student_firstname: data[x].student_firstname,
                            student_course: data[x].student_course,
                            student_address: data[x].student_address,
                            student_phone: data[x].student_phone,
                            student_status: data[x].status

                      };

                      this.students.push(pushdata);
                     
                  }
                  this.count_status(id);
               
                 

            console.log(data);
           }, error =>{
             
              this.no_connection = true
              this.has_students = false;
  
           });

  }
   count_status(id){
    

        this.http.get('http://' +  this.networkProvider.server_address +'/lcsagapp/lcsag_backend/count_attendance/?id=' + id)
            .map(res => res.json())
           
            .subscribe(data => {

              this.present = data[0].present;
              this.late = data[0].late;
              this.absent = data[0].absent;
            
           }, error =>{
              
           });
     
  }
}
