import { LoadingProvider } from './../../providers/loading/loading';
import { CustomalertProvider } from './../../providers/customalert/customalert';


import { AuthProvider } from './../../providers/auth/auth';
import { ApiProvider } from './../../providers/api/api';

import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { LocalstorageProvider } from '../../providers/localstorage/localstorage';
import { ToastserviceProvider } from '../../providers/toastservice/toastservice';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Constant } from '../../Constant/constant';

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
    public localprovider : LocalstorageProvider,
    public toastprovider : ToastserviceProvider,
    public inappbroswser : InAppBrowser
  ) {
    this.credential = {useremail : "", userpassword : ""};

  }

  ionViewDidLoad() {

  }

  gotomain() {
    console.log("this", this.credential.isChecked)
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
        this.alertprovider.presentAlert('Login failed',er)
    })
  }

  gotoforgotpassword() {
      this.alertprovider.showAlertWithMessage().then(res=>{

          this.loadingprovider.showLoadingView()
          this.apiservice.forgotPassword(res).then(re=>{
            this.loadingprovider.removeLoadingView()
              this.toastprovider.create(re['message'],false, 2000)
          }).catch(er=>{
            console.log("this is return result", er)
            this.loadingprovider.removeLoadingView()
            this.toastprovider.create(er['message'])
          })

      }).catch(er=>{
        this.loadingprovider.removeLoadingView()
      })
  }

  gotosignup() {
    console.log("this is cliekd");
    this.navCtrl.push('SignupPage')
  }


}
