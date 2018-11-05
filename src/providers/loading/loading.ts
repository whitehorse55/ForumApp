import { Loading, LoadingController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the LoadingProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoadingProvider {

  loading : Loading
  constructor(public http: HttpClient, public loadingCtrl : LoadingController) {
    console.log('Hello LoadingProvider Provider');
  }

  showLoadingView()
  {
    return new Promise((resolve, reject)=>{
      this.loading = this.loadingCtrl.create({
        content: 'Please wait...',
        dismissOnPageChange: true
      });
      this.loading.present().then(res=>{
        resolve(res)
      }).catch(r=>{
        reject(r)
      });

    })
  }

  removeLoadingView()
  {
    return new Promise((resolve, reject)=>{
      if(this.loading)
      {
        this.loading.dismiss().then(res=>{
          resolve(true)
        }).catch(er=>{
          reject(er)
        })
      }else{
        reject(false)
      }


    })
  }

}
