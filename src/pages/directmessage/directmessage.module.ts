import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DirectmessagePage } from './directmessage';

@NgModule({
  declarations: [
    DirectmessagePage,
  ],
  imports: [
    IonicPageModule.forChild(DirectmessagePage),
  ],
})
export class DirectmessagePageModule {}
