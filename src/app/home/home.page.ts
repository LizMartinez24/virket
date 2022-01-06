import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ListProductService } from './list-product.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  /** Obtener la lista de todos los productos */
  public listProduct = [];
  /** Obtener lista de productor filtrados. */
  public listFilter = [];
  /** Estatus de lectura */
  public dataValue = 'load';
  /** Item activo */
  public search = 'ALL';

  constructor(
    private http: HttpClient,
    public listProductService: ListProductService
  ) { }

  ngOnInit() {
    if (this.listProductService.allListProduct.length === 0) {
      this.getList();
    } else {
      this.listProduct = this.listProductService.allListProduct;
      this.listFilter = this.listProduct;
      this.dataValue = 'success';
    }
  }

  /**
   * Obtener productos a partir de endPoint.
   */
  getList() {
    this.dataValue = 'load';
    this.http.get<any>('https://fakestoreapi.com/products').subscribe(data => {
      this.listProductService.allListProduct = data;
      this.listProduct = data;
      this.listFilter = this.listProduct;
      this.dataValue = 'success';
    }, error => {
      this.dataValue = 'error';
    });
  }

  /**
   * Elemento seleccionado.
   * @param category categoria.
   */
  selected(category) {
    if (category === 'men') {
      this.search = "men's clothing"
    } else if (category === 'women') {
      this.search = "women's clothing";
    } else { this.search = category; }
    this.listFilter = this.listProduct.filter((el) => el.category === this.search);
  }

  /**
   * Obtener la lista de productos sin filtro.
   */
  allList() {
    this.listFilter = this.listProduct;
    this.search = 'All';
  }
}
