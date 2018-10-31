import { Component } from '@angular/core';

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

  constructor() {
    console.log('Hello ForumFavoriteItemComponent Component');
    this.text = 'Hello World';
  }

}
