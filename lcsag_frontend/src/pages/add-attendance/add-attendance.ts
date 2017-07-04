import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ViewController} from 'ionic-angular';

/*
  Generated class for the AddAttendance page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-add-attendance',
  templateUrl: 'add-attendance.html'
})
export class AddAttendancePage {

	
	
  attendance_date: any;
  attendance_time: any;

  constructor(
  	public navCtrl: NavController,
  	public navParams: NavParams,
    public viewCtrl: ViewController) {

      this.getdate_time();
  }


  	add_attendance(attendance_date, attendance_time){

  		console.log(attendance_date);
  		console.log(attendance_time);
  	}
    dismiss() {
    this.viewCtrl.dismiss();
    }
    getdate_time(){
       let d = new Date();

   
      let gettime = new Date(d.getTime());
      let getdate = new Date();


      this.attendance_date =  Date.now();//gettime.toISOString();
      this.attendance_time =  new Date();//getdate.toISOString();
    }
  

}
