import { MatRadioModule } from '@angular/material/radio';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { InlineSVGModule } from 'ng-inline-svg';
import { TramitesComponent } from '../pages/tramites.component';
import { AutocompleteComponent } from '../modules/material/formcontrols/autocomplete/autocomplete.component';
import { CheckboxComponent } from '../modules/material/formcontrols/checkbox/checkbox.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../../../src/app/_metronic/core';
import { GeneralModule } from '../../../src/app/_metronic/partials/content/general/general.module';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatRippleModule, MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconRegistry, MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';

// Form controls
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { DatepickerComponent } from '../modules/material/formcontrols/datepicker/datepicker.component';

import { FormfieldComponent } from '../modules/material/formcontrols/formfield/formfield.component';
import { InputComponent } from '../modules/material/formcontrols/input/input.component';
import { RadiobuttonComponent } from '../modules/material/formcontrols/radiobutton/radiobutton.component';
import { SelectComponent } from '../modules/material/formcontrols/select/select.component';
import { SliderComponent } from '../modules/material/formcontrols/slider/slider.component';
import { SlidertoggleComponent } from '../modules/material/formcontrols/slidertoggle/slidertoggle.component';
// Navigation
import { MenuComponent } from '../modules/material/navigation/menu/menu.component';
import { SidenavComponent } from '../modules/material/navigation/sidenav/sidenav.component';
import { ToolbarComponent } from '../modules/material/navigation/toolbar/toolbar.component';
// Layout
import { CardComponent } from '../modules/material/layout/card/card.component';
import { DividerComponent } from '../modules/material/layout/divider/divider.component';
import { ExpansionPanelComponent } from '../modules/material/layout/expansion-panel/expansion-panel.component';
import { GridListComponent } from '../modules/material/layout/grid-list/grid-list.component';
import { ListComponent } from '../modules/material/layout/list/list.component';
import { MaterialTabsComponent } from '../modules/material/layout/material-tabs/material-tabs.component';
import { StepperComponent } from '../modules/material/layout/stepper/stepper.component';
import { TreeComponent } from '../modules/material/layout/tree/tree.component';
// Buttons & indicators
import { ButtonComponent } from '../modules/material/buttons-and-indicators/button/button.component';
import { ButtonToggleComponent } from '../modules/material/buttons-and-indicators/button-toggle/button-toggle.component';
import { ChipsComponent } from '../modules/material/buttons-and-indicators/chips/chips.component';
import { IconComponent } from '../modules/material/buttons-and-indicators/icon/icon.component';
import { ProgressBarComponent } from '../modules/material/buttons-and-indicators/progress-bar/progress-bar.component';
import { ProgressSpinnerComponent } from '../modules/material/buttons-and-indicators/progress-spinner/progress-spinner.component';
import { RipplesComponent } from '../modules/material/buttons-and-indicators/ripples/ripples.component';

import { MaterialTooltipComponent } from '../modules/material/popups-and-modals/material-tooltip/material-tooltip.component';
import { BottomSheetComponent } from '../modules/material/popups-and-modals/bottom-sheet/bottom-sheet.component';
import { BottomSheetExampleComponent } from '../modules/material/popups-and-modals/bottom-sheet/bottom-sheet-example/bottom-sheet-example.component';
import { PizzaPartyComponent } from '../modules/material/popups-and-modals/snackbar/pizza-party.component';
// Data table
import { PaginatorComponent } from '../modules/material/data-table/paginator/paginator.component';
import { SortHeaderComponent } from '../modules/material/data-table/sort-header/sort-header.component';
import { MaterialTableComponent } from '../modules/material/data-table/material-table/material-table.component';
import { TramitesDisponiblesComponent } from '../pages/tramites-disponibles/tramites-disponibles.component';
import { TramitesPendientesComponent } from '../pages/tramites-pendientes/tramites-pendientes.component';
import { TramitesFinalizadosComponent } from '../pages/tramites-finalizados/tramites-finalizados.component';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTreeModule } from '@angular/material/tree';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatChipsModule } from '@angular/material/chips';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import {
  MatBottomSheetModule,
  MatBottomSheetRef,
  MAT_BOTTOM_SHEET_DATA,
} from '@angular/material/bottom-sheet';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { MisTramitesComponent } from './mis-tramites/mis-tramites.component';
import { TramitesARevisarComponent } from './tramites-a-revisar/tramites-a-revisar.component';
import { HistoricoTramitesComponent } from './historico-tramites/historico-tramites.component'
import { UsuariosComponent } from './usuarios/usuarios.component'


