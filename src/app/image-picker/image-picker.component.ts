import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Plugins, CameraResultType, CameraSource, Capacitor } from '@capacitor/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.scss'],
})
export class ImagePickerComponent implements OnInit {
  @Output() selectedImage = new EventEmitter()
  usePicker = false
  uploader;
  @Output() selectedImageFile = new EventEmitter()

  constructor(private alertController: AlertController) { }
  @ViewChild('file', { static: false }) file: ElementRef
  ngOnInit() {
    if (Capacitor.isNative) {
      this.usePicker = false
    } else {
      this.usePicker = true
    }

  }

  onSelectImage() {
    if (Capacitor.isNative) {
      Plugins.Camera.getPhoto({
        quality: 30,
        correctOrientation: true,
        resultType: CameraResultType.DataUrl,
      }).then((img: any) => {
        console.log(img)
        this.selectedImage.emit(img.dataUrl)
        const file = this.dataURLtoFile(img.dataUrl, `${new Date().getTime()}.${img.format}`)
        this.selectedImageFile.emit(file)
        console.log(file)
      }).catch(err => {
        console.log(err)
      })
    } else {
      this.file.nativeElement.click()
    }
  }


  dataURLtoFile(dataurl, filename) {

    var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }

  GalImage(file: any) {
    let image = file.target.files[0]
    const allowedtype = ['image/png', 'image/jpeg']
    if (image && allowedtype.find(type => type == image.type)) {
      const reader = new FileReader()
      reader.onload = (e) => {
        this.selectedImage.emit(reader.result)
      }
      reader.readAsDataURL(image)
      this.selectedImageFile.emit(image)
    } else {
      console.log('Image Error')
      this.alertController.create({
        header: 'Error',
        message: 'Invalid Image',
        buttons: ['OK']
      }).then(el => {
        el.present()
      })
    }
  }




}
