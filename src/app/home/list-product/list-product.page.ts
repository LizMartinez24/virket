import { Component, OnInit } from '@angular/core';
import { ListProductService } from '../list-product.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.page.html',
  styleUrls: ['./list-product.page.scss'],
})
export class ListProductPage implements OnInit {

  constructor(public listProductService: ListProductService) { }

  ngOnInit() { }

  /**
   * Eliminar un elemento de productos a comprar.
   * @param id Id a eliminar.
   */
  deleteProduct(id) {
    this.listProductService.productBuy.splice(id, 1);
    this.listProductService.total();
  }

}
