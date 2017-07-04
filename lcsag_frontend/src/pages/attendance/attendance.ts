import { Component } from '@angular/core';
import { ToastController,ViewController, PopoverController, AlertController, App, ItemSliding, List, ModalController, NavController, LoadingController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { NetworkProvider } from '../../providers/network-provider';
import { Http } from '@angular/http';

/*
  Generated class for the Attendance page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-attendance',
  templateUrl: 'attendance.html'
})
export class AttendancePage {

     current_date: any;
     time: any;
    
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
      this.getcurrentdate_time()
  		this.display_students();
      
  }
  dismiss(){

      this.viewCtrl.dismiss();
  }


  	display_students(){

      this.has_students = false;
      this.no_connection = false;
 

          let class_id = this.navParams.data.class_id;
        
         
          this.http.get('http://' +  this.networkProvider.server_address +'/lcsagapp/lcsag_backend/students/?id=' + class_id )
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
                            student_status: 1

                      };

                      this.students.push(pushdata);
                     
                  }

               
                 

            console.log(data);
           }, error =>{
             
              this.no_connection = true
              this.has_students = false;
  
           });

  }
   display_details(){
    
      let id = this.navParams.data.attendance_id;
        this.http.get('http://' +  this.networkProvider.server_address +'/lcsagapp/lcsag_backend/attendance_details/?id=' + id)
            .map(res => res.json())
           
            .subscribe(data => {

              this.current_date = data[0].attendance_date;
              this.time = data[0].attendance_time;
              this.count_status(id);
            
           }, error =>{
              
           });
     
  }

  display_saved(){

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
                            student_status: 1

                      };

                      this.students_saved.push(pushdata);
                     
                  }

               
                 

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


  check_attendance(item: ItemSliding, student, status){

  	  let index = this.students.indexOf(student);

       let pushdata = {
                            student_id: this.students[index].student_id,
                            student_lastname: this.students[index].student_lastname,
                            student_firstname: this.students[index].student_firstname,
                            student_course:this.students[index].student_course,
                            student_address: this.students[index].student_address,
                            student_phone: this.students[index].student_phone,
                            student_status: status
       };
     
        this.students[index] = pushdata;
        item.close();
  }
   cancel_attendance() {
  
    let alert = this.alertCtrl.create({
      title: 'Cancel attendance',
      message: 'Are you sure do you want to cancel attendance checking?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.viewCtrl.dismiss();
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
 set_label() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Attendance label:');
    alert.addInput({
      name: 'attendance',
      type: 'text',
      value: 'Attendance'
      
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

            this.save_attendance(data.attendance);
         
      }
    });
    alert.present();

  }
  save_attendance(attendance_label){

  		let loading = this.loadingCtrl.create({content:'Saving attendance...'});
   		loading.present(); 

        this.http.get('http://' +  this.networkProvider.server_address +'/lcsagapp/lcsag_backend/get_id/')
            .map(res => res.json())
           
            .subscribe(data => {
            
              if(data[0].id == null){
                  
                  this.attendance_id = 1;
              }

              this.attendance_id = parseInt(data[0].id) + 1;
          

  		  let url = 'http://'+ this.networkProvider.server_address +'/lcsagapp/lcsag_backend/add_attendance/';
       	let insertdata = JSON.stringify(
                        {
                            attendance_id: this.attendance_id,
                            attendance_label: attendance_label,
                            attendance_date: this.current_date,
                            attendance_time: this.time,
                            class_id: this.navParams.data.class_id,
                            status: 1


                          });

	        this.http.post(url, insertdata)
	        .subscribe(data => {
	        	 	  
             		
             		 console.log(data);
                 this.save_student_attendance(this.attendance_id);
                 loading.dismiss();
                 this.dismiss();

	         	  
	        }, error => {
	   				loading.dismiss();
	            console.log(error);
               this.dismiss();
	        });

            
           }, error =>{
              
           });

  }
  save_student_attendance(attendance_id){

        let url = 'http://'+ this.networkProvider.server_address +'/lcsagapp/lcsag_backend/add_student_attendance/';

        for(let x = 0; x < this.students.length; x ++){

          let insertdata = JSON.stringify(
                        {
                            student_id: this.students[x].student_id,
                            attendance_id: attendance_id,
                            status: this.students[x].student_status
                           
                          });

          this.http.post(url, insertdata)
          .subscribe(data => {
              
                

            
          }, error => {
            //loading.dismiss();
              console.log(error);
              // this.dismiss();
          });

        }
        this.viewCtrl.dismiss();

                this.onSuccess('Attendance saved.');
                
       

  }
 

  getcurrentdate_time(){
    
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var month = '';
    var m = '';
    var d = '';

    var yyyy = today.getFullYear();
    if(dd<10){
        d='0'+dd;
    } 
    if(mm<10){
        m='0'+mm;
    } 

    switch(m){

       case '01':
          month = 'January';
       break;

        case '02':
          month = 'February';
       break;

        case '03':
          month = 'March';
       break;

        case '04':
          month = 'April';
       break;

        case '05':
          month = 'May';
       break;


        case '06':
          month = 'June';
       break;


        case '07':
          month = 'July';
       break;

        case '08':
          month = 'August';
       break;

        case '09':
          month = 'September';
       break;

        case '10':
          month = 'October';
       break;

        case '11':
          month = 'November';
       break;

        case '12':
          month = 'December';
       break;


    }
    this.current_date = month+' '+dd+', '+yyyy;
    this.time = today.toLocaleTimeString();  // -> "7:38:05 AM"
    
  }
    onFailed(title, subtitle) {
      let alert = this.alertCtrl.create({
        title: title,
        subTitle: subtitle,
        buttons: ['Ok']
      });

    alert.present();
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
