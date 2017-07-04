import { Component } from '@angular/core';
import { ToastController,ViewController, PopoverController, AlertController, App, ItemSliding, List, ModalController, NavController, LoadingController, NavParams, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { NetworkProvider } from '../../providers/network-provider';
import { Http } from '@angular/http';
import { AddAssessmentPage } from '../add-assessment/add-assessment';
import { RecordAssessmentPage } from '../record-assessment/record-assessment';



@Component({
  selector: 'page-assessment-records',
  templateUrl: 'assessment-records.html'
})
export class AssessmentRecordsPage {

	types: any;
	class_name: any;
  	has_records = false;
  	no_result = false;
  	no_connection = false;
  	assessment_type: any;
  	count = 0;
  	prelim_records = [];
    midterm_records = [];
    final_records = [];
  	zero_result = 'You currently do not have assessment records';
   
    term: string;

    prelim_type: any;
    midterm_type: any;
    final_type: any;

    count_prelim = 0;
    count_midterm = 0;
    count_final = 0;

    //prelim declarations
    p_no_result = false;
    p_has_records = false;
    p_zero_result = '';
 

    //midterm declarations
    m_no_result = false;
    m_has_records = false;
    m_zero_result = '';


    //final declarations
    f_no_result = false;
    f_has_records = false;
    f_zero_result = '';

   

    

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
      public networkProvider: NetworkProvider,
      public viewCtrl: ViewController,
      public toastCtrl: ToastController) {
      
     this.term = 'Prelims';
  	 this.displayclass_name();
  	 this.display_types();
     this.display_midterm();
     this.display_final();
      this.display_prelim();
     this.assessment_type = 'All';

  }
  displayclass_name(){
  	 this.storage.get('classid').then((value) =>{

         this.class_name = value.class_name;
     });
    
  }
   display_types(){

      this.http.get('http://'+ this.networkProvider.server_address +'/lcsagapp/lcsag_backend/types/')
        .map(res => res.json())
        .subscribe(data => {
	        this.types = data;
	        console.log(data);
        
       },error =>{


       });
  }
   display_prelim(){
     
      
      this.p_has_records = false;
      this.p_no_result = false;
      this.no_connection = false;
      this.prelim_records = [];
      	
           this.storage.get('classid').then((value)=> {
        
         
          this.http.get('http://' +  this.networkProvider.server_address +'/lcsagapp/lcsag_backend/assessments/?id=' + value.class_id +'&term=1')
            .map(res => res.json())
            .subscribe(data => {
              this.p_has_records = true;
       
              if(data == false){
                  this.p_no_result = true;
                  this.no_connection = false;
                  
                  this.p_zero_result = 'You currently do not have prelims assessment';
              }
              else{
                  this.p_no_result = false;
                  this.no_connection = false;
                

                  for(let x = 0; x < data.length; x++){

                     let term = 'Prelims';

                      if(data[x].term_id == 1){
                          term = 'Prelims';
                      }
                      if(data[x].term_id == 2){
                         term = 'Midterms';
                        
                      }
                      if(data[x].term_id == 3){
                         term = 'Finals';
                      }


                      let pushdata = {

                      		assessment_id: data[x].assessment_id,
                      		assessment_name: data[x].assessment_name,
                      		type_id: data[x].type_id,
                      		type_name: data[x].type_name,
                      		assessment_date: data[x].date,
                      		assessment_time: data[x].time,
                      		status: data[x].assessment_status,
                      		assessment_totalScore: data[x].assessment_totalScore,
                      		class_id: data[x].class_id,
                      		term_id:  data[x].term_id,
                            term: term

                      		
                      };

                      this.prelim_records.push(pushdata);           
                  }
                  this.count_prelim = this.prelim_records.length;
                
              }

            
           }, error =>{
             
              this.no_connection = true
              this.p_has_records = false;

           });

	    
           });


  }



 

  display_midterm(){
     
      
      this.m_has_records = false;
      this.m_no_result = false;
      this.no_connection = false;
      this.midterm_records = [];
      	
           this.storage.get('classid').then((value)=> {
        
         
          this.http.get('http://' +  this.networkProvider.server_address +'/lcsagapp/lcsag_backend/assessments/?id=' + value.class_id +'&term=2')
            .map(res => res.json())
            .subscribe(data => {
              this.m_has_records = true;
       
              if(data == false){
                  this.m_no_result = true;
                  this.no_connection = false;
                 
                  this.m_zero_result = 'You currently do not have midterms assessments';
              }
              else{
                  this.m_no_result = false;
                  this.no_connection = false;
                

                  for(let x = 0; x < data.length; x++){

                     let term = 'Prelims';

                      if(data[x].term_id == 1){
                          term = 'Prelims';
                      }
                      if(data[x].term_id == 2){
                         term = 'Midterms';
                        
                      }
                      if(data[x].term_id == 3){
                         term = 'Finals';
                      }


                      let pushdata = {

                      		assessment_id: data[x].assessment_id,
                      		assessment_name: data[x].assessment_name,
                      		type_id: data[x].type_id,
                      		type_name: data[x].type_name,
                      		assessment_date: data[x].date,
                      		assessment_time: data[x].time,
                      		status: data[x].assessment_status,
                      		assessment_totalScore: data[x].assessment_totalScore,
                      		class_id: data[x].class_id,
                      		term_id:  data[x].term_id,
                            term: term

                      		
                      };

                      this.midterm_records.push(pushdata);           
                  }
                  this.count_midterm = this.midterm_records.length;
                
              }

            
           }, error =>{
             
              this.no_connection = true
              this.m_has_records = false;

           });

	    
           });


  }


  display_final(){
     
      
      this.f_has_records = false;
      this.f_no_result = false;
      this.no_connection = false;
      this.final_records = [];
      	
           this.storage.get('classid').then((value)=> {
        
         
          this.http.get('http://' +  this.networkProvider.server_address +'/lcsagapp/lcsag_backend/assessments/?id=' + value.class_id +'&term=3')
            .map(res => res.json())
            .subscribe(data => {
              this.f_has_records = true;
       
              if(data == false){
                  this.f_no_result = true;
                  this.no_connection = false;
                
                  this.f_zero_result = 'You currently do not have finals assessments';
              }
              else{
                  this.f_no_result = false;
                  this.no_connection = false;
                

                  for(let x = 0; x < data.length; x++){

                     let term = 'Prelims';

                      if(data[x].term_id == 1){
                          term = 'Prelims';
                      }
                      if(data[x].term_id == 2){
                         term = 'Midterms';
                        
                      }
                      if(data[x].term_id == 3){
                         term = 'Finals';
                      }


                      let pushdata = {

                      		assessment_id: data[x].assessment_id,
                      		assessment_name: data[x].assessment_name,
                      		type_id: data[x].type_id,
                      		type_name: data[x].type_name,
                      		assessment_date: data[x].date,
                      		assessment_time: data[x].time,
                      		status: data[x].assessment_status,
                      		assessment_totalScore: data[x].assessment_totalScore,
                      		class_id: data[x].class_id,
                      		term_id:  data[x].term_id,
                            term: term

                      		
                      };

                      this.final_records.push(pushdata);           
                  }
                  this.count_final = this.final_records.length;
                
              }

            
           }, error =>{
             
              this.no_connection = true
              this.f_has_records = false;

           });

	    
           });


  }



   sort_prelim(ev){
       
     if(ev == 'All'){
         
         this.display_prelim();
         
     }
     
      console.log(ev);
      this.p_has_records = false;
      this.p_no_result = false;
      this.no_connection = false;
      this.prelim_records = [];
 
        
           this.storage.get('classid').then((value)=> {
        
         
          this.http.get('http://' +  this.networkProvider.server_address +'/lcsagapp/lcsag_backend/assessments/?id=' + value.class_id +'&term=1&type_id=' + ev)
            .map(res => res.json())
            .subscribe(data => {
              this.p_has_records = true;
       
              if(data == false){
                  this.p_no_result = true;
                  this.no_connection = false;
                 
                  this.p_zero_result = 'No assessment found';
              }
              else{
                  this.p_no_result = false;
                  this.no_connection = false;
                

                  for(let x = 0; x < data.length; x++){

                      let term = 'Prelims';

                      if(data[x].term_id == 1){
                          term = 'Prelims';
                      }
                      if(data[x].term_id == 2){
                         term = 'Midterms';
                        
                      }
                      if(data[x].term_id == 3){
                         term = 'Finals';
                      }

                      let pushdata = {

                          assessment_id: data[x].assessment_id,
                          assessment_name: data[x].assessment_name,
                          type_id: data[x].type_id,
                          type_name: data[x].type_name,
                          assessment_date: data[x].date,
                          assessment_time: data[x].time,
                          status: data[x].assessment_status,
                          assessment_totalScore: data[x].assessment_totalScore,
                          class_id: data[x].class_id,
                          term_id:  data[x].term_id,
                          term: term

                          
                      };

                      this.prelim_records.push(pushdata);           
                  }
                   
                
              }

        
           }, error =>{
             
              this.no_connection = true
              this.p_has_records = false;

           });

      
           });


  }


 sort_midterm(ev){
     
      if(ev == 'All'){
         
         this.display_midterm();
         
     }
     
     
      console.log(ev);
      this.m_has_records = false;
      this.m_no_result = false;
      this.no_connection = false;
      this.midterm_records = [];
 
        
           this.storage.get('classid').then((value)=> {
        
         
          this.http.get('http://' +  this.networkProvider.server_address +'/lcsagapp/lcsag_backend/assessments/?id=' + value.class_id +'&term=2&type_id=' + ev)
            .map(res => res.json())
            .subscribe(data => {
              this.m_has_records = true;
       
              if(data == false){
                  this.m_no_result = true;
                  this.no_connection = false;
                  this.m_zero_result = 'No assessment found';
              }
              else{
                  this.m_no_result = false;
                  this.no_connection = false;
                

                  for(let x = 0; x < data.length; x++){

                      let term = 'Prelims';

                      if(data[x].term_id == 1){
                          term = 'Prelims';
                      }
                      if(data[x].term_id == 2){
                         term = 'Midterms';
                        
                      }
                      if(data[x].term_id == 3){
                         term = 'Finals';
                      }

                      let pushdata = {

                          assessment_id: data[x].assessment_id,
                          assessment_name: data[x].assessment_name,
                          type_id: data[x].type_id,
                          type_name: data[x].type_name,
                          assessment_date: data[x].date,
                          assessment_time: data[x].time,
                          status: data[x].assessment_status,
                          assessment_totalScore: data[x].assessment_totalScore,
                          class_id: data[x].class_id,
                          term_id:  data[x].term_id,
                          term: term

                          
                      };

                      this.midterm_records.push(pushdata);           
                  }
               
                
              }

           
           }, error =>{
             
              this.no_connection = true
              this.m_has_records = false;

           });

      
           });


  }

 sort_final(ev){
     
     
       if(ev == 'All'){
         
         this.display_final();
         
     }
     
     
      console.log(ev);
      this.f_has_records = false;
      this.f_no_result = false;
      this.no_connection = false;
      this.final_records = [];
 
        
           this.storage.get('classid').then((value)=> {
        
         
          this.http.get('http://' +  this.networkProvider.server_address +'/lcsagapp/lcsag_backend/assessments/?id=' + value.class_id +'&term=3&type_id=' + ev)
            .map(res => res.json())
            .subscribe(data => {
              this.f_has_records = true;
       
              if(data == false){
                  this.f_no_result = true;
                  this.no_connection = false;
                 
                  this.f_zero_result = 'No assessment found';
              }
              else{
                  this.f_no_result = false;
                  this.no_connection = false;
                

                  for(let x = 0; x < data.length; x++){

                      let term = 'Prelims';

                      if(data[x].term_id == 1){
                          term = 'Prelims';
                      }
                      if(data[x].term_id == 2){
                         term = 'Midterms';
                        
                      }
                      if(data[x].term_id == 3){
                         term = 'Finals';
                      }

                      let pushdata = {

                          assessment_id: data[x].assessment_id,
                          assessment_name: data[x].assessment_name,
                          type_id: data[x].type_id,
                          type_name: data[x].type_name,
                          assessment_date: data[x].date,
                          assessment_time: data[x].time,
                          status: data[x].assessment_status,
                          assessment_totalScore: data[x].assessment_totalScore,
                          class_id: data[x].class_id,
                          term_id:  data[x].term_id,
                          term: term

                          
                      };

                      this.final_records.push(pushdata);           
                  }
              
                
              }

          
           }, error =>{
             
              this.no_connection = true
              this.f_has_records = false;

           });

      
           });


  }
  
 
 
  add_assessment() {

  	  
      let addModal = this.modalCtrl.create(AddAssessmentPage);
       addModal.onDidDismiss(() => {
       
        this.display_prelim();
        this.display_midterm();
        this.display_final();
        
      });
      addModal.present();
     
  }
  record_assessment(data) {

  	  
      let addModal = this.modalCtrl.create(RecordAssessmentPage, data);
       addModal.onDidDismiss(() => {
       	 this.display_prelim();
        this.display_midterm();
        this.display_final();
      });
      addModal.present();
     
  }
  /*edit_assessment(item: ItemSliding, thedata){

    let alert = this.alertCtrl.create();
    alert.setTitle('Edit Assessment');
    alert.addInput({
      name: 'assessment_name',
      type: 'text',
      placeholder: 'Assessment name',
      value: thedata.assessment_name
    });
     alert.addInput({
      name: 'assessment_totalScore',
      type: 'number',
      placeholder: 'Total score',
      value: thedata.assessment_totalScore
    });
   
    alert.addButton({
      text: 'Cancel',
      handler: (data: any) => {
          alert.dismiss(data);
      }
        });
      
        
    alert.addButton({
      text: 'Ok',
      handler: (data: any) => {
          console.log(data);
          this.update_assessment(item, thedata,data.assessment_name, data.assessment_totalScore);
           alert.dismiss(data);
      }
    });
    alert.present();

  }
  update_assessment(item, thedata,assessment_name, assessment_totalScore){

      let index = this.assessment_records.indexOf(thedata);
     
      let pushdata = {
                          assessment_id: thedata.assessment_id,
                          assessment_name: assessment_name,
                          type_id: thedata.type_id,
                          type_name: thedata.type_name,
                          assessment_date: thedata.assessment_date,
                          assessment_time: thedata.assessment_time,
                          status: thedata.status,
                          assessment_totalScore: assessment_totalScore,
                          class_id: thedata.class_id,
                          term_id:  thedata.term_id,
                          term: thedata.term
       };
     
       

        let url = 'http://'+ this.networkProvider.server_address +'/lcsagapp/lcsag_backend/update_assessment/';

          let newdata = JSON.stringify(
                        { 
                            assessment_id: thedata.assessment_id, 
                            assessment_name: assessment_name,
                            type_id: thedata.type_id,
                            assessment_score: assessment_totalScore,
                            term_id: thedata.term_id,
                            assessment_status: thedata.status
                           
                          });


          this.http.post(url, newdata)
          .subscribe(data => {
                this.assessment_records[index] = pushdata;
                this.onSuccess('Saved.');
                item.close();
                 console.log(data);
                
            
          }, error => {
            //loading.dismiss();
              console.log(error);
              // this.dismiss();
          });


  }*/
    onSuccess(message) {
      let toast = this.toastCtrl.create({
        message: message,
        duration: 3000,
        position: 'top'
      });

      toast.present(toast);
      
  }
   delete_assessment(ass, item: ItemSliding, id) {
   
    let alert = this.alertCtrl.create({
      title: 'Delete assessment',
      message: 'Are you sure do you want to delete assessment?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
              
            if(ass.term_id == 1){
                
                this.remove_prelim(ass, item, id);
            }
            else if(ass.term_id == 2){
                  
                this.remove_midterm(ass, item, id);
            }
            else if(ass.term_id == 3){
                  
                this.remove_final(ass, item, id);  
            }
            
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
  remove_prelim(ass, item, id){

           let index = this.prelim_records.indexOf(ass);
           this.prelim_records.splice(index, 1);  

    
          this.http.get('http://'+ this.networkProvider.server_address +'/lcsagapp/lcsag_backend/delete_assessment/?id=' +  id )
            .map(res => res.json())
            .subscribe(data => {
                  
                this.onSuccess('Removed assessment');
                this.count_prelim = this.prelim_records.length;
                item.close();
               
              
           },   error => {
                       
                    item.close();
        
              });


  }

remove_midterm(ass, item, id){

           let index = this.midterm_records.indexOf(ass);
           this.midterm_records.splice(index, 1);  

    
          this.http.get('http://'+ this.networkProvider.server_address +'/lcsagapp/lcsag_backend/delete_assessment/?id=' +  id )
            .map(res => res.json())
            .subscribe(data => {
                  
                this.onSuccess('Removed assessment');
                this.count_midterm = this.midterm_records.length;
                item.close();
               
              
           },   error => {
                       
                    item.close();
        
              });


  }
remove_final(ass, item, id){

           let index = this.final_records.indexOf(ass);
           this.final_records.splice(index, 1);  

    
          this.http.get('http://'+ this.networkProvider.server_address +'/lcsagapp/lcsag_backend/delete_assessment/?id=' +  id )
            .map(res => res.json())
            .subscribe(data => {
                  
                this.onSuccess('Removed assessment');
                this.count_final = this.final_records.length;
                item.close();
               
              
           },   error => {
                       
                    item.close();
        
              });


  }
   onAssessmentAdd(title, subtitle) {
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
                 this.onAssessmentAdd("Whoops...", "Adding assessment is not possible because you don't have students in this class.");
              }
              else{
                 this.add_assessment();
              }

            console.log(data);
           }, error =>{
             
             

           });

	    
           });


  }
 selectedTerm(ev: any){
     
      console.log(ev.target.value);
 }

  
 

}
