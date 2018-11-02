import { Component, Input } from '@angular/core';

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

  @Input() info : any
  @Input() index : any

  constructor() {
    console.log('Hello ForumFavoriteItemComponent Component');
    this.text = 'Hello World';
  }

  onclicklike(ind)
  {

  }

  onclickUnlike(ind)
  {

  }
}
