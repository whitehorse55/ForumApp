import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  onclickLoginButton()
  {
    this.navCtrl.push('SigninPage')
  }

  onclickRegisterButton()
  {
    this.navCtrl.push('SignupPage')
  }
}
