import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewforumPage } from './newforum';

@NgModule({
  declarations: [
    NewforumPage,
  ],
  imports: [
    IonicPageModule.forChild(NewforumPage),
    ComponentsModule
  ],
})
export class NewforumPageModule {}
