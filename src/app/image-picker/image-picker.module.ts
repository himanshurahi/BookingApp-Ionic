import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ImagePickerComponent } from './image-picker.component';


@NgModule({
    declarations: [ImagePickerComponent],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,

    ],
    
  exports: [ImagePickerComponent]
})
export class ImagePickerModule { }
