import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { PlacesService } from 'src/app/services/places/places.service';

@Component({
  selector: 'app-offer-bookings',
  templateUrl: './offer-bookings.page.html',
  styleUrls: ['./offer-bookings.page.scss'],
})
export class OfferBookingsPage implements OnInit {
  place
  constructor(private route : ActivatedRoute, private navController : NavController, private placeService : PlacesService) { }

  ngOnInit() {
   
    this.route.paramMap.subscribe((data:any) => {
      this.place = this.placeService.findPlaceById(data.params.id)
    })
  }

}
