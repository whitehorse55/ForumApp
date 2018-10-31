import { CustomalertProvider } from './../../providers/customalert/customalert';


import { AuthProvider } from './../../providers/auth/auth';
import { ApiProvider } from './../../providers/api/api';

import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

/**
 * Generated class for the SigninPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-signin",
  templateUrl: "signin.html"
})
export class SigninPage {

  credential : any= {}

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public apiservice: ApiProvider,
    public authprovider : AuthProvider,
    public alertprovider : CustomalertProvider

  ) {
    this.credential = {useremail : "", userpassword : ""};
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad SigninPage");
  }

  gotomain() {

    this.authprovider.login(this.credential).then(res=>{
      this.apiservice.userLogin(this.credential).then(re=>{
        this.navCtrl.setRoot("MainPage");
      }).catch(er=>{
      //  this.alertservice.presentAlert('Login failed',er)
      this.alertprovider.presentAlert('Login failed',er['msg'])
      });
    }).catch(er=>{
        this.alertprovider.presentAlert('Login failed','Please check Email and Password again!')
    })

  }

  gotoforgotpassword() {}

  gotosignup() {}
}
