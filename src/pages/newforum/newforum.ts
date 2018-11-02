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
  categoryList: any;
  photos : any;

  category : any;
  title : any;
  question : any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public apiprovider: ApiProvider,
    public transfer : FileTransfer,
    public toastservice : ToastserviceProvider
  ) {
    this.categoryList = []
    this.photos = []
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad NewforumPage");
    this.title = ""
    this.category = ""
    this.question = ""
    this.categoryList = []
    this.photos = []
    this.getCategoryList()
  }

  onclickbackbutton() {
    this.viewCtrl.dismiss();
  }

  getCategoryList() {
    this.apiprovider
      .getCategory()
      .then(res => {
        this.categoryList = res;
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
        this.uploadPhoto(this.photos[0]).then(res=>{
            this.addForum(res)
        }).catch(er=>{
            this.toastservice.create(er, true, 3000)
        })
      }else{
        this.addForum("")
      }
  }

  // upload image
  uploadPhoto(info)
  {
    return new Promise((resolve, reject)=>{
      const fileTransfer: FileTransferObject = this.transfer.create();

      let options1: FileUploadOptions = {
         fileKey: 'photo_url',
         fileName: Customutils.createFileName(),
         headers: {}
      }


      fileTransfer.upload(info, Constant.UPLOAD_IMAGE, options1).then(data=>{
          console.log("this is result upload", data.response)
          resolve(data.response['profile'])
      }).catch(err=>{
          reject(err)
          console.log("this is upload error", err)
      })
    })
  }



  addForum(photo)
  {
      let credential = {"title": this.title, content : this.question, category : this.category, photo : photo}

      this.apiprovider.addForum(credential).then(res=>{
          this.viewCtrl.dismiss();
      }).catch(er=>{

      })
  }


}
