import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DonatePageComponent} from './donations/pages/donate-page/donate-page.component';
import {HomePageComponent} from './public/pages/home-page/home-page.component';
import {NotFoundPageComponent} from './public/pages/not-found-page/not-found-page.component';

const routes: Routes = [
  {path: 'home', component: HomePageComponent},
  {path: 'engagement/donations/new', component: DonatePageComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: '**', component: NotFoundPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
