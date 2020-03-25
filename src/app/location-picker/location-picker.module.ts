import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LocationPickerComponent } from './location-picker.component';


@NgModule({
    declarations: [LocationPickerComponent],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,

    ],
    
    exports: [LocationPickerComponent]
})
export class LocationPickerModule { }
