import { LoadingProvider } from './../../providers/loading/loading';
import { ApiProvider } from './../../providers/api/api';
import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ModalController,
  PopoverController
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
  title = ""

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public apiservice : ApiProvider,
    public toastservice : ToastserviceProvider,
    public loadingprovider : LoadingProvider,
    public popCtrl : PopoverController
  ) {

  }

  ionViewDidLoad() {

    this.title = ""
    this.categoryinfo = this.navParams.get('info');
    this.title = this.categoryinfo['ca_name']
    this.categoryArray = []
    console.log("ionViewDidLoad", this.categoryinfo);
  }

  ionViewWillEnter(){
    this.getCategoryInfo()
  }
  getCategoryInfo()
  {
    this.loadingprovider.showLoadingView()
    this.apiservice.getForumByCategory(this.categoryinfo['ca_id']).then(res=>{
      console.log("resifo", res);
      if(res['status'] == Constant.RESULT_SUCCESS)
      {
        let data = res['data']
        this.categoryArray = data.reverse();
        this.loadingprovider.removeLoadingView()
        console.log("resifo", this.categoryArray);
      }else{
        this.loadingprovider.removeLoadingView()
        this.toastservice.create("Click the green button to start new conversation", false, 3000)
      }
    }).catch(er=>{
      this.loadingprovider.removeLoadingView()
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

  onclickdeletebutton(index)
  {
    let item_info = this.categoryArray[index]
    let popover = this.popCtrl.create('PopoverPage')
    popover.present();

    popover.onDidDismiss(res=>{
      console.log("this is dismiss");
      if(res['type'] == 'delete')
      {
          this.apiservice.deleteMyForum(item_info['fo_id']).then(res=>{
            this.categoryArray.splice(index, 1);
          }).catch(er=>{

          })
      }
    })

  }

  onclickfabbutton() {
    let profileModal = this.modalCtrl.create("NewforumPage", {
      ca_id: this.categoryinfo['ca_id']
    });
    profileModal.present();
    profileModal.onDidDismiss(res=>{
      this.getCategoryInfo()
    })
  }
}