const routes: Routes = [
  {
    path: '',
    component: TramitesComponent,
    children: [
      {
        path: 'form-controls/autocomplete',
        component: AutocompleteComponent,
      },
      {
        path: 'tramites-finalizados/tramites-finalizados',
        component: TramitesFinalizadosComponent,
      },
      {
        path: 'tramites-disponibles/tramites-disponibles',
        component: TramitesDisponiblesComponent,
      },
      {
        path: 'tramites-pendientes/tramites-pendientes',
        component: TramitesPendientesComponent,
      },
      {
        path: 'mis-tramites/mis-tramites',
        component: MisTramitesComponent,
      },
      {
        path: 'tramites-a-revisar/tramites-a-revisar',
        component: TramitesARevisarComponent,
      },
      {
        path: 'historico-tramites/historico-tramites',
        component: HistoricoTramitesComponent,
      },
      {
        path: 'user/:id', component: UsuariosComponent,
      },
      {
        path: 'data-table/table',
        component: MaterialTableComponent,
      },
      { path: '', redirectTo: 'form-controls/autocomplete', pathMatch: 'full' },
      {
        path: '**',
        redirectTo: 'form-controls/autocomplete',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatAutocompleteModule,
    MatListModule,
    MatSliderModule,
    MatCardModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatNativeDateModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatMenuModule,
    MatTabsModule,
    MatTooltipModule,
    MatSidenavModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatTableModule,
    MatGridListModule,
    MatToolbarModule,
    MatBottomSheetModule,
    MatExpansionModule,
    MatDividerModule,
    MatSortModule,
    MatStepperModule,
    MatChipsModule,
    MatPaginatorModule,
    MatDialogModule,
    MatRippleModule,
    CoreModule,
    MatRadioModule,
    MatTreeModule,
    MatButtonToggleModule,
    GeneralModule,
    FormsModule,
    InlineSVGModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
  entryComponents: [
    PizzaPartyComponent,

    IconComponent,
    TreeComponent,
    BottomSheetExampleComponent,
  ],
  providers: [
    MatIconRegistry,
    { provide: MatBottomSheetRef, useValue: {} },
    { provide: MAT_BOTTOM_SHEET_DATA, useValue: {} },
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
  ],
    declarations: [
      TramitesComponent,
      AutocompleteComponent,
      CheckboxComponent,
      DatepickerComponent,
      FormfieldComponent,
      InputComponent,
      RadiobuttonComponent,
      SelectComponent,
      SliderComponent,
      SlidertoggleComponent,
      MenuComponent,
      SidenavComponent,
      ToolbarComponent,
      CardComponent,
      DividerComponent,
      ExpansionPanelComponent,
      GridListComponent,
      ListComponent,
      MaterialTabsComponent,
      StepperComponent,
      ButtonComponent,
      ButtonToggleComponent,
      ChipsComponent,
      IconComponent,
      ProgressBarComponent,
      ProgressSpinnerComponent,
      MaterialTooltipComponent,
      PaginatorComponent,
      SortHeaderComponent,
      TreeComponent,
      BottomSheetComponent,
      BottomSheetExampleComponent,
      RipplesComponent,
      TramitesDisponiblesComponent,
      MaterialTableComponent,
      TramitesPendientesComponent,
      TramitesFinalizadosComponent,
      MisTramitesComponent,
      TramitesARevisarComponent,
      HistoricoTramitesComponent,
      UsuariosComponent
  ],
})
export class TramitesModule {}
