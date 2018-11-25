import { Component, Input, Output, EventEmitter } from '@angular/core';

/**
 * Generated class for the CustombarComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'custombar',
  templateUrl: 'custombar.html'
})
export class CustombarComponent {


  @Input() title : string
  @Input() type : string
  @Output() onclickback : EventEmitter<any> = new EventEmitter()

  constructor() {
    console.log('Hello CustombarComponent Component')
  }

  onclickbackbutton()
  {
    this.onclickback.emit('back')
  }

}
