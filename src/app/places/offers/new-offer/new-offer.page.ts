import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PlacesService } from 'src/app/services/places/places.service';
import { Router } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-new-offer',
  templateUrl: './new-offer.page.html',
  styleUrls: ['./new-offer.page.scss'],
})
export class NewOfferPage implements OnInit {
  date = new Date()
  currentDate
  location;
  selectedImg;
  selectedImgFile;
  constructor(private placeService: PlacesService, private router: Router, private navController: NavController, private LoadingController: LoadingController,private _sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.currentDate = this.date.toISOString()
  }

  getLocation(event) {
    this.location = event
    console.log(this.location)
  }

  selectedImage(event) {
   this.selectedImg =  this._sanitizer.bypassSecurityTrustUrl(event)
  }

  selectedImageFile(event){
    console.log(event)
    this.selectedImgFile = event
  }

  onCreateOffer(form: NgForm) {
    this.LoadingController.create(
      {
        message: 'Creating Offer...',
      }
    ).then(el => {
      
      if(!this.location || !this.selectedImgFile){
        return;
      }
      el.present()
      this.placeService.AddPlaces({ location: this.location , ...form.value }, this.selectedImgFile)
      this.placeService.placesUpdated.subscribe(() => {
        el.dismiss()
        form.reset()
        this.router.navigate(['/places/offers'])
      })
    })
  }
}
