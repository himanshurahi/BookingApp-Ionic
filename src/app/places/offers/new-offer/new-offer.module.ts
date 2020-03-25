import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewOfferPageRoutingModule } from './new-offer-routing.module';

import { NewOfferPage } from './new-offer.page';
import { LocationPickerComponent } from 'src/app/location-picker/location-picker.component';
import { ImagePickerComponent } from 'src/app/image-picker/image-picker.component';
import { LocationPickerModule } from 'src/app/location-picker/location-picker.module';
import { ImagePickerModule } from 'src/app/image-picker/image-picker.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LocationPickerModule,
    ImagePickerModule,
    NewOfferPageRoutingModule
  ],
  declarations: [NewOfferPage]
})
export class NewOfferPageModule {}
