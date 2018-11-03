import { Constant } from './../../Constant/constant';
import { Component, Input, Output, EventEmitter } from '@angular/core';

/**
 * Generated class for the BanneritemComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'banneritem',
  templateUrl: 'banneritem.html'
})
export class BanneritemComponent {

  @Input() set info(info)
  {
    this.myinfo = info
  }

  @Output() clickurl : EventEmitter<any> = new EventEmitter()
  myinfo : any
  banner_url : any
  constructor() {
    console.log('Hello BanneritemComponent Component');
    this.banner_url = Constant.BANNER_URL;
  }


  onclickUrl(url)
  {
    this.clickurl.emit(url)
  }
}
