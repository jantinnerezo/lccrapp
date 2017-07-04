import { Component } from '@angular/core';
import { ToastController,ViewController, PopoverController, AlertController, App, ItemSliding, List, ModalController, NavController, LoadingController, NavParams, Events, ActionSheetController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { NetworkProvider } from '../../providers/network-provider';
import { Http } from '@angular/http';
import { AttendancePage } from '../attendance/attendance';
import { ViewAttendancePage } from '../view-attendance/view-attendance';
import { AttendanceDetailsPage } from '../attendance-details/attendance-details';

/*
  Generated class for the AttendanceRecords page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-attendance-records',
  templateUrl: 'attendance-records.html'
})
export class AttendanceRecordsPage {

 
  attendance_records = [];
  class_name: any;
  has_records = false;
  no_result = false;
  no_connection = false;
  count = 0;

  zero_result = 'You currently do not have attendance records';

  months: any;
  years: any;
  defmonth: any;
  defyear: any;

 



  constructor(public popoverCtrl: PopoverController, 
      public alertCtrl: AlertController,
      public app: App,
      public loadingCtrl: LoadingController,
      public modalCtrl: ModalController,
      public navCtrl: NavController,
      public navParams: NavParams,
      public storage: Storage,
      public http: Http,
      public events: Events,
      public actionSheetCtrl: ActionSheetController,
      public networkProvider: NetworkProvider,
      public viewCtrl: ViewController,
      public toastCtrl: ToastController) {
  		
  		this.displayclass_name();
  		this.getdefault_monthyear()
  		this.display_attendance();
  		this.default_monthyear();
  }
   add_attendance() {

   	this.storage.get('classid').then((value) =>{


  
      let addModal = this.modalCtrl.create(AttendancePage, value);
       addModal.onDidDismiss(() => {
       	this.attendance_records = [];
        this.display_attendance();
      });
      addModal.present();
      	});
  }

  displayclass_name(){
  	 this.storage.get('classid').then((value) =>{

         this.class_name = value.class_name;
     });
    
  }
  display_attendance(){
      this.has_records = false;
      this.no_result = false;
      this.no_connection = false;
 
          let class_id = this.navParams.data.class_id;
          this.storage.get('classid').then((value)=> {
        
          this.http.get('http://' +  this.networkProvider.server_address +'/lcsagapp/lcsag_backend/attendance/?id=' + value.class_id + '&month=' + this.defmonth + '&year=' + this.defyear )
            .map(res => res.json())
            .subscribe(data => {
              this.has_records = true;
       
              if(data == false){
                  this.no_result = true;
                  this.no_connection = false;
                  this.count_records();
                  this.zero_result = 'You currently do not have attendance records';
              }
              else{
                  this.no_result = false;
                  this.no_connection = false;
                

                  for(let x = 0; x < data.length; x++){

                      let pushdata = {

                            attendance_id: data[x].attendance_id,
                            attendance_label: data[x].attendance_label,
                            attendance_date: data[x].attendance_date,
                            attendance_time: data[x].attendance_time,                     
                      };
                     
              
                      this.attendance_records.push(pushdata);           
                  }
                  this.count_records(); 
              }

            console.log(data);
           }, error =>{
             
              this.no_connection = true
              this.has_records = false;
           });

           });
  }
  sort_attendance(ev){
     
      
      this.has_records = false;
      this.no_result = false;
      this.no_connection = false;
 
      		console.log(this.months);
          let class_id = this.navParams.data.class_id;
           this.storage.get('classid').then((value)=> {
        
         
          this.http.get('http://' +  this.networkProvider.server_address +'/lcsagapp/lcsag_backend/attendance/?id=' + value.class_id + '&month=' + ev + '&year=' + ev )
            .map(res => res.json())
            .subscribe(data => {
              this.has_records = true;
       
              if(data == false){
                  this.no_result = true;
                  this.no_connection = false;
                  this.count_records();
                  this.zero_result = 'You currently do not have attendance records';
              }
              else{
                  this.no_result = false;
                  this.no_connection = false;
                

                  for(let x = 0; x < data.length; x++){

                      let pushdata = {

                            attendance_id: data[x].attendance_id,
                            attendance_label: data[x].attendance_label,
                            attendance_date: data[x].attendance_date,
                            attendance_time: data[x].attendance_time,
                           

                      };

                      this.attendance_records.push(pushdata);           
                  }
                  this.count_records();
                
              }

            console.log(data);
           }, error =>{
             
              this.no_connection = true
              this.has_records = false;

           });

	    
           });


  }
 
   count_records(){

      let number = this.attendance_records.length;
      this.count = number;

  }
 
  monthChange(ev: any){
  		this.attendance_records = [];
  		this.sort_attendance(ev.month.text);
       console.log(ev);
  		
  }
   yearChange(ev: any){
  		this.attendance_records = [];
  	   this.sort_attendance(ev.year.text);
      console.log(ev);
  		
  }
    onSuccess(message) {
      let toast = this.toastCtrl.create({
        message: message,
        duration: 3000,
        position: 'top'
      });

      toast.present(toast);
      
  }
    delete_attendance(data) {
   
    let alert = this.alertCtrl.create({
      title: 'Delete attendance report',
      message: 'Are you sure do you want to delete attendance report?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.remove_attendance(data);
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
  remove_attendance(data){

           let index = this.attendance_records.indexOf(data);
           this.attendance_records.splice(index, 1);  

    
          this.http.get('http://'+ this.networkProvider.server_address +'/lcsagapp/lcsag_backend/delete_attendance/?id=' +  data.attendance_id )
            .map(res => res.json())
            .subscribe(data => {
                  
                this.onSuccess('Attendance report removed.');
               
                this.count_records();
           },   error => {
                       
                  
                 
                   
              });


  }
 onAttendanceAdd(title, subtitle) {
      let alert = this.alertCtrl.create({
        title: title,
        subTitle: subtitle,
        buttons: ['Ok']
      });

    alert.present();
   }

 
    onAdd(){
     

          let class_id = this.navParams.data.class_id;
           this.storage.get('classid').then((value)=> {
        
         
          this.http.get('http://' +  this.networkProvider.server_address +'/lcsagapp/lcsag_backend/students/?id=' + value.class_id )
            .map(res => res.json())
            .subscribe(data => {
              //this.has_students = true;
       
              if(data == false){
                 this.onAttendanceAdd("Whoops...", "Adding attendance is not possible because you don't have students in this class.");
              }
              else{
                 this.add_attendance();
              }

            console.log(data);
           }, error =>{
             
             

           });

	    
           });


  }



  default_monthyear(){

  	 let today = new Date();
	let dd = today.getDate();
	let mm = today.getMonth()+1; //January is 0!
	 let day = '';
    let month = '';
    let m = '';

	let yyyy = today.getFullYear();
	if(dd<10){
	    day ='0'+dd;
	} 
	if(mm<10){
	   month='0'+mm;
	} 
	let now = yyyy+'-'+month+'-'+dd;
	console.log(now);
	this.months = now;
	this.years = now;
  }


  getdefault_monthyear(){
      var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        let day = '';
        let month = '';
        let m = '';

        var yyyy = today.getFullYear();
        if(dd<10){
            day='0'+dd;
        } 
        if(mm<10){
            month='0'+mm;
        } 

        switch(month){

           case '01':
              m = 'January';
           break;

            case '02':
              m = 'February';
           break;

            case '03':
              m = 'March';
           break;

            case '04':
              m = 'April';
           break;

            case '05':
              m = 'May';
           break;


            case '06':
              m = 'June';
           break;


            case '07':
              m = 'July';
           break;

            case '08':
              m = 'August';
           break;

            case '09':
              m = 'September';
           break;

            case '10':
              m = 'October';
           break;

            case '11':
              m = 'November';
           break;

            case '12':
              m = 'December';
           break;


        }
        this.defmonth = m;
        this.defyear = yyyy;
    
  }
	open_attendance(attendance){

		let addModal = this.modalCtrl.create(ViewAttendancePage, attendance);
	       addModal.onDidDismiss(() => {
	       	//this.attendance_records = [];
	        //this.display_attendance();
	      });
	      addModal.present();

}
attendance_detals(attendance){

		let addModal = this.modalCtrl.create(AttendanceDetailsPage, attendance);
	       addModal.onDidDismiss(() => {
	       	//this.attendance_records = [];
	        //this.display_attendance();
	      });
	      addModal.present();

}


attendance_options(data) {
   
    let actionSheet = this.actionSheetCtrl.create({
      title: data.attendance_label,
      buttons: [
        {
          text: 'View',
          role: 'view',
          icon: 'eye',
          handler: () => {
                this.open_attendance(data);
          }
        },
    
        {
          text: 'Delete',
          icon: 'trash',
          handler: () => {
                this.delete_attendance(data);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel', // will always sort to be on the bottom
          icon: 'close',
          handler: () => {
            console.log('Cancel clicked');
           
          }
        }
      ]
    });

    actionSheet.present();
  }
  

}
