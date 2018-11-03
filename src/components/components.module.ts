import { IonicModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { CustombarComponent } from './custombar/custombar';
import { ForumItemComponent } from './forum-item/forum-item';
import { ForumFavoriteItemComponent } from './forum-favorite-item/forum-favorite-item';
import { CustomcameraComponent } from './customcamera/customcamera';
import { BanneritemComponent } from './banneritem/banneritem';
@NgModule({
	declarations: [CustombarComponent,
    ForumItemComponent,
    ForumFavoriteItemComponent,
    CustomcameraComponent,
    BanneritemComponent],
	imports: [IonicModule],
  exports: [CustombarComponent,
    ForumItemComponent,
    ForumFavoriteItemComponent,
    CustomcameraComponent,
    BanneritemComponent]
})
export class ComponentsModule {


}
