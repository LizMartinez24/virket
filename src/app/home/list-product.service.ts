import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ListProductService {
  /** Lista total de productos */
  allListProduct = [];
  /** Lista de productos a comprar */
  productBuy = [];
  constructor() { }

  /**
   * Suma de precio de producto.
   * @returns total.
   */
  total() {
    return this.productBuy.map(item => item.price).reduce((prev, curr) => prev + curr, 0);
  }
}
