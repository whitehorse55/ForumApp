import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContactadminPage } from './contactadmin';

@NgModule({
  declarations: [
    ContactadminPage,
  ],
  imports: [
    IonicPageModule.forChild(ContactadminPage),
    ComponentsModule
  ],
})
export class ContactadminPageModule {}
