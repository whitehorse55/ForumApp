import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the OurpartnessPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ourpartness',
  templateUrl: 'ourpartness.html',
})
export class OurpartnessPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OurpartnessPage');
  }

  onclickbackbutton(event)
  {
    this.navCtrl.pop()
  }
}
