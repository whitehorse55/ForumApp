
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ApiProvider } from '../providers/api/api';
import { AuthProvider } from '../providers/auth/auth';
import { CustomalertProvider } from '../providers/customalert/customalert';
import { HttpModule } from '@angular/http';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ToastserviceProvider } from '../providers/toastservice/toastservice';
import { HTTP } from '@ionic-native/http';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiProvider,
    AuthProvider,
    CustomalertProvider,
    Camera,
    ToastserviceProvider,
    HTTP,
    File,
    FilePath,
    FileTransfer,
    FileTransferObject
  ]
})
export class AppModule {}
