import { Component, OnInit, OnDestroy } from '@angular/core';
import { BookingsService } from '../services/bookings/bookings.service';
import { LoadingController, AlertController } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit, OnDestroy {
  bookings = []
  subs = new Subscription
  isLoading = false
  constructor(private bookingService: BookingsService, private loadingController: LoadingController, private alertController: AlertController) { }

  ngOnInit() {
    this.isLoading = true
    this.loadingController.create({
      message: 'Getting Your Bookings..'
    }).then(el => {
      el.present()
      this.bookingService.getBookings().pipe(map(el => {
        return el.map((e: any) => {
          return { key: e.key, ...e.payload.val() }
        })
      })).subscribe(data => {
        this.isLoading = false
        console.log(data)
        this.bookings = data
        el.dismiss()
      }, error => {
        el.dismiss()
        this.isLoading = false
      })
    })

    // this.subs = this.bookingService.bookingsUpdate.subscribe((data: any) => {
    //   this.bookings = data
    // })
  }

  cancelBooking(id) {
    console.log(id)
    this.alertController.create({
      header: 'Confirm!',
      message: 'Are You Sure You Wanna Cancel this booking??',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => { console.log('Booking Canceled.') }
        }, {
          text: 'Sure',
          handler: () => {
            this.loadingController.create({
              message: 'Cancelling Booking..',
            }).then(el => {
              el.present()


              this.bookingService.cancelBooking(id).then(() => {
                el.dismiss()
              })

            })
          }
        }
      ]
    }).then(el => {
      el.present()
    })



  }

  ngOnDestroy() {
    console.log('desc')
    // this.subs.unsubscribe()
  }

}
