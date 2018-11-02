import { ApiProvider } from './../../providers/api/api';
import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ModalController
} from "ionic-angular";
import { ToastserviceProvider } from '../../providers/toastservice/toastservice';
import { Constant } from '../../Constant/constant';

/**
 * Generated class for the ForumDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-forum-detail",
  templateUrl: "forum-detail.html"
})
export class ForumDetailPage {

  categoryinfo  = "1"
  categoryArray = []

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public apiservice : ApiProvider,
    public toastservice : ToastserviceProvider
  ) {

  }

  ionViewDidLoad() {

    this.categoryinfo = this.navParams.get('info');
    this.categoryArray = []
    console.log("ionViewDidLoad", this.categoryinfo);
  }

  ionViewWillEnter(){
    this.getCategoryInfo()
  }
  getCategoryInfo()
  {
    this.apiservice.getForumByCategory(this.categoryinfo['ca_id']).then(res=>{
      console.log("resifo", res);
      if(res['status'] == Constant.RESULT_SUCCESS)
      {
        this.categoryArray = res['data'];
        console.log("resifo", this.categoryArray);
      }else{
        this.toastservice.create(res['msg'], false, 2000)
      }
    }).catch(er=>{
      this.toastservice.create(er, false, 2000)
    })
  }

  onclickbackbutton(info) {
    this.navCtrl.pop();
  }

  onclickitem(index)
  {
    let item_info = this.categoryArray[index]
    console.log("this is t", item_info)
    this.navCtrl.push('AnswerPage',{info : item_info});
  }

  onclickfabbutton() {
    let profileModal = this.modalCtrl.create("NewforumPage", {
      userId: 8675309
    });
    profileModal.present();
  }
}
