import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HouserulePage } from './houserule';

@NgModule({
  declarations: [
    HouserulePage,
  ],
  imports: [
    IonicPageModule.forChild(HouserulePage),
    ComponentsModule
  ],
})
export class HouserulePageModule {}
