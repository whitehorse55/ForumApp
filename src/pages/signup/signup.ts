import { ApiProvider } from './../../providers/api/api';
import { AuthProvider } from "./../../providers/auth/auth";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-signup",
  templateUrl: "signup.html"
})
export class SignupPage {
  base64Image = "";

  credential: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public authprovider: AuthProvider,
    public apiprovider : ApiProvider
  ) {
    this.base64Image = "";
    this.credential = {
      name: "",
      email: "",
      location: "",
      password: "",
      confirmpassword : ""
    };
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad SignupPage");
  }

  changeprofilepic() {}

  onclickSignup() {
      this.authprovider.signup(this.credential, this.base64Image).then(res=>{
        this.apiprovider.userSignup(this.credential, this.base64Image).then(res=>{

        }).catch(er=>{
          console.log("this is eror===>", er)
        })
      }).catch(er=>{
          console.log("this is eror", er)
      })
  }
}
