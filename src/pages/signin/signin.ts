import { LoadingProvider } from './../../providers/loading/loading';
import { CustomalertProvider } from './../../providers/customalert/customalert';


import { AuthProvider } from './../../providers/auth/auth';
import { ApiProvider } from './../../providers/api/api';

import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { LocalstorageProvider } from '../../providers/localstorage/localstorage';

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
    public alertprovider : CustomalertProvider,
    public loadingprovider : LoadingProvider,
    public localprovider : LocalstorageProvider
  ) {
    this.credential = {useremail : "", userpassword : ""};
  }

  ionViewDidLoad() {

  }

  gotomain() {
    this.loadingprovider.showLoadingView()
    this.authprovider.login(this.credential).then(res=>{
      console.log("ionViewDidLoad afsdafsdf");
      this.apiservice.userLogin(this.credential).then(re=>{

        this.localprovider.saveLoginStatus(true)
        this.localprovider.saveUserId(re[0]['userId'])
        this.localprovider.saveUserInfo(re)
        this.loadingprovider.removeLoadingView()
        this.navCtrl.setRoot("MainPage");

      }).catch(er=>{
      //  this.alertservice.presentAlert('Login failed',er)
      this.alertprovider.presentAlert('Login failed',er['msg'])
      this.loadingprovider.removeLoadingView()
      });
    }).catch(er=>{
        this.loadingprovider.removeLoadingView()
        this.alertprovider.presentAlert('Login failed','Please check Email and Password again!')
    })
  }

  gotoforgotpassword() {}

  gotosignup() {
    console.log("this is cliekd");
    this.navCtrl.push('SignupPage')
  }
}
