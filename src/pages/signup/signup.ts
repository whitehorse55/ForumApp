import { LoadingProvider } from './../../providers/loading/loading';
import { Customutils } from './../../Constant/customustils';
import { FileTransferObject, FileTransfer, FileUploadOptions } from '@ionic-native/file-transfer';
import { CameraOptions, Camera } from '@ionic-native/camera';
import { ApiProvider } from './../../providers/api/api';
import { AuthProvider } from "./../../providers/auth/auth";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, ActionSheetController } from "ionic-angular";
import { Constant } from '../../Constant/constant';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-signup",
  templateUrl: "signup.html"
})
export class SignupPage {
  base64Image = "";

  credential: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public authprovider: AuthProvider,
    public apiprovider : ApiProvider,
    public actionSheetCtrl : ActionSheetController,
    public camera : Camera,
    public transfer : FileTransfer,
    public loadingService : LoadingProvider
  ) {
    this.base64Image = "";
    this.credential = {
      name: "",
      email: "",
      location: "",
      password: "",
      confirmpassword : ""
    };
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad SignupPage");
  }


  onclickSignup() {

      this.loadingService.showLoadingView()
      this.authprovider.signup(this.credential, this.base64Image).then(res=>{
        if(this.base64Image != '')
        {
            this.doSignup('')
        }else{
          this.uploadPhoto(this.base64Image).then(res=>{
            this.doSignup(res)
          }).catch(er=>{
            this.loadingService.removeLoadingView()
          })
        }
      }).catch(er=>{
          this.loadingService.removeLoadingView()
          console.log("this is eror", er)
      })
  }

  doSignup(res)
  {
    this.apiprovider.userSignup(this.credential, res).then(res=>{
        this.navCtrl.pop()
        this.loadingService.removeLoadingView()
    }).catch(er=>{
      this.loadingService.removeLoadingView()
      console.log("this is eror===>", er)
    })
  }


    ////////////////////////////show take photo actionsheet///////////////////////////////////////////////
    public presentActionSheet() {
      let actionSheet = this.actionSheetCtrl.create({
        title: "Select Image Source",
        buttons: [
          {
            text: "Load from Library",
            handler: () => {
              this.takePhoto(this.camera.PictureSourceType.PHOTOLIBRARY);
            }
          },
          {
            text: "Use Camera",
            handler: () => {
              this.takePhoto(this.camera.PictureSourceType.CAMERA);
            }
          },
          {
            text: "Cancel",
            role: "cancel"
          }
        ]
      });
      actionSheet.present();
    }

    //////////////////////////////////////////////////////////////////////////////////
    // function : take photo from galary and camera
    // sourcetype : camera or galary

    private takePhoto(sourceType) {
      const options: CameraOptions = {
        quality: 100, // picture quality
        targetHeight: 300,
        targetWidth: 200,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        sourceType: sourceType
      };
      this.camera.getPicture(options).then(
        imageData => {
          this.base64Image = "data:image/jpeg;base64," + imageData;
        },
        err => {
          console.log(err);
        }
      );
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

}
