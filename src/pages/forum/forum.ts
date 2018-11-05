import { LoadingProvider } from './../../providers/loading/loading';
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { ApiProvider } from "../../providers/api/api";

/**
 * Generated class for the ForumPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-forum",
  templateUrl: "forum.html"
})
export class ForumPage {
  categoryList: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public apiprovider: ApiProvider,
    public loadingprovider : LoadingProvider
  ) {}

  // generateArray() {
  //   this.categoryList = [
  //     "DRIVEN GAME",
  //     "FISHING or ANGLING",
  //     "PIGEON SHOOTING",
  //     "CLAM SHOOTING",
  //     "GUNDOGS PART/FULLY FRIENDS",
  //     "GUNDOG PUPPLES",
  //     "HUNTING ACCESORIES",
  //     "SHOOT DAMS"
  //   ];
  // }

  ionViewDidLoad() {
    // this.generateArray()

  }

  ionViewWillEnter(){
    this.categoryList = []
    console.log("ionViewDidLoad ForumPage");
    this.loadingprovider.showLoadingView()
    this.apiprovider.getCategory().then(res=>{

        this.categoryList = res
        this.loadingprovider.removeLoadingView()
        console.log("this is category info", this.categoryList);
    }).catch(er=>{
      this.loadingprovider.removeLoadingView()
    })
  }

  onclickbackbutton(event) {
    this.navCtrl.pop();
  }

  onclickitems(i) {
    let categoryinfo = this.categoryList[i];
    console.log("this is category info", categoryinfo);
    this.navCtrl.push("ForumDetailPage", {info : categoryinfo})
  }
}
