import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../services/places/places.service';
@Component({
  selector: 'app-places',
  templateUrl: './places.page.html',
  styleUrls: ['./places.page.scss'],
})
export class PlacesPage implements OnInit {
  places = []
  constructor(private placeService: PlacesService) { }

  ngOnInit() {
   
  }

}
