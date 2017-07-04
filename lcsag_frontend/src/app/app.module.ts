import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { LCSAGApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { HomePage } from '../pages/home/home';
import { HomePopupoverPage } from '../pages/home-popupover/home-popupover';
import { SplashPage } from '../pages/splash/splash';
import { UserData } from '../providers/user-data';
import { AllStudentsPage } from '../pages/all-students/all-students';
import { ClassListPage } from '../pages/class-list/class-list';
import { AddClassPage } from '../pages/add-class/add-class';
import { ClassPagePage } from '../pages/class-page/class-page';
import { TabsPage } from '../pages/tabs/tabs';
import { NetworkProvider } from '../providers/network-provider';
import { StudentProfilePage } from '../pages/student-profile/student-profile';
import { AddAttendancePage } from '../pages/add-attendance/add-attendance';
import { AddAssessmentPage } from '../pages/add-assessment/add-assessment';
import { AttendancePage } from '../pages/attendance/attendance';
import { StudentsPage } from '../pages/students/students';
import { AttendanceRecordsPage } from '../pages/attendance-records/attendance-records';
import { AssessmentRecordsPage } from '../pages/assessment-records/assessment-records';
import { RecordAssessmentPage } from '../pages/record-assessment/record-assessment';
import { ViewAttendancePage } from '../pages/view-attendance/view-attendance';
import { AccountPage } from '../pages/account/account';
import { ClassDetailsPage } from '../pages/class-details/class-details';
import { AttendanceDetailsPage } from '../pages/attendance-details/attendance-details';
import { AboutPage } from '../pages/about/about';
import {ForgotPasswordPage} from '../pages/forgot-password/forgot-password';

@NgModule({
  declarations: [
    LCSAGApp,
    LoginPage,
    SignupPage,
    HomePage,
    SplashPage,
    AddClassPage,
    AllStudentsPage,
    ClassListPage,
    HomePopupoverPage,
    ClassPagePage,
    TabsPage,
    AttendancePage,
    StudentProfilePage,
    AddAttendancePage,
    AddAssessmentPage,
    StudentsPage,
    AccountPage,
    ClassDetailsPage,
    AssessmentRecordsPage,
    AttendanceRecordsPage,
    RecordAssessmentPage,
    ViewAttendancePage,
    AttendanceDetailsPage,
    AboutPage,
    ForgotPasswordPage
  ],
  imports: [
    IonicModule.forRoot(LCSAGApp, { scrollAssist: false, autoFocusAssist: false })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    LCSAGApp,
    LoginPage,
    SignupPage,
    HomePage,
    SplashPage,
    AddClassPage,
    AllStudentsPage,
    ClassListPage,
    HomePopupoverPage,
    ClassPagePage,
    TabsPage,
    AttendancePage,
    StudentProfilePage,
    AddAttendancePage,
    AddAssessmentPage,
    StudentsPage,
    AccountPage,
    ClassDetailsPage,
    AttendanceRecordsPage,
    AssessmentRecordsPage,
    RecordAssessmentPage,
    ViewAttendancePage,
    AttendanceDetailsPage,
    AboutPage,
    ForgotPasswordPage
  ],
  providers: [UserData, Storage, NetworkProvider]
})
export class AppModule { 
}
