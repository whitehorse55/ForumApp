import { ApiProvider } from './../../providers/api/api';
import { EventEmitter } from '@angular/core';
import { Component, Input, Output } from '@angular/core';
import { Constant } from '../../Constant/constant';
import { LocalstorageProvider } from '../../providers/localstorage/localstorage';

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
    this.getAnswers()
  }

  @Output() clickItem : EventEmitter<any> = new EventEmitter();
  @Output() clickDeleteButton : EventEmitter<any> = new EventEmitter();

  myinfo: any;
  myphoto = Constant.PHOTO_URL

  answer_num = 0;

  myid : any
  constructor(public apiservice : ApiProvider, public localprovider: LocalstorageProvider) {
    this.myphoto = Constant.PHOTO_URL
    this.myid = this.localprovider.getUserId()
    console.log('Hello ForumItemComponent Component', this.myid);

  }

  getAnswers()
  {
    this.apiservice.getAnswersById(this.myinfo['fo_id']).then(res=>{
      this.answer_num = res['data'].length
    }).catch(er=>{

    })
  }

  onclickanswerbutton(index)
  {
    this.clickItem.emit(index)
  }

  onclickdeletebutton()
  {
    this.clickDeleteButton.emit(this.index)
  }

}
