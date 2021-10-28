import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormComponent } from './form.component';
import { FDisponiblesComponent } from './f-disponibles/f-disponibles.component';
import { FSubsanarsolicitudComponent } from './f-subsanarsolicitud/f-subsanarsolicitud.component';
import { FRegistrarpagoComponent } from './f-registrarpago/f-registrarpago.component';
import { FSubsanarpagosComponent } from './f-subsanarpagos/f-subsanarpagos.component';
import { FPermisoConstruccionComponent } from './f-permiso-construccion/f-permiso-construccion.component';
import { FPermisoConstruccionPlanosComponent } from './f-permiso-construccion-planos/f-permiso-construccion-planos.component';
import { FRecepcionPlanosComponent } from './f-recepcion-planos/f-recepcion-planos.component';
import { FTareaInspeccionComponent } from './f-tarea-inspeccion/f-tarea-inspeccion.component';

import { FCalculoImpuestoComponent } from './f-calculo-impuesto/f-calculo-impuesto.component';
import { FRevisionDocumentosSellosComponent } from './f-revision-documentos-sellos/f-revision-documentos-sellos.component';
import { FRevisionPagoComponent } from './f-revision-pago/f-revision-pago.component';
import { FAprobacionTramiteComponent } from './f-aprobacion-tramite/f-aprobacion-tramite.component';
/*import { Wizard2Component } from './wizard2/wizard2.component';
import { Wizard3Component } from './wizard3/wizard3.component';
import { Wizard4Component } from './wizard4/wizard4.component';*/

const routes: Routes = [
  {
    path: '',
    component: FormComponent,
    children: [
      {
        path: 'f-disponibles/:tramiteId ',
        component: FDisponiblesComponent,
      },
     {
        path: 'f-subsanarsolicitud/:idSolicitud',
        component: FSubsanarsolicitudComponent,
      },
      {
        path: 'f-registrarpago/:idSolicitud',
        component: FRegistrarpagoComponent,
      },
     {
        path: 'f-subsanarpagos/:idSolicitud',
        component: FSubsanarpagosComponent,
      },
      {
        path: 'f-permiso-construccion/:id',
        component: FPermisoConstruccionComponent,
      },
     {
        path: 'f-permiso-construccion-planos',
        component: FPermisoConstruccionPlanosComponent,
      },
      {
        path: 'f-recepcion-planos',
        component: FRecepcionPlanosComponent,
      },
     {
        path: 'f-tarea-inspeccion',
        component: FTareaInspeccionComponent,
      },
      {
        path: 'f-calculo-impuesto/:tramiteId',
        component: FCalculoImpuestoComponent,
      },
     {
        path: 'f-revision-documentos-sellos/:idRevision',
        component: FRevisionDocumentosSellosComponent,
      },
      {
        path: 'f-revision-pago/:tramiteId',
        component: FRevisionPagoComponent,
      },
     {
        path: 'f-aprobacion-tramite/:tramiteId',
        component: FAprobacionTramiteComponent,
      },
      { path: '', redirectTo: 'f-disponibles', pathMatch: 'full' },
      { path: '**', redirectTo: 'f-disponibles', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormRoutingModule { }
