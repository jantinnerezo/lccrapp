import { Injectable } from '@angular/core';

import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';


@Injectable()
export class NetworkProvider {
 
  server_address = 'localhost';
 
  constructor(public events: Events, public storage: Storage) {}


}
