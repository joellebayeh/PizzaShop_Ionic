import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/menu/menu.module').then( m => m.MenuPageModule)
  },
  // {
  //   path: 'home',
  //   loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  // },
  // {
  //   path: 'products',
  //   loadChildren: () => import('./pages/products/products.module').then( m => m.ProductsPageModule)
  // },
  // {
  //   path: 'details',
  //   loadChildren: () => import('./pages/details/details.module').then( m => m.DetailsPageModule)
  // },
  // {
  //   path: 'about',
  //   loadChildren: () => import('./pages/about/about.module').then( m => m.AboutPageModule)
  // },
  // {
  //   path: 'filter-modal',
  //   loadChildren: () => import('./pages/filter-modal/filter-modal.module').then( m => m.FilterModalPageModule)
  // },
  // {
  //   path: 'cart-modal',
  //   loadChildren: () => import('./pages/cart-modal/cart-modal.module').then( m => m.CartModalPageModule)
  // },
  {
    path: 'error',
    loadChildren: () => import('./pages/error/error.module').then( m => m.ErrorPageModule)
  },
  {
    path: "404",
    loadChildren: () =>
    import("./pages/error/error.module").then((m) => m.ErrorPageModule),
  },
  // {
  //   path: "**",
  //   redirectTo: "404",
  //   pathMatch: "full",
  // },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
