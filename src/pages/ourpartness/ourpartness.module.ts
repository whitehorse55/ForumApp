import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OurpartnessPage } from './ourpartness';

@NgModule({
  declarations: [
    OurpartnessPage,
  ],
  imports: [
    IonicPageModule.forChild(OurpartnessPage),
    ComponentsModule
  ],
})
export class OurpartnessPageModule {}
