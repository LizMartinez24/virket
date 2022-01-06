import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PayMercadoPage } from './pay-mercado.page';

const routes: Routes = [
  {
    path: '',
    component: PayMercadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PayMercadoPageRoutingModule {}
