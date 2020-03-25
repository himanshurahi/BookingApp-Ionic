import { Component, OnInit, AfterViewInit, Output } from '@angular/core';
import { PlacesService } from 'src/app/services/places/places.service';
import { Router } from '@angular/router';
import { EventEmitter, Button } from 'protractor';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoadingController, AlertController } from '@ionic/angular';
import { Plugins } from '@capacitor/core';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit, AfterViewInit {
  places = []
  constructor(private placeService: PlacesService, private router: Router, private loadinController: LoadingController, private alertController: AlertController) { }

  ngOnInit() {

    // Plugins.StatusBar.setBackgroundColor({
    //   color : 'red'
    // })
    
    console.log('offers Init Called')
    this.loadinController.create({
      message: 'Please Wait...'
    }).then(el => {
      el.present()
      this.getPlaces().subscribe(data => {
        console.log(data)
        this.places = data
        el.dismiss()
      })
    })
  }
  getPlaces() {
    return this.placeService.getPlaces().pipe(map(el => {
      console.log('am getting')
      return el.map((e: any) => {
        return {
          key: e.key,
          a_from: new Date(e.payload.val().a_from),
          a_to: new Date(e.payload.val().a_to),
          id: e.payload.val().id,
          title: e.payload.val().title,
          price: e.payload.val().price,
          description: e.payload.val().description,
          imgUrl: e.payload.val().imgUrl,
        }
      })
    }))
  }

  EditOffer(id, slideItem: any) {
    console.log(id)
    slideItem.close()
    this.router.navigate(['/places/offers/edit', id])
  }

  ngAfterViewInit() {

  }




}
