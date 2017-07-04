import { Component } from '@angular/core';
import { ToastController,ViewController, PopoverController, AlertController, App, ItemSliding, List, ModalController, NavController, LoadingController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { NetworkProvider } from '../../providers/network-provider';
import { Http } from '@angular/http';
import  { AllStudentsPage } from '../all-students/all-students';
import { StudentProfilePage } from '../student-profile/student-profile';
import { AddAttendancePage } from '../add-attendance/add-attendance';
import { AddAssessmentPage } from '../add-assessment/add-assessment';
import { AttendancePage } from '../attendance/attendance';
/*

  Generated class for the ClassPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-class-page',
  templateUrl: 'class-page.html'
})
export class ClassPagePage {

	students_data: any;
  students = [];
	grid_image: any;
	grid_text: any;
  class_data: any;
  has_students = false;
  no_result = false;
  no_connection = false;
  class_navigation: string;
  searchText = '';

  //testing variables
  present = true;
  late = false;
  absent = false;
 
  count: any;

  constructor(  public popoverCtrl: PopoverController, 
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
      public toastCtrl: ToastController) {

     this.class_navigation = 'students';
  	 this.display_students();
     this.class_data = navParams.data;

  }

  display_students(){

      this.has_students = false;
      this.no_result = false;
      this.no_connection = false;
 

          let class_id = this.navParams.data.class_id;
        
         
          this.http.get('http://' +  this.networkProvider.server_address +'/lcsagapp/lcsag_backend/students/?id=' + class_id )
            .map(res => res.json())
            .subscribe(data => {
              this.has_students = true;
       
              if(data == false){
                  this.no_result = true;
                  this.no_connection = false;
                  this.count_students();
              }
              else{
                  this.no_result = false;
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
                            student_status: 0

                      };

                      this.students.push(pushdata);
                     
                  }

                  this.count_students();
                 

              }

            console.log(data);
           }, error =>{
             
              this.no_connection = true
              this.has_students = false;

              
           });

  }
  count_students(){

    
           let class_id = this.navParams.data.class_id;
          this.http.get('http://'+ this.networkProvider.server_address +'/lcsagapp/lcsag_backend/count_students/?id=' +  class_id )
            .map(res => res.json())
            .subscribe(data => {
              this.count = data[0].counted;
              console.log(data[0].counted);
            
           },   error => {
                    
                    this.count = '0';
                   // this.onLoginFailed('Something went wrong' , 'Cannot connect to server, make sure you are connected to LC Wifi ');
                   
              });

  }
  show_students(){

      let addModal = this.modalCtrl.create(AllStudentsPage, this.navParams.data);
       addModal.onDidDismiss(() => {
        this.students = [];
        this.display_students();
      });
      addModal.present();
      
  }
  view_profile(student_data){

      this.navCtrl.push(StudentProfilePage, student_data);

       
     
       
  }
  onRemove(stud, item: ItemSliding, id, lname, fname) {
    let name = lname + ', ' + fname;
    let alert = this.alertCtrl.create({
      title: 'Remove student',
      message: 'Are you sure do you want to remove ' + name + ' in this class?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.remove_student(stud, item, id, name);
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
  remove_student(stud, item, id,name){

           let index = this.students.indexOf(stud);
           this.students.splice(index, 1);    
    
          let class_id = this.navParams.data.class_id;
          let class_name = this.navParams.data.class_name;
          this.http.get('http://'+ this.networkProvider.server_address +'/lcsagapp/lcsag_backend/remove_student/?student_id=' +  id + '&class_id=' + class_id)
            .map(res => res.json())
            .subscribe(data => {
                  
                this.onSuccess(name + ' removed from ' + class_name);
                item.close();
                //this.display_students();
                this.count = this.students.length;
           },   error => {
                    
                   
                    item.close();
                   // this.onLoginFailed('Something went wrong' , 'Cannot connect to server, make sure you are connected to LC Wifi ');
                   
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
  
  add_attendance() {

      let addModal = this.modalCtrl.create(AttendancePage, this.navParams.data);
       addModal.onDidDismiss(() => {
        //this.display_classList();
      });
      addModal.present();
     
  }
  add_assessment() {

      let addModal = this.modalCtrl.create(AddAssessmentPage, this.navParams.data);
       addModal.onDidDismiss(() => {
        //this.display_classList();
      });
      addModal.present();
     
  }

}

