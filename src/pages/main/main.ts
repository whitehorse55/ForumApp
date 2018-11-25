import { Constant } from './../../Constant/constant';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { EmailComposer } from '@ionic-native/email-composer';
import { ApiProvider } from "./../../providers/api/api";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { LocalstorageProvider } from "../../providers/localstorage/localstorage";
import { DocumentViewerOptions, DocumentViewer } from '@ionic-native/document-viewer';
// import { FileOpener } from '@ionic-native/file-opener';

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
    public localprovider : LocalstorageProvider,
    public emailcomposer : EmailComposer,
    public document : DocumentViewer,
    public inappbrowser : InAppBrowser
    // public fileopener : FileOpener
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
    // this.openTermsDoc()
  }

  onclickContact() {
    // this.navCtrl.push("ContactadminPage");
    this.sendmessage()
  }

  onclickLogout()
  {
    this.localprovider.clearLocalstorage();
    this.navCtrl.setRoot('SigninPage')
  }

  onclickmessages()
  {
    this.navCtrl.push('MessagesPage');
  }

  onclickTermsButton()
  {
    this.openTermsDoc()
  }

  openTermsDoc()
  {
    var inappbrowser = this.inappbrowser.create(Constant.TERMS_URL, '_blank');
    inappbrowser.show()
  }

  sendmessage()
  {
    let email = {
      to: ["Info@countrysport.org"],
      cc: [],
      bcc: [],
      attachment: [],
      subject: "Report Content",
      body:""
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
