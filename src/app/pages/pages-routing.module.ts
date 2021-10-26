import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './_layout/layout.component';
// #usuarios-start#
import { TramitesComponent } from './tramites.component';
import { FormComponent } from './form.component';
// #usuarios-end#
// #funcionarios-start#
// #funcionarios--end#


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      /*
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      */
      {
        path: 'user-management',
        loadChildren: () =>
          import('../modules/user-management/user-management.module').then(
            (m) => m.UserManagementModule
          ),
      },
      {
        path: 'tramites',
        loadChildren: () =>
          import('./tramites.module').then(
            (m) => m.TramitesModule
          ),
      },
      {
        path: 'form',
        loadChildren: () =>
          import('./form.module').then(
            (m) => m.FormModule
          ),
      },
      {
        path: 'user-profile',
        loadChildren: () =>
          import('../modules/user-profile/user-profile.module').then(
            (m) => m.UserProfileModule
          ),
      },
     /*  {
        path: 'ngbootstrap',
        loadChildren: () =>
          import('../modules/ngbootstrap/ngbootstrap.module').then(
            (m) => m.NgbootstrapModule
          ),
      },
      {
        path: 'wizards',
        loadChildren: () =>
          import('../modules/wizards/wizards.module').then(
            (m) => m.WizardsModule
          ),
      },
       
{
        path: 'material',
        loadChildren: () =>
          import('../modules/material/material.module').then(
            (m) => m.MaterialModule
          ),
      },*/
      {
        path: 'tramites',
        redirectTo: '/tramites',
        pathMatch: 'full',
      },
      {
        path: 'form',
        redirectTo: '/form',
        pathMatch: 'full',
      },

      
      {
        path: '',
        redirectTo: '/tramites/tramites-disponibles/tramites-disponibles',
        pathMatch: 'full',
      },
      

      {
        path: '**',
        redirectTo: 'error/404',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule { }
