import { ApiProvider } from "./../../providers/api/api";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Constant } from "../../Constant/constant";

/**
 * Generated class for the MessagesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-messages",
  templateUrl: "messages.html"
})
export class MessagesPage {

  userlist : any
  photourl : any
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public apiservice: ApiProvider
  ) {
    this.userlist = []
    this.photourl = Constant.PHOTO_URL
  }

  ionViewDidLoad() {
  }

  ionViewWillEnter(){
    this.getUserList()
  }

  getUserList()
  {
    console.log("enter page");
    this.apiservice.getUserList().then(res=>{
      console.log("userinfo",res);

      this.userlist = res['data'].reverse()
    }).catch(er=>{
      console.log("error",er);
    })
  }

  onclickbackbutton(info) {
    this.navCtrl.pop();
  }

  onclickitem(index)
  {
    let info = this.userlist[index];
    this.navCtrl.push('MessagedetailPage',{info : info})
  }
}
