import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';

/*
  Generated class for the CustomalertProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CustomalertProvider {

  constructor(public http: HttpClient, public alertCtrl : AlertController) {
    console.log('Hello CustomalertProvider Provider');
  }


  presentAlert(title: string, message: string) {

    return new Promise((resolve, reject)=>{
      const alert = this.alertCtrl.create(
        {
          title,
          subTitle: message,
          buttons: [
            {
              text: 'OK'
            }
          ]
        });

      alert.present().then(res=>{
          resolve(true)
      }).catch(er=>{
          reject(er)
      });
    })

  }

  presentErrorAlert(message: string) {
    return this.presentAlert('An error has occurred.', message);
  }

  presentAlertWithCallback(title: string, message: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const confirm = this.alertCtrl.create({
        title,
        message,
        buttons: [{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            confirm.dismiss().then(() => resolve(false));
            return false;
          }
        }, {
          text: 'Yes',
          handler: () => {
            confirm.dismiss().then(() => resolve(true));
            return false;
          }
        }]
      });

      return confirm.present();
    });
  }

}
