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
  selector: 'page-record-assessment',
  templateUrl: 'record-assessment.html'
})
export class RecordAssessmentPage {

     assessment_name: any;
     type: any;
     total: any;
     has_students = false;
  	 no_connection = false;
  	 students = [];
  	 stat: any;
    

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
     this.getstatus();
     this.display_details();
     if(navParams.data.status == 0){
        this.display_students();
     }
     else{
        this.display_saved();
     }
  	 
  }
  display_details(){
  		this.assessment_name = this.navParams.data.assessment_name;
  		this.type = this.navParams.data.type_name;
  		this.total = this.navParams.data.assessment_totalScore;
  }
  dismiss(){

      this.viewCtrl.dismiss();
  }

 display_students(){

      this.has_students = false;
      this.no_connection = false;
 

        this.storage.get('classid').then((value) => {


         
          this.http.get('http://' +  this.networkProvider.server_address +'/lcsagapp/lcsag_backend/students/?id=' + value.class_id )
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
                            student_score: 0,
                            student_status: 0

                      };

                      this.students.push(pushdata);
                     
                  }

               
                 

            console.log(this.students);
           }, error =>{
             
              this.no_connection = true
              this.has_students = false;
  
           });

        });
        

  }
  display_saved(){

      this.has_students = false;
      this.no_connection = false;
 

          this.http.get('http://' +  this.networkProvider.server_address +'/lcsagapp/lcsag_backend/student_assessment/?id=' +this.navParams.data.assessment_id )
            .map(res => res.json())
            .subscribe(data => {
              this.has_students = true;
       
                
                  this.no_connection = false;
                  //this.students_data = data;

                  for(let x = 0; x < data.length; x++){

                      let pushdata = {
                            
                            id: data[x].stud_assessment_id,
                            student_id: data[x].student_id,
                            student_lastname: data[x].student_lastname,
                            student_firstname: data[x].student_firstname,
                            student_course: data[x].student_course,
                            student_address: data[x].student_address,
                            student_phone: data[x].student_phone,
                            student_score: data[x].stud_score,
                            student_status: data[x].status
                      };

                      this.students.push(pushdata);
                     
                  }

               
                 

            console.log(this.students);
           }, error =>{
             
              this.no_connection = true
              this.has_students = false;
  
           });

       

  }

  set_score(student,score) {
    let alert = this.alertCtrl.create();
    alert.setTitle('Set student score:');
    alert.addInput({
      name: 'score',
      type: 'number',
      placeholder: score
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

            this.save_score(student,data.score);
         
      }
    });
    alert.present();

  }
 edit_score(student,score) {
    let alert = this.alertCtrl.create();
    alert.setTitle('Edit student score:');
    alert.addInput({
      name: 'score',
      type: 'number',
      value: score
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

            this.update_score(student,data.score);
         
      }
    });
    alert.present();

  }

  save_score(student, data){
      let index = this.students.indexOf(student);
      let totalscore = this.navParams.data.assessment_totalScore;
      let divide = totalscore/3;
      let status = 1; //passed
      console.log(totalscore);
     if(data == ""){

      data = 0;
    }
    if(parseInt(data) > parseInt(totalscore)){
         this.showAlert('Invalid score!', 'Score must not be greater than the total score.');
    } 
    else{

  	

  	  if(data < divide){

  	  	status = 0;
  	  }

      let pushdata = {
                            
                            student_id: this.students[index].student_id,
                            student_lastname: this.students[index].student_lastname,
                            student_firstname: this.students[index].student_firstname,
                            student_course:this.students[index].student_course,
                            student_address: this.students[index].student_address,
                            student_phone: this.students[index].student_phone,
                            student_score: data,
                            student_status: status
       };
     
        this.students[index] = pushdata;
       
    }
  }

update_score(student, data){
      let index = this.students.indexOf(student);
      let totalscore = this.navParams.data.assessment_totalScore;
      let divide = totalscore/3;
      let status = 1; //passed
      console.log(totalscore);
     if(data == ""){

      data = 0;
    }
    if(parseInt(data) > parseInt(totalscore)){
         this.showAlert('Invalid score!', 'Score must not be greater than the total score.');
    } 
    else{

  	

  	  if(data < divide){

  	  	status = 0;
  	  }

      let pushdata = {
                            id: this.students[index].id,
                            student_id: this.students[index].student_id,
                            student_lastname: this.students[index].student_lastname,
                            student_firstname: this.students[index].student_firstname,
                            student_course:this.students[index].student_course,
                            student_address: this.students[index].student_address,
                            student_phone: this.students[index].student_phone,
                            student_score: data,
                            student_status: status
       };
     
        this.students[index] = pushdata;
        this.update_student_assessment();
       
    }
  }
   cancel_recording() {
  
    let alert = this.alertCtrl.create({
      title: 'Cancel assessment recording',
      message: 'Are you sure do you want to cancel assessment recording?',
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

  save_student_assessment(){

        let url = 'http://'+ this.networkProvider.server_address +'/lcsagapp/lcsag_backend/add_student_assessment/';

        for(let x = 0; x < this.students.length; x ++){

          let insertdata = JSON.stringify(
                        {
                             student_id: this.students[x].student_id,
        				          	 assessment_id: this.navParams.data.assessment_id,
        				          	 stud_score: this.students[x].student_score,
        				          	 status:  this.students[x].student_status
                           
                          });

          this.http.post(url, insertdata)
          .subscribe(data => {
                
                //this.onSuccess('New attendance added.');
                 console.log(data);
                
            
          }, error => {
            //loading.dismiss();
              console.log(error);
              // this.dismiss();
          });

        }
        
        this.update_assessment();
        this.viewCtrl.dismiss();
       

  }
update_student_assessment(){

        let url = 'http://'+ this.networkProvider.server_address +'/lcsagapp/lcsag_backend/update_student_assessment/';

        for(let x = 0; x < this.students.length; x ++){

          let updatedata = JSON.stringify(
                        {
                                     stud_id: this.students[x].id,
                                     student_id: this.students[x].student_id,
        				          	 assessment_id: this.navParams.data.assessment_id,
        				          	 stud_score: this.students[x].student_score,
        				          	 status:  this.students[x].student_status
                           
                          });

          this.http.post(url, updatedata)
          .subscribe(data => {
                
                //this.onSuccess('New attendance added.');
                 console.log(data);
                
            
          }, error => {
            //loading.dismiss();
              console.log(error);
              // this.dismiss();
          });

        }
        
       
       

  }

   update_assessment(){

        let url = 'http://'+ this.networkProvider.server_address +'/lcsagapp/lcsag_backend/update_assessment/';

          let newdata = JSON.stringify(
                        {	
                            assessment_id: this.navParams.data.assessment_id, 
                            assessment_name: this.navParams.data.assessment_name,
                            type_id: this.navParams.data.type_id,
                            assessment_score: this.navParams.data.assessment_totalScore,
                            term_id: this.navParams.data.term_id,
                            assessment_status: 1
                           
                          });

          this.http.post(url, newdata)
          .subscribe(data => {
                
                this.onSuccess('Saved.');
                 console.log(data);
                
            
          }, error => {
            //loading.dismiss();
              console.log(error);
              // this.dismiss();
          });

      
       
        this.viewCtrl.dismiss();
       

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
   showAlert(t,s) {
    let alert = this.alertCtrl.create({
      title: t,
      subTitle: s,
      buttons: ['OK']
    });
    alert.present();
  }
  getstatus(){

  	this.stat = this.navParams.data.status;
  	console.log('Status is: ' + this.stat);

  }
  edit(){
  	 this.stat = 0;
  }
 

  
 
}
