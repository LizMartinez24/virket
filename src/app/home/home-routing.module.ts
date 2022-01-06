import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'id/:recipeId',
    loadChildren: () => import('./product/product.module').then(m => m.ProductPageModule)
  },
  {
    path: 'list-product',
    loadChildren: () => import('./list-product/list-product.module').then(m => m.ListProductPageModule)
  },
  {
    path: 'pay-mercado',
    loadChildren: () => import('./pay-mercado/pay-mercado.module').then( m => m.PayMercadoPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule { }
