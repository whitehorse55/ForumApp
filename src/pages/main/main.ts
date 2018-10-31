import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainPage');
  }

  onclickForum()
  {
    this.navCtrl.push('ForumPage');
  }

  onclickOurpartness()
  {
    this.navCtrl.push('OurpartnessPage');
  }

  onclickHouseRoles()
  {
    this.navCtrl.push('HouserulePage');
  }

  onclickContact()
  {
    this.navCtrl.push('ContactadminPage');
  }

}
