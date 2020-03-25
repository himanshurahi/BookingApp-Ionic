import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CreateBookingModalComponent } from './create-booking-modal/create-booking-modal.component';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire'
import { AngularFireDatabaseModule } from '@angular/fire/database'
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from "@agm/core"
import { MapModalComponent } from './location-picker/map-modal/map-modal/map-modal.component';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { FormsModule } from '@angular/forms';
import { AngularFireStorageModule, BUCKET } from '@angular/fire/storage';
import 'firebase/storage';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media/ngx';

@NgModule({
  declarations: [AppComponent, MapModalComponent],
  entryComponents: [MapModalComponent],
  imports: [BrowserModule, FormsModule, IonicModule.forRoot(), AppRoutingModule, AngularFireModule.initializeApp(environment.firebaseConfig), AngularFireDatabaseModule, HttpClientModule, AgmCoreModule.forRoot({ apiKey: 'AIzaSyA8noLb6pKChcnmsi1jr1FsQNBbHSZiUK0' }), GooglePlaceModule, AngularFireStorageModule],
  providers: [
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
