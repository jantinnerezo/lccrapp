import { Component } from '@angular/core';
import { ToastController,ViewController, PopoverController, AlertController, App, ItemSliding, List, ModalController, NavController, LoadingController, NavParams, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { NetworkProvider } from '../../providers/network-provider';
import { Http } from '@angular/http';
import  { AllStudentsPage } from '../all-students/all-students';
import { StudentProfilePage } from '../student-profile/student-profile';

/*
  Generated class for the Students page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-students',
  templateUrl: 'students.html'
})
export class StudentsPage {

  students_data: any;
  students = [];
  grid_image: any;
  grid_text: any;
  class_name: any;
  has_students = false;
  no_result = false;
  no_connection = false;
  class_navigation: string;
  searchText = '';
  count = 0;
  zero_result = 'You currently do not have students in this class';
  visible = false;
  

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
      public networkProvider: NetworkProvider,
      public viewCtrl: ViewController,
      public toastCtrl: ToastController) {

  		this.displayclass_name();
  		this.display_students();
       
  		

     	
  }
 
  displayclass_name(){
  	 this.storage.get('classid').then((value) =>{

         this.class_name = value.class_name;
     });
    
  }
  display_students(){
     
       this.students = [];
      this.has_students = false;
      this.no_result = false;
      this.no_connection = false;
 

          let class_id = this.navParams.data.class_id;
           this.storage.get('classid').then((value)=> {
        
         
          this.http.get('http://' +  this.networkProvider.server_address +'/lcsagapp/lcsag_backend/students/?id=' + value.class_id )
            .map(res => res.json())
            .subscribe(data => {
              this.has_students = true;
       
              if(data == false){
                  this.no_result = true;
                  this.no_connection = false;
                  this.count_students();
                  this.zero_result = 'You currently do not have students in this class';
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

	    
           });


  }
  count_students(){

      let number = this.students.length;
      this.count = number;

  }
  show_students(){

    this.storage.get('classid').then((value) =>{

      let addModal = this.modalCtrl.create(AllStudentsPage, value);
       addModal.onDidDismiss(() => {
          this.students = [];
          this.display_students();
        });
      addModal.present();

    })

        
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

           this.storage.get('classid').then((value) =>{


          let class_id = this.navParams.data.class_id;
          let class_name = this.navParams.data.class_name;
          this.http.get('http://'+ this.networkProvider.server_address +'/lcsagapp/lcsag_backend/remove_student/?student_id=' +  id + '&class_id=' + value.class_id)
            .map(res => res.json())
            .subscribe(data => {
                  
                this.onSuccess(name + ' removed from ' + value.class_name);
                item.close();
                //this.display_students();
                this.count = this.students.length;
           },   error => {
                    
                   
                    item.close();
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
 


 view_profile(student_data) {
      let viewModal = this.modalCtrl.create(StudentProfilePage, student_data);
       viewModal .onDidDismiss(() => {
             this.display_students();
      });
      viewModal .present();
    
  }
hide_search(){
     
     this.visible = false;
    this.display_students();
 }
 search() {
  
    this.visible = true;

  }


search_students(ev: any){
     
       let val = ev.target.value;
    
      if(val == null){
          
          this.display_students();
      }
    else{
        
         
  
      this.students = [];
      this.has_students = false;
      this.no_result = false;
      this.no_connection = false;
 

          let class_id = this.navParams.data.class_id;
           this.storage.get('classid').then((value)=> {
        
         
          this.http.get('http://' +  this.networkProvider.server_address +'/lcsagapp/lcsag_backend/students/?find='+ val + '&id=' + value.class_id )
            .map(res => res.json())
            .subscribe(data => {
              this.has_students = true;
       
              if(data == false){
                  this.no_result = true;
                  this.no_connection = false;
                  this.count_students();
                  this.zero_result = 'No students found';
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

	    
           });

              }
  }

 
}
