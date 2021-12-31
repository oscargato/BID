import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InlineSVGModule } from 'ng-inline-svg';
import { FormComponent } from './form.component';
import { FDisponiblesComponent } from './f-disponibles/f-disponibles.component';
import { FormRoutingModule } from './form-routing.module';
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
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ReactiveFormsModule } from '@angular/forms';

// Form controls
/*import { DatepickerComponent } from '../modules/material/formcontrols/datepicker/datepicker.component';*/

/*import {
  DialogComponent,
  Modal3Component,
} from '../../app/modules/material/popups-and-modals/dialog/dialog.component';*/

@NgModule({
  declarations: [
    FormComponent, 
    FDisponiblesComponent, 
    FSubsanarsolicitudComponent, 
    FRegistrarpagoComponent,
    FSubsanarpagosComponent,
    FPermisoConstruccionComponent,
    FPermisoConstruccionPlanosComponent,
    FRecepcionPlanosComponent,
    FTareaInspeccionComponent,
    FCalculoImpuestoComponent,
    FRevisionDocumentosSellosComponent,
    FRevisionPagoComponent,
    FAprobacionTramiteComponent,
    UsuariosComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    InlineSVGModule,
    FormRoutingModule,
    ReactiveFormsModule
  ]
})
export class FormModule { }
