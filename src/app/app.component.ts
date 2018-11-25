import { HomePage } from "./../pages/home/home";
import { Component } from "@angular/core";
import { Platform, Keyboard } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { LocalstorageProvider } from "../providers/localstorage/localstorage";
@Component({
  templateUrl: "app.html"
})
export class MyApp {
  rootPage: any;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public localprovider: LocalstorageProvider
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.hide();
      splashScreen.hide();

      // this.localprovider.clearLocalstorage()
      this.isLogin();
    });
  }

  isLogin() {
    let login_status = this.localprovider.getLoginStatus();
    if (login_status) {
      this.rootPage = "MainPage";
    } else {
      this.rootPage = HomePage;
    }
  }
}
