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
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
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
    path: 'details',
    loadChildren: () => import('./tutorial-details/tutorial-details.module').then( m => m.TutorialDetailsPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
