import { ApiProvider } from "./../../providers/api/api";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { LocalstorageProvider } from "../../providers/localstorage/localstorage";

/**
 * Generated class for the MainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-main",
  templateUrl: "main.html"
})
export class MainPage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public apiservice: ApiProvider,
    public localprovider : LocalstorageProvider
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad MainPage");
    this.saveUserInfo();
  }

  saveUserInfo()
  {
    let userid = this.localprovider.getUserId()

    this.apiservice.getUserInfo(userid).then(res=>{
        console.log(res)
        this.localprovider.saveUserInfo(res[0])
        this.localprovider.saveLoginStatus(true)
    }).catch(er=>{

    })
  }

  onclickForum() {
    this.navCtrl.push("ForumPage");
  }

  onclickOurpartness() {
    this.navCtrl.push("OurpartnessPage");
  }

  onclickHouseRoles() {
    this.navCtrl.push("HouserulePage");
  }

  onclickContact() {
    this.navCtrl.push("ContactadminPage");
  }

  onclickLogout()
  {
    this.localprovider.clearLocalstorage();
    this.navCtrl.setRoot('SigninPage')
  }
}
