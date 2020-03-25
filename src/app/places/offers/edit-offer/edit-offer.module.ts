import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EditOfferPageRoutingModule } from './edit-offer-routing.module';
import { EditOfferPage } from './edit-offer.page';
import { LocationPickerModule } from 'src/app/location-picker/location-picker.module';
import { ImagePickerModule } from 'src/app/image-picker/image-picker.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditOfferPageRoutingModule,
    LocationPickerModule,
    ImagePickerModule

  ],
  declarations: [EditOfferPage]
})
export class EditOfferPageModule {}
