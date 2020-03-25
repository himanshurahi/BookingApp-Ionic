import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlacesPage } from './places.page';
import { OffersPage } from './offers/offers.page';

const routes: Routes = [
  // {
  //   path: '',
  //   component: PlacesPage
  // },
  // {
  //   path: 'search',
  //   loadChildren: () => import('./search/search.module').then( m => m.SearchPageModule)
  // },
  {
    path: '',
    component: PlacesPage,
    children: [

      {
        path: "search", children: [

          {
            path: "",
            loadChildren: () => import('./search/search.module').then(m => m.SearchPageModule)
          }
        ]
      },

      {
        path: "offers",
        children: [
          {
            path: "",
            loadChildren: () => import("./offers/offers.module").then(m => m.OffersPageModule)
          } 
        ]
      },

    ],

  },




];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlacesPageRoutingModule { }
