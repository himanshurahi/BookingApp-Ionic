import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy, AfterViewChecked } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-map-modal',
  templateUrl: './map-modal.component.html',
  styleUrls: ['./map-modal.component.scss'],
})
export class MapModalComponent implements OnInit, AfterViewInit, OnDestroy {
  lat = 52.36737327537718
  lng = 4.896019621730741
  zoom = 10
  location;
  location_img;
  loading;
  myLocation;
  location_title;
  display = false

  @ViewChild("placesRef", { static: false }) placesRef: GooglePlaceDirective;
  constructor(private modalController: ModalController, private http: HttpClient) { }

  ngOnInit() {
    console.log(this.myLocation)
    setTimeout(() => {
      this.display = true
    }, 1000)

    if (this.myLocation) {
      this.lat = this.myLocation.lat
      this.lng = this.myLocation.lng
      this.zoom = 12
      this.location_title = this.myLocation.address
    }
    // this.loading = true
    // this.http.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.lat},${this.lng}&key=AIzaSyA8noLb6pKChcnmsi1jr1FsQNBbHSZiUK0`).subscribe((data: any) => {
    //   this.location = data.results[0].formatted_address
    //   this.loading = false
    //   this.getMapImage()
    // })
  }
  ngAfterViewInit() {

  }

  ngOnDestroy() {
  }

  ionViewLoaded() {
    console.log('viewLoaded')
  }



  CancelModal() {
    console.log('close')
    this.modalController.dismiss({ message: 'modal Closed' }, 'cancel')

  }
  onMapClick(event: any) {
    this.loading = true
    this.lat = event.coords.lat
    this.lng = event.coords.lng
    this.http.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.lat},${this.lng}&key=AIzaSyA8noLb6pKChcnmsi1jr1FsQNBbHSZiUK0`).subscribe((data: any) => {
      this.location = { lat: this.lat, lng: this.lng, address: data.results[0].formatted_address }
      this.loading = false
      this.getMapImage()
    })


  }
  handleAddressChange(address: Address) {
    this.lat = address.geometry.location.lat()
    this.lng = address.geometry.location.lng()
    this.zoom = 17
    this.location = { lat: this.lat, lng: this.lng, address: `${address.name}, ${address.formatted_address}` }
    this.getMapImage()
  }

  locationSelected() {
    console.log(this.location)
    this.modalController.dismiss({ location: this.location }, 'confirm')
    console.log(this.location)
    // this.modalController.dismiss({ location: this.location }, 'confirm')
  }


  getMapImage() {
    let updatedLocation;
    let url = `https://maps.googleapis.com/maps/api/staticmap?center=${this.lat}, ${this.lng}&zoom=13&size=500x300&maptype=roadmap
    &markers=color:red%7Clabel:C%7C${this.lat},${this.lng}
    &key=AIzaSyA8noLb6pKChcnmsi1jr1FsQNBbHSZiUK0`

    this.location.img = url

  }

}
