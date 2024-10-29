import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import categoryData from "../../../assets/company/categories.json";
import { CartService } from 'src/app/services/cart.service';
import { AnimationController, ModalController } from '@ionic/angular';
import { CartModalPage } from 'src/app/pages/cart-modal/cart-modal.page';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {
  @Input() title: string | undefined;
  dropdown = false;
  categories = categoryData;
  cartCount = 0;

  // DARK_MODE implementation
  // --------------------------
  darkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

  @ViewChild("productbtn", { read: ElementRef }) productbtn: ElementRef | undefined;
  @ViewChild("cartbtnweb", { read: ElementRef }) cartBntWeb: ElementRef | undefined;
  @ViewChild("cartbtnmobile", { read: ElementRef }) cartBtnMobile: ElementRef | undefined;

  constructor(
    private animationCtrl: AnimationController,
    private cartService: CartService,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() { 
    this.cartService.getCartCount().subscribe((value) => {
      if (value > 0) {
        this.animateCart();
      }
      this.cartCount = value;
    });

    // DARK_MODE implementation
    // --------------------------
    this.toggleDarkmode(this.darkMode);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    prefersDark.addEventListener('change', e => {
      const dark = e.matches ? true : false;
      if (this.darkMode != dark) {
        this.darkMode = !this.darkMode;
        this.toggleDarkmode(this.darkMode);
      }
    });
  }

  // DARK_MODE implementation
  // --------------------------
  public toggleDarkmode(enable: any): void {
    this.darkMode = enable;
    document.body.classList.toggle('dark', enable);
  }

  public hideDropdown(event: any): void {
    const xTouch = event.clientX;
    const yTouch = event.clientY;
    const rect = this.productbtn && this.productbtn.nativeElement.getBoundingClientRect();
    const topBoundary = rect.top+2;
    const leftBoundary = rect.left+2;
    const rightBoundary = rect.right-2;
    if (xTouch < leftBoundary || xTouch > rightBoundary || yTouch < topBoundary) {
      this.dropdown = false;
    }
  }

  private animateCart(): void {
    const keyframes = [
      { offset: 0, transform: "scale(1)" },
      { offset: 0.5, transform: "scale(1.2)" },
      { offset: 0.8, transform: "scale(0.9)" },
      { offset: 1, transform: "scale(1)" },
    ];
    const cartAnimationWeb = this.animationCtrl
      .create("web")
      .addElement(this.cartBntWeb && this.cartBntWeb.nativeElement)
      .duration(600)
      .keyframes(keyframes);
    cartAnimationWeb.play();
    const cartAnimationMobile = this.animationCtrl
      .create("mobile")
      .addElement(this.cartBtnMobile && this.cartBtnMobile.nativeElement)
      .duration(600)
      .keyframes(keyframes);
    cartAnimationMobile.play();
  }

  async openCart() {
    const modal = await this.modalCtrl.create({
      component: CartModalPage,
      cssClass: 'custom-modal'
    });
    await modal.present();
  }
  
}


