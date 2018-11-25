import { Constant } from "./../../Constant/constant";
import { ToastserviceProvider } from "./../../providers/toastservice/toastservice";
import { LocalstorageProvider } from "./../../providers/localstorage/localstorage";
import { ApiProvider } from "./../../providers/api/api";
import { EventEmitter } from "@angular/core";
import { Component, Input, Output } from "@angular/core";
import { ImageViewerController } from "ionic-img-viewer";

/**
 * Generated class for the ForumFavoriteItemComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "forum-favorite-item",
  templateUrl: "forum-favorite-item.html"
})
export class ForumFavoriteItemComponent {
  text: string;

  @Input()
  set info(info) {
    this.myinfo = info;
    console.log("this is info", info);
    this.like_num = this.getLikeNumber();
    this.unlike_num = this.getUnLikeNumber();
  }
  @Input() index: any;

  @Output() clickLike: EventEmitter<any> = new EventEmitter();
  @Output() clickUnLike: EventEmitter<any> = new EventEmitter();
  @Output() clickPhoto: EventEmitter<any> = new EventEmitter();
  @Output() clickDelete: EventEmitter<any> = new EventEmitter();

  like_num: any;
  unlike_num: any;
  myinfo: any;
  myphoto = Constant.PHOTO_URL;
  myid : any
  constructor(
    public apiservice: ApiProvider,
    public localprovider: LocalstorageProvider,
    public toastservice: ToastserviceProvider,
    public _imageViewerCtrl : ImageViewerController

  ) {
    console.log("Hello ForumFavoriteItemComponent Component");
    this.text = "Hello World";
    this.like_num = 0;
    this.unlike_num = 0;
    this.myid = localprovider.getUserId()
  }

  onclicklike(ind) {
    this.clickLike.emit(ind);
  }

  onclickUnlike(ind) {
    this.clickUnLike.emit(ind);
  }

  getLikeNumber() {
    this.apiservice
      .getLikeNumbers(this.myinfo["an_id"])
      .then(res => {
        this.like_num = res["data"];
      })
      .catch(er => {
        this.like_num = 0;
      });
  }

  getUnLikeNumber() {
    this.apiservice
      .getUnLikeNumbers(this.myinfo["an_id"])
      .then(res => {
        this.unlike_num = res["data"];
      })
      .catch(er => {
        this.unlike_num = 0;
      });
  }

  onclickuserphoto(ind) {
    let myid = this.localprovider.getUserId();
    this.clickPhoto.emit(ind);
    // if(myid == this.myinfo.userId)
    // {
    //   this.toastservice.presentAlert("","can't send message yourself")
    // }else{
    //   this.clickPhoto.emit(ind)
    // }
  }

  onclickdeletebutton()
  {
    this.clickDelete.emit(this.index)
  }

  presentImage(myImage) {
    // console.log("clicked iamgeage", this.myinfo['photo'])
    // let url = Constant.PHOTO_URL + this.myinfo['photo']
    // this.clickForumImage.emit(url)
    // this.isImage = true
    const imageViewer = this._imageViewerCtrl.create(myImage);
    imageViewer.present();

    // setTimeout(() => imageViewer.dismiss(), 1000);
    // imageViewer.onDidDismiss(() => alert('Viewer dismissed'));
  }
}
