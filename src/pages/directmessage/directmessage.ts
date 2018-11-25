import { ApiProvider } from "./../../providers/api/api";
import { Component, ViewChild, ElementRef } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController
} from "ionic-angular";
import { LocalstorageProvider } from "../../providers/localstorage/localstorage";
import { ToastserviceProvider } from "../../providers/toastservice/toastservice";
import { Constant } from "../../Constant/constant";

/**
 * Generated class for the DirectmessagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-directmessage",
  templateUrl: "directmessage.html"
})
export class DirectmessagePage {
  @ViewChild("content") content: ElementRef;

  messagContent: any;
  info: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public apiservice: ApiProvider,
    public localprovider : LocalstorageProvider,
    public alertservice : ToastserviceProvider
  ) {}

  ionViewDidLoad() {
    this.messagContent = "";
    this.info = this.navParams.get("info");
    console.log("ionViewDidLoad DirectmessagePage", this.info);
  }

  onclickcancelbutton() {
    this.viewCtrl.dismiss();
  }

  onclicksendbutton() {

    let myid = this.localprovider.getUserId();
    if(this.info['user_id']== myid)
    {
      this.alertservice.presentErrorAlert("Can't send message. This is your post")
    }else{
      this.apiservice.sendMessasge(this.messagContent, this.info['user_id'], myid, '').then(res=>{
          this.alertservice.create("Send Direct Message", false, 2000)
          this.messagContent = ''
          this.viewCtrl.dismiss()
      }).catch(er=>{
        this.alertservice.create(Constant.RESULT_FAIL, false, 2000)
      })
    }

  }
}
