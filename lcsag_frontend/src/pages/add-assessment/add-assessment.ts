import { Component } from '@angular/core';
import { ToastController,ViewController, PopoverController, AlertController, App, ItemSliding, List, ModalController, NavController, LoadingController, NavParams } from 'ionic-angular';
import { NetworkProvider } from '../../providers/network-provider';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';

/*
  Generated class for the AddAssessment page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-add-assessment',
  templateUrl: 'add-assessment.html'
})
export class AddAssessmentPage {

  

	assessment_name: any;
	assessment_type: any;
	assessment_date: any;
	assessment_time: any;
	total_score: any;
	assessment_term: any;
	types: any;
	terms: any;
	

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
      public toastCtrl: ToastController) {

  	this.get_types();
  	this.get_terms();

  }
  
  dismiss(){

  	this.viewCtrl.dismiss();
  }
   add_assessment(assessment_name, assessment_type, total_score, assessment_term){
      let title = 'Whoops...';
      let subtitle = 'Please fill up all required fields.';
      if(assessment_name == null){
         this.onAssessmentAdd(title, subtitle);
      }
      else  if(assessment_type == null){
            this.onAssessmentAdd(title, subtitle);
      }
       else  if(total_score == null){
            this.onAssessmentAdd(title, subtitle);
      }
      else{

   		let loading = this.loadingCtrl.create({content:'Adding assessment...'});
   		loading.present(); 

      this.storage.get('classid').then((value) =>{


     
  		var url = 'http://'+ this.networkProvider.server_address +'/lcsagapp/lcsag_backend/add_assessment/';
       	var data = JSON.stringify(
                        {
                            assessment_name: assessment_name,
                            type_id: assessment_type,
                            assessment_score: total_score,
                            class_id: value.class_id,
                            term_id: assessment_term,
                            assessment_status: 0
              
                          });
       		
  			

	        this.http.post(url, data)
	        .subscribe(data => {
	        	 	loading.dismiss();
	       
             		this.onSuccess('New assessment added.');
                this.viewCtrl.dismiss();
             		 console.log(data);
	         	  
	        }, error => {
	   				loading.dismiss();
	            console.log(error);
	        });
           });
  }
  		
  }
 

 get_types(){

           
          this.http.get('http://'+ this.networkProvider.server_address +'/lcsagapp/lcsag_backend/types/')
            .map(res => res.json())
            .subscribe(data => {
              this.types = data
              console.log(data);
            
           },   error => {
                    
                    
              });

  }
  get_terms(){

           
          this.http.get('http://'+ this.networkProvider.server_address +'/lcsagapp/lcsag_backend/terms/')
            .map(res => res.json())
            .subscribe(data => {
              this.terms = data
              console.log(data);
            
           },   error => {
                    
                    
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
   onAssessmentAdd(title, subtitle) {
      let alert = this.alertCtrl.create({
        title: title,
        subTitle: subtitle,
        buttons: ['Ok']
      });

    alert.present();
  }

 
}
