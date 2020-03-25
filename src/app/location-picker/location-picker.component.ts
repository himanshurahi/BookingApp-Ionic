import { Component, OnInit, AfterViewInit, OnChanges, SimpleChange, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { ModalController, ActionSheetController, AlertController } from '@ionic/angular';
import { MapModalComponent } from './map-modal/map-modal/map-modal.component';
import { Subject } from 'rxjs';
import { Plugins, Capacitor } from '@capacitor/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-location-picker',
  templateUrl: './location-picker.component.html',
  styleUrls: ['./location-picker.component.scss'],
})
export class LocationPickerComponent implements OnInit {
  location: any;
  @Output() location_select = new EventEmitter()
  loading = false
  constructor(private modalController: ModalController, private actionSheetController: ActionSheetController, private alertController: AlertController, private http: HttpClient) { }

  ngOnInit() {
    console.log('location Picker Compo')

  }


  ionDidWillEnter() {
    console.log('view Enter')
  }

  onClick() {
    this.actionSheetController.create({
      header: 'Select Action',
      buttons: [{
        text: 'Auto Locate',
        icon: 'navigate-outline',
        handler: () => { this.LocateUser() }
      }, {
        text: 'Pick On Map',
        icon: 'map-outline',
        handler: () => { this.OpenMap() }
      },
      {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    }).then(el => {
      el.present()
    })


  }




  LocateUser() {
    this.loading = true
    console.log(Capacitor.isPluginAvailable('Geolocation'))
    Plugins.Geolocation.getCurrentPosition().then(pos => {
      this.getLocation(pos.coords)
      this.loading = false
    }).catch(err => {
      console.log(err)
      this.alertController.create({
        header: 'Error Occured',
        message: 'Unable to Fetch Location :(',
        buttons: ['OK']
      }).then(el => {
        el.present()
        this.loading = false
      })
    })

  }


  getLocation(coord) {
    console.log(coord)
    this.http.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${coord.latitude},${coord.longitude}&key=AIzaSyA8noLb6pKChcnmsi1jr1FsQNBbHSZiUK0`).subscribe((data: any) => {
      console.log(data)
      // this.location = { lat: this.lat, lng: this.lng, address: data.results[0].formatted_address }
      this.location = { lat: coord.latitude, lng: coord.longitude, address: data.results[0].formatted_address }
      this.getMapImage(coord)
      this.location_select.emit(this.location)
      console.log(this.location)
    })
  }

  getMapImage(data) {
    let url = `https://maps.googleapis.com/maps/api/staticmap?center=${data.latitude}, ${data.longitude}&zoom=13&size=500x300&maptype=roadmap
    &markers=color:red%7Clabel:C%7C${data.latitude},${data.longitude}
    &key=AIzaSyA8noLb6pKChcnmsi1jr1FsQNBbHSZiUK0`

    this.location.img = url

  }


  OpenMap() {
    this.modalController.create({
      component: MapModalComponent,
      componentProps: {
        // location_img1: this.location_img
      }
    }).then(el => {
      el.present()

      el.onDidDismiss().then((data: any) => {
        if (data.role == 'confirm') {
          console.log(data)
          this.location = data.data.location
          this.location_select.emit(data.data.location)

        }
      })
    })
  }

}
