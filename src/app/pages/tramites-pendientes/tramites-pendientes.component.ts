import { TramitesPendientesService } from './tramites-pendientes.service';
import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectionStrategy} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';


export interface UserData {
  id: string;
  tramite: string;
  fcreacion: string;
  estado: string;
  color: string;
}

interface TramitesPendientes {
  clasificador:string; 
  nombreTramite:string;
  nombre:string; 
  fechaInicio:number;
}

const COLORS: string[] = [
  'maroon',
  'red',
  'orange',
  'gray',
  'olive',
  'green',
  'purple',
  'fuchsia',
  'gray',
  'teal',
  'gray',
  'blue',
  'navy',
  'black',
  'gray',
];
/** Constants used to fill up our data base. */
const ESTADOS: string[] = [
  'Revisión Solicitud',
  'Revisión Solicitud',
  'Registrar Pagos ',
  'Subsanar Pagos',
  'Revisión Solicitud',
  'Registrar Pagos ',
  'Subsanar Pagos',
  'Revisión Solicitud',
  'Registrar Pagos ',
  'Subsanar Pagos',
];
const TRAMITE: string[] = [
  'Trámite 1',
  'Trámite 1',
  'Trámite 2',
  'Trámite 3',
  'Trámite 1',
  'Trámite 2',
  'Trámite 3',
  'Trámite 1',
  'Trámite 2',
  'Trámite 3',
];

const URLS: string[] = [
  'form/f-subsanarsolicitud',
  'form/f-subsanarsolicitud',
  'form/f-registrarpago',
  'form/f-subsanarpagos',
  'form/f-subsanarsolicitud',
  'form/f-registarpago',
  'form/f-subsanarpagos',
  'form/f-subsanarsolicitud',
  'form/f-registarpago',
  'form/f-subsanarpagos',
];

/** Builds and returns a new User. */
function createNewUser(id: number): UserData {
  const tramite =
    TRAMITE[Math.round(Math.random() * (TRAMITE.length - 1))];

  return {
    id: id.toString()+'00-PC-'+10+'-2021/12',
    tramite:  TRAMITE[Math.round(id)],
    fcreacion: new Date().toDateString(),
    estado: ESTADOS[Math.round(id)],
    //urls: URLS[Math.round(id)],
    color: COLORS[Math.round(id)],
  };
}

@Component({
  selector: 'app-tramites-tramites-pendientes',
  templateUrl: './tramites-pendientes.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
  styles: [
    `
      .example-container {
        display: flex;
        flex-direction: column;
        max-height: 500px;
        min-width: 300px;
        position: relative;
      }

      .mat-table {
        overflow: auto;
        max-height: 500px;
      }

      .mat-header-cell.mat-sort-header-sorted {
        color: black;
      }

      .example-header {
        min-height: 64px;
        padding: 2px 2px 2px 2px;
      }

      .mat-form-field {
        font-size: 14px;
        width: 100%;
      }

      .mat-table {
        overflow: auto;
        max-height: 500px;
      }
      .mat-column-select {
        overflow: initial;
      }
      .example-header {
        min-height: 64px;
        display: flex;
        align-items: center;
        padding-left: 100px;
        font-size: 20px;
      }

      .example-table {
        overflow: auto;
        min-height: 300px;
      }

      .example-loading-shade {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 56px;
        right: 0;
        background: rgba(0, 0, 0, 0.15);
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .example-rate-limit-reached {
        color: #980000;
        max-width: 360px;
        text-align: center;
      }

      /* Column Widths */
      .mat-column-id,
      .mat-column-tramite {
        min-width: 160px;
      }

      .mat-column-created {
        max-width: 250px;
      }
    `,
  ],
})
export class TramitesPendientesComponent implements OnInit, AfterViewInit {
  exampleMain;
  displayedColumns7: string[] = ['id', 'tramite', 'fcreacion', 'estado'];
  dataSource7: MatTableDataSource<UserData>;
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  public tramitesPendientes: Array<TramitesPendientes>;
  public desde:number =0;
  public hasta:number =10;
  public pageSize = 10;

  @ViewChild('matPaginator7', { static: true }) paginator7: MatPaginator;
  @ViewChild('sort7', { static: true }) sort7: MatSort;

  ngAfterViewInit() {}

  constructor(private tramitesPendientesService:TramitesPendientesService,
              private activatedRoute:ActivatedRoute){
              const users = Array.from({ length: 3 }, (_, k) => createNewUser(k + 1));
              this.dataSource7 = new MatTableDataSource(users);
              this.tramitesPendientes = [];
  }

  ngOnInit(){
   
    this.dataSource7.paginator = this.paginator7;
    this.dataSource7.sort = this.sort7;

    console.log('Bandera 1',this.activatedRoute.snapshot.params.usuarioId);

    this.tramitesPendientesService.getTramitesPendientes(this.activatedRoute.snapshot.params.usuarioId).subscribe(resp =>{
      console.log('Resp',resp);

      /* this.formulario.controls['montoTotal'].setValue(resp.t01_Rev_PermisoConstruccionMun.solicitudId.nombreProyecto);
      this.formulario.controls['numeroRecibo'].setValue(resp.t01_Rev_PermisoConstruccionMun.solicitudId.nombreProyecto);
      this.formulario.controls['fechaPago'].setValue(resp.t01_Rev_PermisoConstruccionMun.solicitudId.nombreProyecto);
      this.formulario.controls['montoPago'].setValue(resp.t01_Rev_PermisoConstruccionMun.solicitudId.nombreProyecto);
      this.formulario.controls['bancoPago'].setValue(resp.t01_Rev_PermisoConstruccionMun.solicitudId.nombreProyecto); 
      */
    })
  }

  revisarTramite()
  {}


  cambiarpagina(e:PageEvent){
    this.desde = e.pageIndex * e.pageSize;
    this.hasta = this.desde + e.pageSize;
  } 

  applyFilter7(filterValue: string) {
    this.dataSource7.filter = filterValue.trim().toLowerCase();
    if (this.dataSource7.paginator) {
      this.dataSource7.paginator.firstPage();
    }
  }
}
