import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController, ModalController, ActionSheetController, LoadingController } from '@ionic/angular';
import { CreateBookingModalComponent } from 'src/app/create-booking-modal/create-booking-modal.component';
import { PlacesService } from 'src/app/services/places/places.service';
import { BookingsService } from 'src/app/services/bookings/bookings.service';
import { map } from 'rxjs/operators';
import { MapModalComponent } from 'src/app/location-picker/map-modal/map-modal/map-modal.component';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit {
  place;
  constructor(private router: Router, private route: ActivatedRoute, private NavController: NavController, private modalCtl: ModalController, private placeService: PlacesService, private actionSheetController: ActionSheetController, private bookingService: BookingsService, private loadingController: LoadingController) { }

  ngOnInit() {
    this.route.paramMap.subscribe((data: any) => {
      this.loadingController.create({
        message: 'Please Wait...'
      }).then(el => {
        el.present()
        this.getPlaceById(data.params.placeId).subscribe(data => {
          console.log(data)
          this.place = data
          el.dismiss()
        }, error => {
          el.dismiss()
          this.router.navigate(['places/search'])
        })

      })

    })
  }


  getPlaceById(id) {
    return this.placeService.findPlaceById(id).pipe(map((el: any) => {
      return {
        a_from: new Date(el.payload.val().a_from),
        a_to: new Date(el.payload.val().a_to),
        id: el.payload.val().id,
        title: el.payload.val().title,
        price: el.payload.val().price,
        description: el.payload.val().description,
        imgUrl: el.payload.val().imgUrl,
        location: el.payload.val().location
      }
    }))
  }

  onBookPlace() {
    console.log('booked')
    this.actionSheetController.create({
      header: 'Choose An Action',
      buttons: [
        {
          text: 'Select Date',
          handler: () => { this.openBookingModal('select') }
        },
        {
          text: 'Random Date',
          handler: () => { this.openBookingModal('random') }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    }).then(el => {
      el.present()
    })
    // this.router.navigate(['/places/search'])
    // this.NavController.navigateBack('places/search')
  }
  openBookingModal(mode) {
    console.log(this.place)
    this.modalCtl.create({
      component: CreateBookingModalComponent,
      componentProps: { selectedPlace: this.place, name: 'himanshurahi', selectedMode: mode },
      backdropDismiss: false
    }).then(m => {
      m.present();
      m.onDidDismiss().then(res => {
        console.log(res)
        if (res.role == 'confirm') {
          this.loadingController.create(
            {
              message: 'Please wait...',
            }
          ).then(el => {
            el.present()
            this.bookingService.addBookings(res.data.bookingData).then(() => {
              el.dismiss()
              this.router.navigate(['/bookings'])
            })

          })
        }
        // this.router.navigate(['/bookings'])
      })
    })
  }

  openMapModal(location) {
    this.modalCtl.create({
      component: MapModalComponent,
      componentProps: { myLocation: location }
    }).then(el => {
      el.present()
    })
  }

}

