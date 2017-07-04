import { Component, ViewChild } from '@angular/core';
import { Events, MenuController, Nav, Platform, App, ModalController} from 'ionic-angular';
import { Splashscreen, StatusBar, SQLite } from 'ionic-native';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { HomePage } from '../pages/home/home';
import { SplashPage } from '../pages/splash/splash';
import { UserData } from '../providers/user-data';
import { NetworkProvider } from '../providers/network-provider';
import { AllStudentsPage } from '../pages/all-students/all-students';
import { ClassListPage } from '../pages/class-list/class-list';
import { AddClassPage } from '../pages/add-class/add-class';
import { HomePopupoverPage } from '../pages/home-popupover/home-popupover';
import { ClassPagePage } from '../pages/class-page/class-page';
import { TabsPage } from '../pages/tabs/tabs';
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

export interface PageInterface {
  title: string;
  component: any;
  icon: string;
  logsOut?: boolean;
  index?: number;
}

@Component({
  templateUrl: 'app.template.html'
})

export class LCSAGApp {

 
  // the root nav is a child of the root app component
  // @ViewChild(Nav) gets a reference to the app's root nav
  @ViewChild(Nav) nav: Nav;

  // List of pages that can be navigated to from the left menu
  // the left menu only works after login
  // the login page disables the left menu

  catPages: PageInterface[] = [
    { title: 'Home', component: HomePage, icon: 'home' },
    { title: 'Add Class', component: HomePage, icon: 'add-circle' },
    { title: 'Class list', component: ClassListPage, icon: 'list' },
    { title: 'Account', component: AllStudentsPage, icon: 'settings' },
    { title: 'About LCSAG App', component: HomePage, icon: 'information-circle' }
    ];

  instructorsList = [];
  rootPage: any;
  
  constructor(
    public events: Events,
    public userData: UserData,
    public menu: MenuController,
    public platform: Platform,
    public networkProvider: NetworkProvider,
    public storage: Storage,
    public http: Http,
    public modalCtrl: ModalController,
    
  ) {
    // Call any initial plugins when ready
    platform.ready().then(() => {

      StatusBar.styleDefault();
      Splashscreen.hide();
     
    });

    // Check if the user has already seen the tutorial
    this.userData.hasLoggedIn().then((loggedin) => {
      if (loggedin === true) {
         
           this.storage.get('userdata').then((value)=> {
               
                this.instructors();
                this.rootPage = HomePage;
               
           });
           
          
       
      } else {
       
        // this.rootPage = TabsPage;
        
        this.rootPage = LoginPage;
      }
    });
  
    //confData.load();

    // decide which menu items should be hidden by current login status stored in local storage
   
  }

  openPage(page: PageInterface) {
    // the nav component was found using @ViewChild(Nav)
    // reset the nav to remove previous pages and only have this page
    // we wouldn't want the back button to show in this scenario
    if (page.index) {
      this.nav.setRoot(page.component, { tabIndex: page.index });

    }
    else {
      this.nav.setRoot(page.component).catch(() => {
        console.log("Didn't set nav root");
      });
    }

    if (page.logsOut === true) {
      // Give the menu time to close before changing to logged out
      setTimeout(() => {
        this.userData.logout();
      }, 1000);
    }
  }

  openSplash() {
    this.nav.setRoot(SplashPage);
  }

  home_page(){


           this.nav.setRoot(HomePage);
   
   
  }
  addclass_page(){

       let addModal = this.modalCtrl.create(AddClassPage);
       addModal.onDidDismiss(() => {
        
      });
      addModal.present();
  }
  classlist_page(){

         this.nav.push(ClassListPage);
  }
  account_page(){

         let addModal = this.modalCtrl.create(AccountPage);
       addModal.onDidDismiss(() => {
        
      });
      addModal.present();
  }
 about_page(){
     
        let aboutModal = this.modalCtrl.create(AboutPage);
        aboutModal.onDidDismiss(() => {
        });
        aboutModal.present();
 }

  
 instructors(){
       
     this.instructorsList = [];
     
     this.storage.get('userdata').then((value)=> {
         
		      this.http.get('http://'+ this.networkProvider.server_address +'/lcsagapp/lcsag_backend/instructors/?id=' + value[0].instructor_id)
		        .map(res => res.json())
		        .subscribe(data => {
                  
                  
			        for(let x = 0;  x < data.length; x++){
                            
                        let instructordata = {

                                    instructor_username: data[x].instructor_username,
                                    instructor_lastname: data[x].instructor_lastname,
                                    instructor_firstname: data[x].instructor_firstname,
                            }
                        this.instructorsList.push(instructordata);
                     }
			        console.log(data);
		        
		       } , error => {
                  
                  console.log(error);
                  
              });
     });

  }

 
  
}
