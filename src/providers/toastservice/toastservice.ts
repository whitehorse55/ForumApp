import { AlertController, Toast, ToastController } from "ionic-angular";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

/*
  Generated class for the ToastserviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ToastserviceProvider {
  constructor(
    public http: HttpClient,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController
  ) {
    console.log("Hello ToastserviceProvider Provider");
  }

  toast: Toast;

  create(message, ok = false, duration = 2000) {

    if (this.toast) {
      this.toast.dismiss();
    }

    this.toast = this.toastCtrl.create({
      message,
      duration: ok ? null : duration,
      position: "bottom",
      showCloseButton: ok,
      closeButtonText: "OK"
    });
    this.toast.present();
  }

  presentAlert(title: string, message: string) {
    const alert = this.alertCtrl.create({
      title,
      subTitle: message,
      buttons: [
        {
          text: "OK"
        }
      ]
    });

    return alert.present();
  }

  presentErrorAlert(message: string) {
    return this.presentAlert("An error has occurred.", message);
  }

  presentAlertWithCallback(title: string, message: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const confirm = this.alertCtrl.create({
        title,
        message,
        buttons: [
          {
            text: "Cancel",
            role: "cancel",
            handler: () => {
              confirm.dismiss().then(() => resolve(false));
              return false;
            }
          },
          {
            text: "Yes",
            handler: () => {
              confirm.dismiss().then(() => resolve(true));
              return false;
            }
          }
        ]
      });

      return confirm.present();
    });
  }
}
