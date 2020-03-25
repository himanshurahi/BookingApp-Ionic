import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchPageRoutingModule } from './search-routing.module';

import { SearchPage } from './search.page';
import { RouterModule, Routes, Router } from '@angular/router';
import { AgmCoreModule } from '@agm/core';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";










@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchPageRoutingModule,
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyA8noLb6pKChcnmsi1jr1FsQNBbHSZiUK0' , language : 'en'}),
    GooglePlaceModule,


   
   
  ],
  declarations: [SearchPage],
})
export class SearchPageModule {}
