import { Component, Input, Output, EventEmitter } from "@angular/core";
import { ActionSheetController, Loading, Platform } from "ionic-angular";
import { Camera, CameraOptions } from "@ionic-native/camera";
import { FilePath } from "@ionic-native/file-path";
import { File } from "@ionic-native/file";

/**
 * Generated class for the CustomcameraComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */

declare var cordova: any;

@Component({
  selector: "customcamera",
  templateUrl: "customcamera.html"
})
export class CustomcameraComponent {
  @Input()
  title: string;

  @Input()
  type : string

  @Output()
  onclickButton: EventEmitter<any> = new EventEmitter();

  public base64Image: string;

  lastImage: string = null;
  loading: Loading;

  photos: any;

  constructor(
    public actionSheetCtrl: ActionSheetController,
    public camera: Camera,
    public platform: Platform,
    public file : File,
    public filepath : FilePath
  ) {
    console.log("Hello CustomcameraComponent Component");
    this.photos = [];
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
      quality: 70, // picture quality
      // targetHeight: 700,
      // targetWidth: 500,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation : true,
      allowEdit : true,
      sourceType: sourceType
    };
    this.camera.getPicture(options).then(
      imageData => {
        this.base64Image = "data:image/jpeg;base64," + imageData;
        this.onclickButton.emit(this.base64Image)
      },
      err => {
        console.log(err);
      }
    );
  }

  public takePicture(sourceType) {
    // Create options for the Camera Dialog
    var options = {
      quality: 50,
      // targetHeight : 500,
      // targetWidth : 500,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    // Get the data of an image
    this.camera.getPicture(options).then(
      imagePath => {
        // Special handling for Android library
        if (
          this.platform.is("android") &&
          sourceType === this.camera.PictureSourceType.PHOTOLIBRARY
        ) {
          this.filepath.resolveNativePath(imagePath).then(filePath => {
            this.base64Image = "data:image/jpeg;base64," + imagePath;
            alert(this.base64Image);
            this.photos.push(this.base64Image);
            this.photos.reverse();

            let correctPath = filePath.substr(0, filePath.lastIndexOf("/") + 1);
            let currentName = imagePath.substring(
              imagePath.lastIndexOf("/") + 1,
              imagePath.lastIndexOf("?")
            );
            this.copyFileToLocalDir(
              correctPath,
              currentName,
              this.createFileName()
            );
          });
        } else {
          var currentName = imagePath.substr(imagePath.lastIndexOf("/") + 1);
          var correctPath = imagePath.substr(0, imagePath.lastIndexOf("/") + 1);
          this.copyFileToLocalDir(
            correctPath,
            currentName,
            this.createFileName()
          );
        }
      },
      err => {
        // this.presentToast("Error while selecting image.");
      }
    );
  }

  private createFileName() {
    var d = new Date(),
      n = d.getTime(),
      newFileName = n + ".jpg";
    return newFileName;
  }

  // Copy the image to a local folder
  private copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file
      .copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName)
      .then(
        success => {
          this.lastImage = newFileName;
          alert(this.lastImage);
          console.log("this is lastimage", this.lastImage);
        },
        error => {
          // this.presentToast("Error while storing file.");
        }
      );
  }

  // private presentToast(text) {
  //   let toast = this.toastCtrl.create({
  //     message: text,
  //     duration: 3000,
  //     position: "top"
  //   });
  //   toast.present();
  // }

  // Always get the accurate path to your apps folder
  public pathForImage(img) {
    if (img === null) {
      return "";
    } else {
      return cordova.file.dataDirectory + img;
    }
  }

  getVideo()
  {

  }
}
