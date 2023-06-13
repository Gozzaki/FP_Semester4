import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MenuPage } from './component/menu/menu.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login-admin',
    pathMatch: 'full'
  },
  {
    path: 'list-users',
    loadChildren: () => import('./pages-admin/list-users/list-users.module').then(m => m.ListUsersPageModule)
  },
  {
    path: 'create-user',
    loadChildren: () => import('./pages-admin/create-user/create-user.module').then(m => m.CreateUserPageModule)
  },
  {
    path: 'update-user',
    loadChildren: () => import('./pages-admin/update-user/update-user.module').then(m => m.UpdateUserPageModule)
  },
  {
    path: 'delete-user',
    loadChildren: () => import('./pages-admin/delete-user/delete-user.module').then(m => m.DeleteUserPageModule)
  },

  {
    path: 'login-admin',
    loadChildren: () => import('./pages-admin/login-admin/login-admin.module').then(m => m.LoginAdminPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages-user/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'menupage',
    loadChildren: () => import('./component/menu/menu.module').then(m => m.MenuPageModule)
  },
  {
    path: 'home-admin',
    loadChildren: () => import('./pages-admin/home-admin/home-admin.module').then(m => m.HomeAdminPageModule)
  },
 
  {
    path: 'candidate',
    loadChildren: () => import('./pages-admin/candidate/candidate.module').then( m => m.CandidatePageModule)
  },
  {
    path: 'hasil-vote',
    loadChildren: () => import('./pages-admin/hasil-vote/hasil-vote.module').then( m => m.HasilVotePageModule)
  },
  {
    path: 'add-candidate',
    loadChildren: () => import('./pages-admin/add-candidate/add-candidate.module').then( m => m.AddCandidatePageModule)
  },
  {
    path: 'edit-candidate/:id',
    loadChildren: () => import('./pages-admin/edit-candidate/edit-candidate.module').then( m => m.EditCandidatePageModule)
  },
  {
    path: 'edit-user/:id',
    loadChildren: () => import('./pages-admin/edit-user/edit-user.module').then( m => m.EditUserPageModule)
  },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
