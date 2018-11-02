import { EventEmitter } from '@angular/core';
import { Component, Input, Output } from '@angular/core';
import { Constant } from '../../Constant/constant';

/**
 * Generated class for the ForumItemComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'forum-item',
  templateUrl: 'forum-item.html'
})
export class ForumItemComponent {

  @Input() index : any
  @Input()
  set info(info)
  {
    console.log("this is info", info);
    this.myinfo = info
  }

  @Output() clickItem : EventEmitter<any> = new EventEmitter();

  myinfo: any;
  myphoto = Constant.PHOTO_URL

  constructor() {
    this.myphoto = Constant.PHOTO_URL
    console.log('Hello ForumItemComponent Component');

  }

  onclickanswerbutton(index)
  {
    this.clickItem.emit(index)
  }

}
