import { InAppBrowser } from '@ionic-native/in-app-browser';
import { LoadingProvider } from './../../providers/loading/loading';
import { ApiProvider } from "./../../providers/api/api";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

/**
 * Generated class for the OurpartnessPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-ourpartness",
  templateUrl: "ourpartness.html"
})
export class OurpartnessPage {

  banner_array : any
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public apiservice: ApiProvider,
    public loadingprovider:LoadingProvider,
    public inappbrowser : InAppBrowser
  ) {}

  ionViewDidLoad() {
    this.banner_array = []
    console.log("ionViewDidLoad OurpartnessPage");
  }

  ionViewWillEnter(){
    this.getBannerInfo()
  }

  getBannerInfo()
  {
    this.loadingprovider.showLoadingView()
    this.apiservice.getBannerInfo().then(res=>{
        this.loadingprovider.removeLoadingView()
        this.banner_array = res['data'];
    }).catch(er=>{
      this.loadingprovider.removeLoadingView()
    })
  }

  onclickbackbutton(event) {
    this.navCtrl.pop();
  }

  onclickurl(url)
  {
    var inappbrowser = this.inappbrowser.create(url,'_blank')
    inappbrowser.show()
  }
}
