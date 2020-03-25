import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  recipes = [{ id: 1, title: 'Panner' }, { id: 2, title: 'Chole' }]
  recipeUpdate = new EventEmitter()
  constructor() { }


  getAllRecipes() {
    return this.recipes
  }

  getRecipeById(id) {
    return this.recipes.find(re => {
      return re.id == id
    })
  }

  deleteRecipe(id) {
    this.recipes = this.recipes.filter(re => {
      return re.id != id
    })
    this.recipeUpdate.emit(this.recipes)
  }
}
