import { Component } from '@angular/core';
import { ToastController,ViewController, PopoverController, AlertController, App, ItemSliding, List, ModalController, NavController, LoadingController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { NetworkProvider } from '../../providers/network-provider';
import { Http } from '@angular/http';
/*
  Generated class for the AddClass page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-add-class',
  templateUrl: 'add-class.html'
})
export class AddClassPage {

    semester: any;
	schoolyear: any;
	
  class_name: any;
  class_desc: any;
  schedules: any;
  sched: any;
  class_sem: any;
  class_schoolyear: any;
  start_time: any;
  end_time:any;
  time: any;
  rooms: any;
  rm: any;
  current_semyear: any;
  sem_id: any;
  year_id: any;
  sy: any;
  sem: any;
  myDate: any;

  constructor(
  	  public popoverCtrl: PopoverController, 
      public alertCtrl: AlertController,
      public app: App,
      public loadingCtrl: LoadingController,
      public modalCtrl: ModalController,
      public navCtrl: NavController,
      public http: Http,
      public navParams: NavParams,
      public storage: Storage,
      public networkProvider: NetworkProvider,
      public viewCtrl: ViewController,
      public toastCtrl: ToastController) {

  	this.loadAll();
    //  this.instructor_data = navParams.data;
  
  	//this.starttime = this.calculateTime();
  	//this.endtime = this.calculateTime();
    this.myDate = new Date().toISOString();
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
  
  
  /*calculateTime() {
    // create Date object for current location
    let d = new Date();
    var time = '' + d.getTime();
  

    return time;
  }
  */

   sem_selector(){

		      this.http.get('http://'+ this.networkProvider.server_address +'/lcsagapp/lcsag_backend/semester/')
		        .map(res => res.json())
		        .subscribe(data => {
			        this.semester = data;
			        console.log(data);
		        
		       });
  	}
   sy_selector(){

		      this.http.get('http://'+ this.networkProvider.server_address +'/lcsagapp/lcsag_backend/schoolyear/')
		        .map(res => res.json())
		        .subscribe(data => {
			        this.schoolyear = data;
			        console.log(data);
		        
		       });
  	}
    schedule_list(){

		      this.http.get('http://'+ this.networkProvider.server_address +'/lcsagapp/lcsag_backend/classSchedules/')
		        .map(res => res.json())
		        .subscribe(data => {
			        this.schedules= data;
			        console.log(data);
		        
		       });
  	}
    timepicker_list(){
      
       this.time = [
               
                '7:00 AM',
                '7:30 AM',
                '8:00 AM',
                '8:30 AM',
                '9:00 AM',
                '9:30 AM',
                '10:00 AM',
                '10:30 AM',
                '11:00 AM',
                '11:30 AM',
                '12:00 PM',
                '12:30 PM',
                '1:00 PM',
                '1:30 PM',
                '2:00 PM',
                '2:30 PM',
                '3:00 PM',
                '3:30 PM',
                '4:00 PM',
                '4:30 PM',
                '5:00 PM',
                '5:30 PM',
                '6:00 PM',
                '6:30 PM',
                '7:00 PM',
                '7:30 PM',
           
        ];
        
       
  }
   room_list(){

		      this.http.get('http://'+ this.networkProvider.server_address +'/lcsagapp/lcsag_backend/rooms/')
		        .map(res => res.json())
		        .subscribe(data => {
			        this.rooms = data;
			        console.log(data);
		        
		       });
  	}    

  
  	loadAll(){

  		  let loading = this.loadingCtrl.create({content:'Loading...'});
  		  loading.present(); 

              this.get_currentsem_year();
              this.schedule_list();
              this.timepicker_list();
              this.room_list();
	  		  this.sem_selector();
	  		  this.sy_selector();
	  		  
  		  loading.dismiss();
          
      

  	}
  	addClass(class_name,  class_desc, sched, start_time, end_time, rm, class_sem, class_schoolyear){
        
        
        let semid = class_sem;
        let yearid = class_schoolyear;
        this.storage.get('userdata').then((value) => {

      let url = 'http://'+ this.networkProvider.server_address +'/lcsagapp/lcsag_backend/addclass/';
      let t = 'Whoops...';

      if(class_name == null){
        this.onFailed(t, 'Class name is required');}
      else{

         if(class_sem == null && class_schoolyear == null){
             
          
               var data = JSON.stringify(
                        {
                            class_name: class_name,
                            class_desc: class_desc,
                            schedule_id: sched,
                            start_time: start_time,
                            end_time: end_time,
                            room_id: rm,
                            class_sem:  this.sem_id,
                            class_schoolyear: this.year_id, 
                            id: value[0].instructor_id
                   
                          });  
          let loading = this.loadingCtrl.create({content:'Adding class...'});
          loading.present(); 

          this.http.post(url, data)
          .subscribe(data => {
              loading.dismiss();
              console.log(data)
              this.onSuccess(class_name + ' added to your class list.');
               console.log("Four!" ,this.year_id);
             
          }, error => {
              loading.dismiss();
            this.onFailed('Something went wrong.', 'Unable to add class');
              console.log(error);
          });
       }
       else {
               var data = JSON.stringify(
                        {
                            class_name: class_name,
                            class_desc: class_desc,
                            schedule_id: sched,
                            start_time: start_time,
                            end_time: end_time,
                            room_id: rm,
                            class_sem: class_sem,
                            class_schoolyear: class_schoolyear, 
                            id: value[0].instructor_id
                          });
          let loading = this.loadingCtrl.create({content:'Adding class...'});
          loading.present(); 

          this.http.post(url, data)
          .subscribe(data => {
              loading.dismiss();
              console.log(data)
              this.onSuccess(class_name + ' added to your class list.');
               console.log("Three!" ,this.year_id);
          }, error => {
              loading.dismiss();
            this.onFailed('Something went wrong', 'Unable to add class');
              console.log(error);
          });

       }
         }
     
  	 });
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
        duration: 2000,
        position: 'top'
      });

      toast.present(toast);
      this.dismiss();
  }
   get_currentsem_year(){

          this.http.get('http://'+ this.networkProvider.server_address +'/lcsagapp/lcsag_backend/current/')
            .map(res => res.json())
            .subscribe(data => {
              this.sem_id = data[0].sem_id;
              this.year_id = data[0].year_id;
              this.sem = data[0].sem;
              this.sy = data[0].YEAR;
              console.log(data);
            
           } ,error =>{


              console.log(error);
           });
  }
  test(ev){
      console.log('Test', ev);
  }



}
