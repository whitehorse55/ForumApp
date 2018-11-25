import { LoadingProvider } from './../../providers/loading/loading';
import { ToastserviceProvider } from './../../providers/toastservice/toastservice';
import { FileTransferObject, FileTransfer, FileUploadOptions } from '@ionic-native/file-transfer';
import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController
} from "ionic-angular";
import { ApiProvider } from "../../providers/api/api";
import { Customutils } from '../../Constant/customustils';
import { Constant } from '../../Constant/constant';
import { LocalstorageProvider } from '../../providers/localstorage/localstorage';

/**
 * Generated class for the NewforumPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-newforum",
  templateUrl: "newforum.html"
})
export class NewforumPage {
  // categoryList: any;
  photos : any;

  category : any;
  title : any;
  question : any;

  type : any
  messsageinfo : any

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public apiprovider: ApiProvider,
    public transfer : FileTransfer,
    public toastservice : ToastserviceProvider,
    public loadingprovider: LoadingProvider,
    public localprovider : LocalstorageProvider
  ) {
    // this.categoryList = []
    this.photos = []
  }

  ionViewDidLoad() {

    this.title = ""
    this.question = ""
    // this.categoryList = []
    this.photos = []
    this.type = this.navParams.get('type')
    if(this.type == 'forum')
    {
      this.category = this.navParams.get('ca_id')
    }else{
      this.messsageinfo = this.navParams.get('info')
      console.log("ionViewDidLoad NewforumPage", this.messsageinfo);
    }


    // this.getCategoryList()

  }

  onclickbackbutton() {
    this.viewCtrl.dismiss();
  }

  getCategoryList() {
    this.apiprovider
      .getCategory()
      .then(res => {
        // this.categoryList = res;
      })
      .catch(er => {});
  }

  presentActionSheet()
  {

  }

  deletePhoto(id)
  {

  }

  getPhoto(imageinfo)
  {
      console.log("imageinfo", imageinfo)
      this.photos = []
      this.photos.push(imageinfo)
  }

  // upload image
  onclickSendButton()
  {
      // var  i = 0
      // this.photos.forEach(element => {
      //     i++
      //     this.uploadPhoto(element)
      //     if( i == this.photos.length)
      //     {
      //       console.log("upload finished")
      //     }
      // });

      if(this.photos.length > 0)
      {
        this.loadingprovider.showLoadingView()
        this.uploadPhoto(this.photos[0]).then(res=>{
            this.addForum(res)
        }).catch(er=>{
            this.loadingprovider.removeLoadingView()
            this.toastservice.create(er, true, 3000)
        })
      }else{
        this.loadingprovider.showLoadingView()
        this.addForum("")
      }
  }

  // upload image
  uploadPhoto(info)
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



  addForum(photo)
  {

    if(this.type == 'forum')
    {
      let credential = {"title": this.title, content : this.question, category : this.category, photo : photo}
      this.apiprovider.addForum(credential).then(res=>{
          this.loadingprovider.removeLoadingView()
          this.viewCtrl.dismiss();
      }).catch(er=>{
          this.loadingprovider.removeLoadingView()
      })

    }else{
      let myid = this.localprovider.getUserId()
      this.apiprovider.sendMessasge(this.question, this.messsageinfo['from'],myid, photo).then(res=>{
        this.loadingprovider.removeLoadingView()
        this.viewCtrl.dismiss();
      }).catch(er=>{
        this.loadingprovider.removeLoadingView()
      })
    }

  }


}
