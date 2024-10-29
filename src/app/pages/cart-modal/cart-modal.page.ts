import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.page.html',
  styleUrls: ['./cart-modal.page.scss'],
})
export class CartModalPage implements OnInit {

  cart: any[] = [];
  cartSum = 0;

  constructor(
    private cartService: CartService,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.cart = this.cartService.getCart();
    this.cartSum = this.cart.reduce((val, item) => (val += +item.price), 0);
  }

  public dismiss():void {
    this.modalCtrl.dismiss();
  }
    
}
