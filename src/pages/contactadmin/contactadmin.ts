import { EmailComposer } from '@ionic-native/email-composer';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ContactadminPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contactadmin',
  templateUrl: 'contactadmin.html',
})
export class ContactadminPage {


  admin_address : any
  title : any
  mycontent : any

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public emailcomposer : EmailComposer) {
  }


  ionViewDidLoad() {
    this.admin_address = ""
    this.title = ""
    this.mycontent = ""
    console.log('ionViewDidLoad ContactadminPage');
    this.sendmessage()
  }

  onclickbackbutton(event)
  {
    this.navCtrl.pop()
  }


  sendmessage()
  {
    let email = {
      to: [],
      cc: [],
      bcc: [],
      attachment: [],
      subject: "Report Content",
      body:this.mycontent
    };

    this.emailcomposer.addAlias("gmail", "com.google.android.gm");
    this.emailcomposer.addAlias("outlook", "com.microsoft.android.outlook");
    this.emailcomposer.open(email);

    this.emailcomposer
      .isAvailable()
      .then((available: boolean) => {
        console.log("this is available", available);
        if (available) {
          //Now we know we can send
          // Send a text message using default options
          this.emailcomposer.open(email);
        }
      })
      .catch(err => {
        console.log("====================================");
        console.log(err);
        console.log("====================================");
        this.navCtrl.pop()
      });
  }
}
