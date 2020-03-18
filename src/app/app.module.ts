import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//pluging para corroborar la transferencia de archivos
import { FileTransfer } from '@ionic-native/file-transfer/ngx';

//camara
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
 
//geolocalizacion
import { Geolocation } from '@ionic-native/geolocation/ngx';

//importando el recurso de http
import { HttpClientModule } from '@angular/common/http';

//importando modulo del ionic storage 
import { IonicStorageModule } from '@ionic/storage' 

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicStorageModule.forRoot(), HttpClientModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    StatusBar,
    Geolocation,
    Camera,
    SplashScreen,
    FileTransfer,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
