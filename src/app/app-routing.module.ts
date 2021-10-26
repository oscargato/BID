import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './modules/auth/_services/auth.guard';


export const routes: Routes = [
  { path: 'auth', loadChildren: () =>import('./modules/auth/auth.module').then((m) => m.AuthModule),},
  { path: '', canActivate: [AuthGuard], loadChildren: () => import('./pages/layout.module').then((m) => m.LayoutModule),},
  { path: 'form', loadChildren: () => import('./pages/form.module').then(m => m.FormModule) },
  { path: 'error',loadChildren: () =>import('./modules/errors/errors.module').then((m) => m.ErrorsModule),},  
  { path: '**', redirectTo: 'error/404' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})


export class AppRoutingModule { }
