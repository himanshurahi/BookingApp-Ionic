import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipesService } from 'src/app/services/recipes.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.page.html',
  styleUrls: ['./recipe-detail.page.scss'],
})
export class RecipeDetailPage implements OnInit {
  recipe;
  constructor(private route: ActivatedRoute, private recipeService: RecipesService, private router: Router, private alertController: AlertController) { }

  ngOnInit() {
    this.route.paramMap.subscribe((data: any) => {
      this.recipe = this.recipeService.getRecipeById(data.params.recipeId)
    })
  }
  deleteRecipe(id) {
    this.alertController.create({
      header: 'Are you Sure?',
      message: 'Do You Really Want to Delete',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Delete',
          cssClass: 'danger',
          handler: () => {
            this.recipeService.deleteRecipe(id)
            this.router.navigate(['/recipes'])
          }
        }
      ]
    }).then(alert => {
      alert.present()
    })

  }

}
