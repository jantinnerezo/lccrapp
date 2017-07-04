import { Component } from '@angular/core';
import { ViewController,  NavParams,InfiniteScroll, PopoverController, AlertController, App, ItemSliding, List, ModalController, NavController, LoadingController, ToastController} from 'ionic-angular';

import { Storage } from '@ionic/storage';

import { NetworkProvider } from '../../providers/network-provider';
import { Http } from '@angular/http';
/*
  Generated class for the AllStudents page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-all-students',
  templateUrl: 'all-students.html'
})
export class AllStudentsPage {

	queryText = '';
	allstudents = [];
    temp_students = [];
	dis = false;
	ready = false;
	has_students = false;
  	no_connection = false;
	//students = [];
    rawdata: any;
	courses: any;
	year_levels: any;
	year: any;
	course: any;
	student_id: any;
	count: any;
    count_selected: any;
    offset = 0;
    limit = 30;
    visible = false;
    noresult = 'No students found.'
	
	

  constructor(
	  public popoverCtrl: PopoverController, 
	  public alertCtrl: AlertController,
	  public app: App,
	  public loadingCtrl: LoadingController,
	  public modalCtrl: ModalController,
	  public navCtrl: NavController,
	  public http: Http,
	  public viewCtrl: ViewController,
	  public navParams: NavParams,
	  public toastCtrl: ToastController,
	  public networkProvider: NetworkProvider,
	  public storage: Storage
 ) { 

     
        this.count_selected = this.temp_students.length;
 	    this.allStudents();
       
     

 }
  dismiss() {
    this.viewCtrl.dismiss();
  }


 	allStudents(){
 		 this.has_students = false;
	     this.dis = false;
	     this.no_connection = false;
         this.allstudents = [];

	     if(this.course == undefined){
	     		this.course = '';
	     }
	     if(this.year == undefined){
	     		this.year = '';
	     }
        
	     this.http.get('http://' +  this.networkProvider.server_address +'/lcsagapp/lcsag_backend/allstudents/?find=' + this.queryText + '&limit=' + this.limit  +  '&offset=' + this.offset + '&course=' + this.course + '&year=' + this.year)
		        .map(res => res.json())
		        .subscribe(data => {
		        		this.dis = true;
		        		this.course_list();
			 			this.year_list();
		        	if(data == false){
		        		this.has_students = false;
				      	this.no_connection = false;
		        	}
		        	else{
		        		this.has_students = true;
				      	this.no_connection = false;
				       
                        
                        for(let x = 0; x<data.length; x++){
                            
                            let datas = {
                                
                                student_id: data[x].student_id,
                                student_lastname: data[x].student_lastname,
                                student_firstname:data[x].student_firstname,
                                student_course:data[x].student_course,
                                student_address:data[x].student_address,
                                student_phone:data[x].student_id,
                                barcode:data[x].barcode,
                                status: 0
                            };
                             this.allstudents.push(datas); 
                        }
		        	}

			        console.log(data);
		        
		       }, error =>{
		       		//this.dismiss = true;
		       		this.has_students = false
			      	this.no_connection = true;
		       		
		       }); 
 	}

  
  doInfinite(infiniteScroll) {
    console.log('Begin async operation');

    setTimeout(() => {
        this.offset += 30;
        this.allStudents();

      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 1000)
  }

    select_students(students){
        
      let name = students.student_lastname + ', ' + students.student_firstname;

  		  this.http.get('http://' +  this.networkProvider.server_address +'/lcsagapp/lcsag_backend/existed/?student_id=' + students.student_id + '&class_id=' + this.navParams.data.class_id)
		        .map(res => res.json())
		       
		        .subscribe(data => {

		        	if(data == true){
		        		this.onFailed('Cannot add student.', name + ' is already added in this class' );
		        	}
		        	else{
                     
                    
                        
                      let index = this.allstudents.indexOf(students);
                       if(this.allstudents[index].status == 1){
                           
                            let datas = {

                                                student_id:this. allstudents[index].student_id,
                                                student_lastname: this.allstudents[index].student_lastname,
                                                student_firstname:this.allstudents[index].student_firstname,
                                                student_course:this.allstudents[index].student_course,
                                                student_address:this.allstudents[index].student_address,
                                                student_phone:this.allstudents[index].student_id,
                                                barcode:this.allstudents[index].barcode,
                                                status: 0
                        };
                        this.temp_students.splice(index, 1);  
                        this.count_selected = this.temp_students.length;
                        this.allstudents[index] = datas;
                           
                       }
                        else{
                            
                              let datas = {

                                                student_id:this. allstudents[index].student_id,
                                                student_lastname: this.allstudents[index].student_lastname,
                                                student_firstname:this.allstudents[index].student_firstname,
                                                student_course:this.allstudents[index].student_course,
                                                student_address:this.allstudents[index].student_address,
                                                student_phone:this.allstudents[index].student_id,
                                                barcode:this.allstudents[index].barcode,
                                                status: 1
                        };
                        this.temp_students.push(datas);
                        this.count_selected = this.temp_students.length;
                        this.allstudents[index] = datas;
                        console.log(this.temp_students);
                        }

                      
		        		
		        	}

		        
		       }, error =>{
		       		
		 });
      

        
  }

 	course_list(){
 		

		    this.http.get('http://' +  this.networkProvider.server_address +'/lcsagapp/lcsag_backend/courses/')
		        .map(res => res.json())
		       
		        .subscribe(data => {

		        	this.courses = data;
		        
		       }, error =>{
		       		
		       });
		 
 	}
 	year_list(){
 		

		    this.http.get('http://' +  this.networkProvider.server_address +'/lcsagapp/lcsag_backend/year/')
		        .map(res => res.json())
		       
		        .subscribe(data => {

		        	this.year_levels = data;
		        	
		        
		       }, error =>{
		       		
		       });
		 
 	}

 	sort_course(course_selected){
     		this.allStudents();
  	}
  	sort_year(year_selected){
     		this.allStudents();
  	}	
  	count_allstudents(){

          this.http.get('http://'+ this.networkProvider.server_address +'/lcsagapp/lcsag_backend/count_allstudents/')
            .map(res => res.json())
            .subscribe(data => {
              this.count = data[0].counted;
              console.log(data[0].counted);
            
           },   error => {
                    
                   this.count = '0';

              });

  }

 onAdd() {
    
     
    if(this.temp_students.length <= 0){
        
        this.onFailed('Whoops...', 'Please select students to add');
    }
     else{
         
         let alert = this.alertCtrl.create({
      title: 'Add students',
      message: 'Add ' + this.temp_students.length + ' students to your class?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.save_student();
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
    
  }


  
    
  search() {
  
    this.visible = true;

  }
 hide_search(){
     
     this.visible = false;
     this.allStudents();
 }
 

 

    search_student(ev: any){
        let val = ev.target.value;
        
        if(val == null){
            
            this.allStudents();
        }else{
            
             this.has_students = false;
	     this.dis = false;
	     this.no_connection = false;
         this.allstudents = [];

	    
	     this.http.get('http://' +  this.networkProvider.server_address +'/lcsagapp/lcsag_backend/allstudents/?find=' + val + '&limit=30')
		        .map(res => res.json())
		        .subscribe(data => {
		        		this.dis = true;
		        		this.course_list();
			 			this.year_list();
		        	if(data == false){
		        		this.has_students = false;
				      	this.no_connection = false;
		        	}
		        	else{
		        		this.has_students = true;
				      	this.no_connection = false;
				       
                        for(let x = 0; x<data.length; x++){
                            
                            let datas = {
                                
                                student_id: data[x].student_id,
                                student_lastname: data[x].student_lastname,
                                student_firstname:data[x].student_firstname,
                                student_course:data[x].student_course,
                                student_address:data[x].student_address,
                                student_phone:data[x].student_id,
                                barcode:data[x].barcode,
                                status: 0
                            };
                             this.allstudents.push(datas); 
                        }
		        	}

			        console.log(data);
		        
		       }, error =>{
		       		//this.dismiss = true;
		       		this.has_students = false
			      	this.no_connection = true;
		       		
		       });
            
        }
        
 		
	 
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
  save_student(){
      
      
       let loading = this.loadingCtrl.create({content:'Adding students..'});
       loading.present(); 
       let added = false;
       let url = 'http://'+ this.networkProvider.server_address +'/lcsagapp/lcsag_backend/add_student/';
      
       for(let x = 0; x < this.temp_students.length; x++){
        let data = JSON.stringify(
                        {
                            student_id: this.temp_students[x].student_id,
                            class_id: this.navParams.data.class_id,
                           
                   
                          });
     
	        this.http.post(url, data)
	        .subscribe(data => {
	               
                   loading.dismiss();
                   this.viewCtrl.dismiss();
	        	   added = true;
	         	  
	        }, error => {
	   
	            console.log(error);
	        }); 
           
       }
      
      
      
  		
  }

  
 
}
