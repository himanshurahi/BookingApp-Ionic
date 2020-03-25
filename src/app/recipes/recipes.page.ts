import { Component, OnInit, OnDestroy } from '@angular/core';
import { RecipesService } from '../services/recipes.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.page.html',
  styleUrls: ['./recipes.page.scss'],
})
export class RecipesPage implements OnInit {
  recipes = []
  constructor(private recipeService: RecipesService) { }

  ngOnInit() {
    this.recipes = this.recipeService.getAllRecipes()
    // this.recipeService.recipeUpdate.subscribe(data => {
    //   this.recipes = data
    // })
  }
  ionViewWillEnter() {
    this.recipes = this.recipeService.getAllRecipes()
    console.log('enter')
  }
  ionViewDidEnter() {
    console.log('Did Enter')
  }

  

  
}
