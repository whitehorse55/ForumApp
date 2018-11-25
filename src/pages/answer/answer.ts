import { LoadingProvider } from './../../providers/loading/loading';
import { CustomalertProvider } from './../../providers/customalert/customalert';
import { ImageViewerController } from 'ionic-img-viewer';
import { ToastserviceProvider } from "./../../providers/toastservice/toastservice";
import { ApiProvider } from "./../../providers/api/api";
import { Component, ViewChild } from "@angular/core";
import { IonicPage, NavController, NavParams, ModalController, Platform, Content } from "ionic-angular";
import { Constant } from "../../Constant/constant";
import { Keyboard } from '@ionic-native/keyboard';
import { FileTransferObject, FileTransfer, FileUploadOptions } from '@ionic-native/file-transfer';
import { Customutils } from '../../Constant/customustils';


/**
 * Generated class for the AnswerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-answer",
  templateUrl: "answer.html"
})
export class AnswerPage {
  myinfo: any;
  myphoto: any;

  uploadphoto : any

  message: any;

  answerArray: any;
  keyboardHeight: any;

  @ViewChild('content')
  content: Content;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public apiservice: ApiProvider,
    public toastservice: ToastserviceProvider,
    public modalCtrl : ModalController,
    public _imageViewerCtrl : ImageViewerController,
    public keyboard : Keyboard,
    public platform : Platform,
    public alertservice : CustomalertProvider,
    public loadingprovider : LoadingProvider,
    public transfer : FileTransfer
  ) {
    this.myinfo = {};
    this.message = "";
    this.uploadphoto = ""

    this.platform.ready().then(() => {
      this.keyboardHeight = 55;
      // this.message_input.setFocus();
      this.keyboard.onKeyboardShow().subscribe(e => {
        console.log('this is keybaordsafasf eleefeef', e);
        this.keyboardHeight = e['keyboardHeight'] + 55;
        console.log('this is keybaordsafasf eleefeef', e);
        // this.content.resize();
        this.scrollToBottom();
      });

      this.keyboard.onKeyboardHide().subscribe(e => {
        this.keyboardHeight = 55;
        // this.content.resize();
        this.scrollToBottom();
      });
    });

  }


  onclickContent() {
    this.keyboard.hide();
    this.keyboardHeight = 55;
    this.scrollToBottom();
  }


  scrollToBottom() {
    setTimeout(() => {
        this.content.scrollToBottom();
        this.content.resize()
    }, 100);
  }

  ionViewDidLoad() {
    this.answerArray = [];
    this.myphoto = Constant.PHOTO_URL;
    this.myinfo = this.navParams.get("info");
    console.log("ionViewDidLoad", this.myinfo);
  }

  ionViewWillEnter() {
    this.getAnswersList();
  }

  onclickbackbutton() {
    this.navCtrl.popTo(this.navCtrl.getByIndex(1));
  }

  getAnswersList() {
    this.apiservice
      .getAnswersById(this.myinfo["fo_id"])
      .then(res => {
        let data = res['data']
        this.answerArray = data.reverse();
      })
      .catch(er => {});
  }


  onclickimagebutton(info)
  {
    console.log("this is photo info", info);
    this.uploadphoto = info
  }

  onclickSendButton() {
    this.loadingprovider.showLoadingView()
    if(this.message == "")
    {
        this.loadingprovider.removeLoadingView()
        this.alertservice.presentAlert("","Message is empty")
        this.onclickContent();
    }else{

      if(this.uploadphoto != '')
      {
        this.uploadImage(this.uploadphoto).then(res=>{
          this.sendDataToServer(res)
        }).catch(er=>{
          this.onclickContent();
          this.loadingprovider.removeLoadingView()
        })

      }else{
          this.sendDataToServer('')
      }

    }

  }

  sendDataToServer(photo)
  {
    this.apiservice
    .addNewAnswers(this.myinfo["fo_id"], this.message, photo)
    .then(res => {
      this.loadingprovider.removeLoadingView()
      this.message = "";
      this.toastservice.create(Constant.RESULT_SUCCESS, false, 2000);
      this.getAnswersList();
      this.onclickContent();
    })
    .catch(er => {
      this.loadingprovider.removeLoadingView()
      this.toastservice.create(Constant.RESULT_FAIL, false, 2000);
      this.onclickContent();
    });
  }

   // upload image
   uploadImage(info)
   {
     return new Promise((resolve, reject)=>{
       const fileTransfer: FileTransferObject = this.transfer.create();

       let filename = Customutils.createFileName()
       let options1: FileUploadOptions = {
          fileKey: 'file',
          fileName: filename,
          chunkedMode : false,
          mimeType : "multipart/form-data",
          params : {'fileName' : filename},
          headers: {}
       }


       fileTransfer.upload(info, Constant.UPLOAD_IMAGE, options1).then(data=>{
           console.log("this is result upload", data.response)
           resolve(filename)
       }).catch(err=>{
           reject(err)
           console.log("this is upload error", err)
       })
     })
   }


  onFocus() {
    console.log('this is focus event');
    this.keyboard.show();
  }

  onclicklikebutton(ind) {
    let info = this.answerArray[ind];
    this.apiservice
      .addLike(info["an_id"])
      .then(res => {
        // this.toastservice.create(res["msg"], false, 2000);
        this.getAnswersList();
      })
      .then(er => {
        this.toastservice.create(er, false, 2000);
      });
  }

  onclickunlikebutton(ind) {
    let info = this.answerArray[ind];
    this.apiservice
      .addUnLike(info["an_id"])
      .then(res => {
        // this.toastservice.create(res["msg"], false, 2000);
        this.getAnswersList();
      })
      .then(er => {
        this.toastservice.create(er, false, 2000);
      });
  }

  onclickdelete(ind)
  {
    this.loadingprovider.showLoadingView()
    let info = this.answerArray[ind];
    this.apiservice.deleteComment(info['an_id']).then(re=>{
        this.loadingprovider.removeLoadingView()
        this.answerArray.splice(ind,1)
    }).catch(er=>{
        this.loadingprovider.removeLoadingView()
    })

  }

  onclickphoto(ind)
  {
      let item_info = this.answerArray[ind]
      this.modalCtrl.create('DirectmessagePage', {info : item_info},{cssClass : 'inset-modal'}).present()
  }

  presentImage(myImage)
  {
    const imageViewer = this._imageViewerCtrl.create(myImage);
    imageViewer.present();
  }

}
