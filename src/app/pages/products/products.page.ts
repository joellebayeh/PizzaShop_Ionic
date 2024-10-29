import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import productData from "../../../assets/company/menu.json";
import categoryData from "../../../assets/company/categories.json";
import { CartService } from "../../services/cart.service";
import { ModalController } from '@ionic/angular';
import { FilterModalPage } from '../filter-modal/filter-modal.page';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  products : any = [];
  productData = productData;

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.filterProducts(params['category']);
    });
  }

  private filterProducts(category = null): void {
    if (!category) {
      this.products = productData;
    } else {
      const cat = categoryData.filter((item) => item.slug == category)[0];
      this.products = this.productData.filter((p) => p.category == cat.id);
    }
  }

  public addProduct(product: any): void {
    this.cartService.addProduct(product);
  }

  async openFilter() {
    const modal = await this.modalCtrl.create({
      component: FilterModalPage,
      breakpoints: [0, 0.5],
      initialBreakpoint: 0.5,
      handle: false,
      componentProps: {
        categories: categoryData
      }
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data) {
      this.filterProducts(data.category?.slug)
    }
  }

}
