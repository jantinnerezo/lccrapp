import { Component } from '@angular/core';
import { ActionSheetController, Events, ToastController, PopoverController, AlertController, App, ItemSliding, List, ModalController, NavController, LoadingController, NavParams } from 'ionic-angular';

import { Storage } from '@ionic/storage';

import { Http } from '@angular/http';
import { UserData } from '../../providers/user-data';
import { AddClassPage } from '../add-class/add-class';
import { ClassDetailsPage } from '../class-details/class-details';
import { ClassPagePage } from '../class-page/class-page';
import { TabsPage } from '../tabs/tabs';
import { NetworkProvider } from '../../providers/network-provider';


/*
  Generated class for the ClassList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-class-list',
  templateUrl: 'class-list.html'
})
export class ClassListPage {

  classList = [];
  classDays: any;
  selected: any;
  no_result = false;
  no_connection = false;
  has_class = false;
  message = 'You currently do not have class';
  count: any;
  class_sem: any;
  class_schoolyear: any;
  semester = [];
  schoolyear = [];
  sem: any;
  sy: any;
  sem_id: any;
  year_id: any;

 //
 


  constructor(
  	  public popoverCtrl: PopoverController, 
      public alertCtrl: AlertController,
      public app: App,
      public loadingCtrl: LoadingController,
      public modalCtrl: ModalController,
      public navCtrl: NavController,
      public http: Http,
      public userdata: UserData,
      public navParams: NavParams,
      public storage: Storage,
      public events: Events,
      public actionSheetCtrl: ActionSheetController,
      public networkProvider: NetworkProvider,
      public toastCtrl: ToastController
      ) {

       this.display_currentsem_year();
       this.sem_selector();
       this.sy_selector();
    	
       storage.remove('classid');
    
  }

 
 display_classList(){

  		  
        this.classList = [];
        this.no_result = false;
        this.no_connection = false;
        this.has_class = false;
       
  	 	//  let loading = this.loadingCtrl.create({content:'Loading class list...'});
  		//  loading.present(); 

           this.storage.get('userdata').then((value)=> {
        
		      this.http.get('http://'+ this.networkProvider.server_address +'/lcsagapp/lcsag_backend/classlist/?id=' + value[0].instructor_id + '&sem=' + this.sem_id + '&sy=' + this.year_id )
		        .map(res => res.json())
		        .subscribe(data => {

			       // loading.dismiss();
                  this.has_class = true;
			      this.no_connection = false;
                    
			      
              if(data == false){

                  this.no_result = true;
                  this.no_connection = false;
                  this.count_class();
               

              }
              else{

                for(let x = 0; x < data.length; x++){

                 let classdata = {
                       class_id: data[x].class_id,
                       class_name: data[x].class_name,
                       class_desc: data[x].class_desc,
                       semester_id: data[x].semester_id,
                       semester: data[x].semester,
                       schedule_id: data[x].schedule_id,
                       schedule: data[x].schedule_description,
                       start_time: data[x].start_time,
                       end_time: data[x].end_time,
                       time: data[x].class_time,
                       room_id: data[x].room_id,
                       room: data[x].room_description,
                       schoolyear_id: data[x].schoolyear_id,
                       schoolyear: data[x].school_year, 
                       instructor_id:data[x].instructor_id
                      
                      
                  };
                  this.classList.push(classdata);
                }

                  this.no_result = false;  
                  this.sem_selector();
                  this.sy_selector();
               
              
                  this.count_class();
              }
		        
		         },   error => {
                    
                 //   loading.dismiss();
                    this.has_class = false;
                    this.no_connection = true;
                   // this.onLoginFailed('Something went wrong' , 'Cannot connect to server, make sure you are connected to LC Wifi ');
                   
              });
            });

		
  }

 
  sort_list(selected){
   
      
     this.sem_id = selected;
    this.display_classList();
     
  }
  sort_sy(selected){
      
      
      this.year_id = selected;
      this.display_classList();
  }
  sort_classlist(selected){

       // this.classList = [];
        console.log(selected);
        this.no_result = false;
        this.no_connection = false;
        this.has_class = false;
       
      //  let loading = this.loadingCtrl.create({content:'Loading class list...'});
      //  loading.present(); 

           this.storage.get('userdata').then((value)=> {
          
          

          this.http.get('http://'+ this.networkProvider.server_address +'/lcsagapp/lcsag_backend/classlist/?id=' + value[0].instructor_id + '&sem=' + selected + '&sy='+ selected)
            .map(res => res.json())
            .subscribe(data => {

             // loading.dismiss();
             this.has_class = true;
               this.sem_selector();
                  this.sy_selector();
             
              console.log(data);
              
              if(data == false){

                  this.no_result = true;
                  this.no_connection = false;
                  this.count_class();
                  this.message = 'No class to display';

              }
              else{

                  this.no_result = false;
                  this.no_connection = false;
                 
                  //this.classList.push(data);
                 // console.log(this.classList);
                 
               
                  this.count_class();
              }
            
             },   error => {
                    
                 //   loading.dismiss();
                    this.has_class = false;
                    this.no_connection = true
                   // this.onLoginFailed('Something went wrong' , 'Cannot connect to server, make sure you are connected to LC Wifi ');
                   
              });
            });

    
  }
  sem_selector(){
          this.semester = [];
          this.http.get('http://'+ this.networkProvider.server_address +'/lcsagapp/lcsag_backend/semester/')
            .map(res => res.json())
            .subscribe(data => {

              for(let x = 0; x < data.length; x++){

                  let semdata = {
                         semester_id: data[x].semester_id,
                         semester: data[x].semester
                  };
                  this.semester.push(semdata);

              }
               console.log(this.semester);
             
            
           });
    }
   sy_selector(){
          this.schoolyear = [];
          this.http.get('http://'+ this.networkProvider.server_address +'/lcsagapp/lcsag_backend/schoolyear/')
            .map(res => res.json())
            .subscribe(data => {
              for(let x = 0; x < data.length; x++){

                  let sydata = {
                         schoolyear_id: data[x].schoolyear_id,
                         schoolyear: data[x].school_year
                  };
                  this.schoolyear.push(sydata);
              }
               console.log(this.schoolyear);
              
            
           });
    }
   get_currentsem_year(){

          this.http.get('http://'+ this.networkProvider.server_address +'/lcsagapp/lcsag_backend/current/')
            .map(res => res.json())
            .subscribe(data => {
            
              this.sem = data[0].sem;
              this.sy = data[0].YEAR;
              console.log(data);
            
           } ,error =>{


              console.log(error);
           });
  }
  count_class(){

     this.storage.get('userdata').then((value)=> {

          this.http.get('http://'+ this.networkProvider.server_address +'/lcsagapp/lcsag_backend/count/?id=' +  value[0].instructor_id)
            .map(res => res.json())
            .subscribe(data => {
              this.count = data[0].counted;
              console.log(data[0].counted);
             
            
           },   error => {
                    
                    this.count = '0';
                   // this.onLoginFailed('Something went wrong' , 'Cannot connect to server, make sure you are connected to LC Wifi ');
                   
              });

            });
  }
  /*display_classDays(){

		      this.http.get('http://'+ this.networkProvider.server_address +'/lcsagapp/lcsag_backend/classdays/')
		        .map(res => res.json())
		        .subscribe(data => {
			        this.classDays = data;
			        console.log(data);
		        
		       });
  }*/
 
  display_currentsem_year(){

          this.http.get('http://'+ this.networkProvider.server_address +'/lcsagapp/lcsag_backend/current/')
            .map(res => res.json())
            .subscribe(data => {
              this.sem_id = data[0].sem_id;
              this.year_id = data[0].year_id;
              this.sem = data[0].sem;
              this.sy = data[0].YEAR;
              console.log(data);
              console.log(this.sem_id);
              console.log(this.year_id);
               this.display_classList();
           });
  }

  removeClass(data){
      
        
         let index = this.classList.indexOf(data);
         this.classList.splice(index, 1);  

  	 	  let loading = this.loadingCtrl.create({content:'Removing class...'});
  		  loading.present(); 

		      this.http.get('http://'+ this.networkProvider.server_address +'/lcsagapp/lcsag_backend/deleteclass/?class_id=' +  data.class_id  )
		        .map(res => res.json())
		        .subscribe(data => {
			        loading.dismiss();
			        this.showToast(name + ' removed from your class list');
			       
			        console.log(data);
              this.no_result = false;
		        
		       },   error => {
                    
                    loading.dismiss();
                    this.no_result = true
                   // this.onLoginFailed('Something went wrong' , 'Cannot connect to server, make sure you are connected to LC Wifi ');
                   
              });

  }
   addClass() {
	    let addModal = this.modalCtrl.create(AddClassPage);
	     addModal.onDidDismiss(() => {
	      this.display_classList();
	    });
	    addModal.present();
    
  }
 details(data) {
	    let addModal = this.modalCtrl.create(ClassDetailsPage,data);
	     addModal.onDidDismiss(() => {
             this.display_classList();
	    });
	    addModal.present();
    
  }
  onRemove(data) {
    let alert = this.alertCtrl.create({
      title: 'Remove class',
      message: 'Are you sure do you want to remove ' + data.class_name + ' in your class list?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.removeClass(data);
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

  	showToast(message) {
      let toast = this.toastCtrl.create({
        message: message,
        duration: 3000,
        position: 'top'
      });

      toast.present(toast);
     
  }

  openClass(classdata){

    this.storage.set('classid' , classdata).then((val) => {
        
      console.log(val);
               this.navCtrl.setRoot(TabsPage);
            
         });
 

     
  }
 class_options(data) {
   
    let actionSheet = this.actionSheetCtrl.create({
      title: data.class_name,
      buttons: [
        {
          text: 'Open',
          role: 'open',
          icon: 'eye',
          handler: () => {
                this.openClass(data);
          }
        },
    
        {
          text: 'Details',
          icon: 'list',
          handler: () => {
            this.details(data);
          } 
        },
        {
          text: 'Remove',
          icon: 'trash',
          handler: () => {
                this.onRemove(data);
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
