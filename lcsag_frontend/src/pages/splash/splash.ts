import { Component } from '@angular/core';

import { MenuController, NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { HomePage } from '../home/home';

export interface Slide {
	title: string;
	description: string;
	image: string;
	class: string;
}
/*
  Generated class for the Splash page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-splash',
  templateUrl: 'splash.html'
})
export class SplashPage {

	slides: Slide[];
	showSkip = true;

	constructor(public navCtrl: NavController, public menu: MenuController, public storage: Storage) {
		this.slides = [
			{
				title: '<b>Manifest Apparel</b>',
				description: 'Your one stop shop to find every Manifest Apparel t-shirt from our collectors, inspirational, Christian and patriotic!',
				image: 'assets/img/splash/logo-old.png',
				class: 'slide-logo',
			},
			{
				title: 'Christian',
				description: '',
				image: 'assets/img/splash/home-cat-01.jpg',
				class: 'slide-image',
			},
			{
				title: 'Inspirational',
				description: '',
				image: 'assets/img/splash/home-cat-02.jpg',
				class: 'slide-image',
			},
			{
				title: 'Patriotic',
				description: '',
				image: 'assets/img/splash/home-cat-03.jpg',
				class: 'slide-image',
			}
		];
	}

	startApp() {
		
	}

	onSlideChangeStart(slider) {
		this.showSkip = !slider.isEnd;
	}

	ionViewDidEnter() {
		// the root left menu should be disabled on the tutorial page
		this.menu.enable(false);
	}

	ionViewWillLeave() {
		// enable the root left menu when leaving the tutorial page
		this.menu.enable(true);
	}

}
