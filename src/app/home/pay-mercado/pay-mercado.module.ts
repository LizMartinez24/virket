import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PayMercadoPageRoutingModule } from './pay-mercado-routing.module';

import { PayMercadoPage } from './pay-mercado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PayMercadoPageRoutingModule
  ],
  declarations: [PayMercadoPage]
})
export class PayMercadoPageModule {}
