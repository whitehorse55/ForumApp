import { ImageViewerController } from 'ionic-img-viewer';
import { LocalstorageProvider } from './../../providers/localstorage/localstorage';
import { Constant } from './../../Constant/constant';
import { LoadingProvider } from './../../providers/loading/loading';
import { ApiProvider } from './../../providers/api/api';
import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ModalController
} from "ionic-angular";

/**
 * Generated class for the MessagedetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-messagedetail",
  templateUrl: "messagedetail.html"
})
export class MessagedetailPage {

  info : any
  messageList : any
  photourl : any
  myid : any

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public apiprovider :  ApiProvider,
    public loadingprovider : LoadingProvider,
    public localprovider : LocalstorageProvider,
    public _imageViewerCtrl: ImageViewerController
  ) {
    this.photourl = Constant.PHOTO_URL
    this.myid = this.localprovider.getUserId()
  }

  ionViewDidLoad() {
    this.info = this.navParams.get('info')
    this.messageList = []
    console.log("ionViewDidLoad MessagedetailPage", this.info);
  }

  ionViewWillEnter(){
    this.getUserMessages()
  }
  onclickbackbutton(info) {
    this.navCtrl.pop();
  }

  getUserMessages()
  {
    this.loadingprovider.showLoadingView()
    this.apiprovider.getMessageList(this.info['from']).then(res=>{
      this.loadingprovider.removeLoadingView()
      this.messageList = res['data'].reverse()
      console.log("sgasgdsaddg", this.messageList);

    }).catch(er=>{
      this.loadingprovider.removeLoadingView()
    })
  }

  onclickfabbutton() {
    let profileModal = this.modalCtrl.create("NewforumPage", {
      type : "message",
      info : this.info
    });
    profileModal.present();
    profileModal.onDidDismiss(res => {
      this.getUserMessages();
    });
  }

  deletemessage(item, index)
  {
    this.apiprovider.deleteMessage(item['id']).then(res=>{
      this.messageList.splice(index, 1)
    }).catch(er=>{

    })
  }

  presentImage(myImage) {
    const imageViewer = this._imageViewerCtrl.create(myImage);
    imageViewer.present();
  }
}
