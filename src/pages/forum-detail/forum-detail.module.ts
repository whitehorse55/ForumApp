import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ForumDetailPage } from './forum-detail';

@NgModule({
  declarations: [
    ForumDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ForumDetailPage),
    ComponentsModule
  ],
})
export class ForumDetailPageModule {}
