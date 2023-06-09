import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


// import { LoginPage } from './login/login.page';
// import { RegisterPage } from './register/register.page';
// import { HomePage } from './home/home.page';
// import { ProfilePage } from './profile/profile.page';
// import { BoardAdminPage } from './board-admin/board-admin.page';
// import { BoardModeratorPage } from './board-moderator/board-moderator.page';
// import { BoardUserPage } from './board-user/board-user.page';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./board-admin/board-admin.module').then( m => m.BoardAdminPageModule)
  },
  {
    path: 'mod',
    loadChildren: () => import('./board-moderator/board-moderator.module').then( m => m.BoardModeratorPageModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./board-user/board-user.module').then( m => m.BoardUserPageModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./tutorials-list/tutorials-list.module').then( m => m.TutorialsListPageModule)
  },
  {
    path: 'list/:id',
    loadChildren: () => import('./tutorial-details/tutorial-details.module').then( m => m.TutorialDetailsPageModule)
  },
  {
    path: 'details',
    loadChildren: () => import('./tutorial-details/tutorial-details.module').then( m => m.TutorialDetailsPageModule)
  },
  {
    path: 'details/:id',
    loadChildren: () => import('./tutorial-details/tutorial-details.module').then( m => m.TutorialDetailsPageModule)
  },
  {
    path: 'delivery-status',
    loadChildren: () => import('./delivery-status/delivery-status.module').then( m => m.DeliveryStatusPageModule)
  },
  {
    path: 'product-edit',
    loadChildren: () => import('./product-edit/product-edit.module').then( m => m.ProductEditPageModule)
  },
  {
    path: 'product-edit/:id',
    loadChildren: () => import('./product-edit/product-edit.module').then( m => m.ProductEditPageModule)
  },
  {
    path: 'personnel-list',
    loadChildren: () => import('./personnel-list/personnel-list.module').then( m => m.PersonnelListPageModule)
  },
  {
    path: 'order',
    loadChildren: () => import('./order/order.module').then( m => m.OrderPageModule)
  },
  {
    path: 'order-list',
    loadChildren: () => import('./order-list/order-list.module').then( m => m.OrderListPageModule)
  },
  {
    path: 'personnel-details',
    loadChildren: () => import('./personnel-details/personnel-details.module').then( m => m.PersonnelDetailsPageModule)
  },
  {
    path: 'personnel-details/:id',
    loadChildren: () => import('./personnel-details/personnel-details.module').then( m => m.PersonnelDetailsPageModule)
  },
  {
    path: 'personnel-edit',
    loadChildren: () => import('./personnel-edit/personnel-edit.module').then( m => m.PersonnelEditPageModule)
  },
  {
    path: 'personnel-edit/:id',
    loadChildren: () => import('./personnel-edit/personnel-edit.module').then( m => m.PersonnelEditPageModule)
  },
  {
    path: 'order-cart',
    loadChildren: () => import('./order-cart/order-cart.module').then( m => m.OrderCartPageModule)
  },
  {
    path: 'order-chackout',
    loadChildren: () => import('./order-chackout/order-chackout.module').then( m => m.OrderChackoutPageModule)
  },
  {
    path: 'order-chackout2',
    loadChildren: () => import('./order-chackout2/order-chackout2.module').then( m => m.OrderChackout2PageModule)
  },
  // {
  //   path: 'order-history-details',
  //   loadChildren: () => import('./order-history-details/order-history-details.module').then( m => m.OrderHistoryDetailsPageModule)
  // },
  {
    path: 'order-history-details/:id',
    loadChildren: () => import('./order-history-details/order-history-details.module').then( m => m.OrderHistoryDetailsPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
