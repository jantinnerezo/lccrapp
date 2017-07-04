import { Injectable } from '@angular/core';

import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';


@Injectable()
export class UserData {
  _favorites = [];
  HAS_LOGGED_IN = 'hasLoggedIn';
  OPEN_CLASS = 'open_class';
 
  constructor(public events: Events, public storage: Storage) {}


  login(data) {
  
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.storage.set('userdata', data);
    
  }
  opened_class(data){
    this.storage.set(this.OPEN_CLASS, true);
    this.storage.set('open_class', data);
  }

  logout() {
    //this.storage.remove(this.HAS_LOGGED_IN);
    this.storage.remove('userdata');
    this.storage.clear().then(()=>{
            
        console.log('Cleared na!');
              
    });
      
  }

  // return a promise
  hasLoggedIn() {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      return value === true;
    });
  };

 
}
