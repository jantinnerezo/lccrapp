import { Component } from '@angular/core';
import { NavParams, NavController, Events} from 'ionic-angular';

import { StudentsPage } from '../students/students';
import { AttendanceRecordsPage } from '../attendance-records/attendance-records';
import { AssessmentRecordsPage } from '../assessment-records/assessment-records';



@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // set the root pages for each tab
  student_tab: any = StudentsPage;
  attendance_tab: any = AttendanceRecordsPage;
  assessment_tab: any = AssessmentRecordsPage;
  mySelectedIndex: number;
 

  constructor(public navParams: NavParams, public navCtrl: NavController, public events: Events) {
    this.mySelectedIndex = navParams.data.tabIndex || 0 && navParams.data;
    
  }

}
