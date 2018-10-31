import { Component } from '@angular/core';

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

  text: string;

  constructor() {
    console.log('Hello ForumItemComponent Component');
    this.text = 'Hello World';
  }

}
