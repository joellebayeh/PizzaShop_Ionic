import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-filter-modal',
  templateUrl: './filter-modal.page.html',
  styleUrls: ['./filter-modal.page.scss'],
})
export class FilterModalPage {
  @Input() categories: any[] | undefined;
  constructor(private modalCtrl: ModalController) {}

  // ngOnInit() {}

  selectCategory(cat: any) {
    this.modalCtrl.dismiss({ category: cat });
  }

}
