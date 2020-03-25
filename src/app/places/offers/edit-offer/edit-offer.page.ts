import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlacesService } from 'src/app/services/places/places.service';
import { NgForm } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit, OnDestroy {
  place;
  selectedImg;
  selectedImgFile;
  gettingPlace : Subscription
  constructor(private route: ActivatedRoute, private placeService: PlacesService, private router: Router, private LoadingController: LoadingController) { }

  ngOnInit() {
    this.route.paramMap.subscribe((data: any) => {
      console.log(data)
      this.LoadingController.create({
        message: 'Please Wait..'
      }).then(el => {
        el.present()
       this.gettingPlace =  this.getPlaceById(data.params.id).subscribe(data => {
          console.log(data)
          this.place = data
          el.dismiss()
        }, error => {
          this.router.navigate(['/places/offers'])
          el.dismiss()
        })
      })
    })
  }

  getLocation(event) {
    console.log(event)
    this.place.location = event
  }
  selectedImage(event) {
    this.selectedImg = event
  }
  selectedImageFile(event) {
    // this.place.imgUrl = event
    this.selectedImgFile = event
  }

  getPlaceById(id) {
    return this.placeService.findPlaceById(id).pipe(map((el: any) => {
      return {
        key: el.key,
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

  onEditOffer(form: NgForm) {
    this.LoadingController.create({
      message: 'Updating...',
    }).then(el => {
      el.present()
      this.placeService.updateOffer({ key: this.place.key, id: this.place.id, location: this.place.location, ...form.value }, this.selectedImgFile)
      this.placeService.placesUpdated.subscribe(() => {
        el.dismiss()
        form.reset()
        this.router.navigate(['/places/offers'])
      })
    })
  }

  ngOnDestroy(){
    this.gettingPlace.unsubscribe()
  }

}
