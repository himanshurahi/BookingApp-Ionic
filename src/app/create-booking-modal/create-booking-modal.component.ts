import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-booking-modal',
  templateUrl: './create-booking-modal.component.html',
  styleUrls: ['./create-booking-modal.component.scss'],
})
export class CreateBookingModalComponent implements OnInit {
  selectedPlace: any;
  name;
  currentDate
  selectedMode;
  startDate;
  endDate;
  constructor(private modalController: ModalController, private loadingController: LoadingController) { }
  @ViewChild('f', { static: true }) form
  ngOnInit() {
    this.currentDate = new Date().toISOString()
    console.log(this.selectedPlace)

    if (this.selectedMode == 'random') {
      this.startDate = this.getRandomDate(this.selectedPlace.a_from, this.selectedPlace.a_to)
      this.endDate = this.getRandomDate(this.startDate, this.selectedPlace.a_to)
    } else {
      this.startDate = this.selectedPlace.a_from
      this.endDate = this.selectedPlace.a_to
    }
  }

  onCancel() {
    this.modalController.dismiss({ message: 'modal closed' }, 'cancel');
  }

  onBookPlace() {
    this.modalController.dismiss({ message: 'this is dummy msg' }, 'confirm')
  }
  onSubmit(form: NgForm) {
    // console.log(new Date(form.value.available_from))
    if (!form.valid || this.DateValid()) {
      return console.log('Booking Failed')
    }

    this.modalController.dismiss({ bookingData: { placeId: this.selectedPlace.id, placeTitle: this.selectedPlace.title, ...form.value } }, 'confirm')
  }

  getRandomDate(from, to) {
    from = from.getTime();
    to = to.getTime();
    return new Date(from + Math.random() * (to - from));
  }

  // getEndDate(from, to) {
  //   from = from.getTime();
  //   to = to.getTime();
  //   return new Date(from + Math.random() * (to - from));
  // }

  AddOneDay(date) {

    // console.log(new Date(date).toLocaleDateString())
    // // console.log(this.selectedPlace.a_to)

    if (date.toLocaleDateString() == this.selectedPlace.a_to.toLocaleDateString()) {
      return date
    }


    return new Date(date.getTime() + 86400000)
  }

  DateChanged(event) {
    this.startDate = new Date(event.target.value)
    // console.log(new Date(event.target.value).getTime())
    // console.log(this.selectedPlace.a_to.getTime())

  }

  DateValid() {
    const startDate = new Date(this.form.value.a_from)
    const endDate = new Date(this.form.value.a_to)
    return startDate > endDate
  }
}
