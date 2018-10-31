import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ForumDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forum-detail',
  templateUrl: 'forum-detail.html',
})
export class ForumDetailPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForumDetailPage');
  }

  onclickbackbutton(info)
  {
    this.navCtrl.pop()
  }

  onclickfabbutton()
  {

  }

}
