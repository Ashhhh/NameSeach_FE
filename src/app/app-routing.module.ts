import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export enum RoutePaths {
  LOGIN = 'login',
  SEARCH = 'search'
}

const routes: Routes = [
  {path: RoutePaths.LOGIN, loadChildren: './modules/login/login.module#LoginModule'},
  {path: RoutePaths.SEARCH, loadChildren: './modules/search/search.module#SearchModule'},
  {path: '**', redirectTo: RoutePaths.SEARCH}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
