import { IonicModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { CustombarComponent } from './custombar/custombar';
import { ForumItemComponent } from './forum-item/forum-item';
import { ForumFavoriteItemComponent } from './forum-favorite-item/forum-favorite-item';
@NgModule({
	declarations: [CustombarComponent,
    ForumItemComponent,
    ForumFavoriteItemComponent],
	imports: [IonicModule],
  exports: [CustombarComponent,
    ForumItemComponent,
    ForumFavoriteItemComponent]
})
export class ComponentsModule {


}
