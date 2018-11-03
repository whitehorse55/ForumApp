import { ApiProvider } from './../../providers/api/api';
import { EventEmitter } from '@angular/core';
import { Component, Input, Output } from '@angular/core';

/**
 * Generated class for the ForumFavoriteItemComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'forum-favorite-item',
  templateUrl: 'forum-favorite-item.html'
})
export class ForumFavoriteItemComponent {

  text: string;

  @Input() set info(info) {
    this.myinfo = info
    console.log("this is info", info)
    this.like_num = this.getLikeNumber()
    this.unlike_num = this.getUnLikeNumber()
  }
  @Input() index : any

  @Output() clickLike : EventEmitter<any> = new EventEmitter()
  @Output() clickUnLike : EventEmitter<any> = new EventEmitter()

  like_num : any
  unlike_num : any
  myinfo : any

  constructor(public apiservice : ApiProvider) {
    console.log('Hello ForumFavoriteItemComponent Component');
    this.text = 'Hello World';
    this.like_num = 0
    this.unlike_num = 0
  }

  onclicklike(ind)
  {

    this.clickLike.emit(ind)
  }

  onclickUnlike(ind)
  {
    this.clickUnLike.emit(ind)
  }

  getLikeNumber()
  {
      this.apiservice.getLikeNumbers(this.myinfo['an_id']).then(res=>{
          this.like_num =  res['data'];
      }).catch(er=>{
        this.like_num = 0;
      })
  }

  getUnLikeNumber()
  {
      this.apiservice.getUnLikeNumbers(this.myinfo['an_id']).then(res=>{
          this.unlike_num =  res['data'];
      }).catch(er=>{
        this.unlike_num = 0;
      })
  }
}
