import { Component } from '@angular/core';
import { ToastController,ViewController, PopoverController, AlertController, App, ItemSliding, List, ModalController, NavController, LoadingController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { NetworkProvider } from '../../providers/network-provider';
import { Http } from '@angular/http';

/*
  Generated class for the ClassDetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-class-details',
  templateUrl: 'class-details.html'
})
export class ClassDetailsPage {

        semester: any;
        schoolyear: any;
        days: any;
        
        starttime: string;
        endtime: string;
      class_name: any;
      class_desc: any;
      sched:any;
      time: any;
      rooms: any;
      rm: any;
      
      class_sem: any;
      class_schoolyear: any;
      class_day: any;
      class_starttime: any;
      class_endtime: any;
      class_room: any;
      current_semyear: any;
      sem_id: any;
      year_id: any;
      sy: any;
      sem: any;
      schedules: any;
      timepicker: any;
    
      sched_id:any;
      room_id: any;
      

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
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }

  class_details(){
      
      this.class_name =  this.navParams.data.class_name;
      this.class_desc = this.navParams.data.class_desc;
      this.sched = this.navParams.data.schedule;
      this.time = this.navParams.data.time;
      this.rm = this.navParams.data.room;
      this.class_sem = this.navParams.data.semester;
      this.class_schoolyear = this.navParams.data.schoolyear;
      this.year_id = this.navParams.data.schoolyear_id;
      
      this.sched_id = this.navParams.data.schedule_id;
      this.room_id = this.navParams.data.room_id;
      
      console.log('Data', this.navParams.data);
  }

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
      
       this.timepicker = [
            '7:30 AM - 9:00 AM',
            '9:00 AM - 10:30 AM',
            '10:30 AM - 12:00 NOON',
            '1:00 PM - 2:30 PM',
            '2:30 PM - 4:00 PM',
            '4:00 PM - 5:30 PM',
            '5:30 PM - 7:00 PM'
           
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

          //this.get_currentsem_year()
	  		  this.sem_selector();
	  		  this.sy_selector();
              this.schedule_list();
              this.timepicker_list();
              this.room_list();
	  	      this.class_details();
	  		

  		  loading.dismiss();
          
      

  	}
  	

    
 update_class(class_name, schedule_id, class_time, room_id, class_desc, class_sem, class_schoolyear){
           let url = 'http://'+ this.networkProvider.server_address +'/lcsagapp/lcsag_backend/updateclass/';
           let data = JSON.stringify(
                        {
                            class_id: this.navParams.data.class_id,
                            class_name: class_name,
                            class_desc: class_desc,
                            schedule_id: schedule_id,
                            class_time: class_time,
                            room_id: room_id,
                            class_sem:  class_sem,
                            class_schoolyear: this.year_id, 
                            id: this.navParams.data.instructor_id
                   
                          });
           
          

          let loading = this.loadingCtrl.create({content:'Saving changes..'});
          loading.present(); 

          this.http.post(url, data)
          .subscribe(data => {
              loading.dismiss();
              console.log(data)
              
              this.onSuccess('Changes saved.');
              this.viewCtrl.dismiss();
              
             
          }, error => {
            this.onFailed('Something went wrong.', 'Unable to save changes');
                loading.dismiss();
              console.log(error);
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
  
  

}
