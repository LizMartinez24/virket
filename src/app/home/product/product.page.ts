import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListProductService } from '../list-product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {
  dataElement;
  constructor(
    public listProductService: ListProductService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const value = this.listProductService.allListProduct.filter((el) => '' + el.id === params.recipeId);
      this.dataElement = value[0];
    });
  }

  buy(el) {
    this.listProductService.productBuy.push(el);
  }

}
