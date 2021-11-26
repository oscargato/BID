import { Component, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { TramitesRevisarService } from './tramites-revisar.service';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';

export interface UserData {
  solicitante: string;
  idtramite: string;
  tramite: string;
  fcreacion: string;
  estado: string;
  urls: string;
  color: string;
}


export interface DataRevisar {
  nombreSolicitante: string;
  clasificador: string;
  nombre:string;
  nombreEstado: string;
  fechaInicio: number;
  revisionId:number;
  solicitudId:number;
  estadoTramiteId:number;
}

/** Constants used to fill up our data base. */
const COLORS: string[] = [

  'maroon',
  'red',
  'orange',
  'green',
  'purple',
  'teal',
  'gray',
  'blue',
  'navy',
 
];

/** Constants used to fill up our data base. */
const ESTADOS: string[] = [
  'Solicitud de permiso de construcción',
  'Solicitud de permiso de construcción',
  'Solicitud de permiso de construcción y planos',
  'Recepción física de Planos',
  'Tarea de Inspección',
  'Cálculo del impuesto',
  'Revisión documentos y sellos otras entidades',
  'Revisión de Pago',
  'Aprobación del trámite',
];
const TRAMITE: string[] = [
  'Trámite 1',
  'Trámite 1',
  'Trámite 2',
  'Trámite 3',
  'Trámite 4',
  'Trámite 5',
  'Trámite 6',
  'Trámite 7',
  'Trámite 8',
  'Trámite 9',
];

const URLS: string[] = [
  
  
  'form/f-permiso-construccion',

  
  'form/f-permiso-construccion',
  'form/f-permiso-construccion-planos',
  'form/f-recepcion-planos',
  'form/f-tarea-inspeccion',
  'form/f-calculo-impuesto',
  'form/f-revision-documentos-sellos',
  'form/f-revision-pago',
  'form/f-aprobacion-tramite',
];

const SOLICITANTE: string[] = [
  'John Doe',
  'John Doe',
  'Jane Doe',
  'Juan Perez',
  'Maria Perez',
  'Fulanito de Tal',
  'Jane Doe',
  'Juan Perez',
  'Maria Perez',
];
/** Builds and returns a new User. */
function createNewUser(idtramite: number): UserData {
  const tramite =
    TRAMITE[Math.round(Math.random() * (TRAMITE.length - 1))];

  return {
    solicitante: SOLICITANTE[Math.round(idtramite)],
    idtramite: idtramite.toString()+'00-PC-'+10+'-2021/12',
    tramite: TRAMITE[Math.round(idtramite)],
    fcreacion: new Date().toDateString(),
    estado: ESTADOS[Math.round(idtramite)],
    urls: URLS[Math.round(idtramite)],
    color: COLORS[Math.round(idtramite)],
  };
}
//displayedColumns7: string[] = ['solicitante', 'idtramite', 'tramite', 'estado','fcreacion','accion'];
@Component({
  selector: 'app-tramites-a-revisar',
  templateUrl: './tramites-a-revisar.component.html',
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



export class TramitesARevisarComponent implements OnInit {

  public tramitesRevisar:Array<DataRevisar>;
  public tramitesRevisarArquitecto:Array<DataRevisar>;
  public tramitesRevisarInspector:Array<DataRevisar>;
  public desde:number =0;
  public hasta:number =10;
  public pageSize = 10;


  displayedColumns7: string[] = ['solicitante', 'idtramite', 'tramite', 'estado','fcreacion','accion'];
  dataSource7: MatTableDataSource<UserData>;
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;


  @ViewChild('matPaginator7', { static: true }) paginator7: MatPaginator;
  @ViewChild('sort7', { static: true }) sort7: MatSort;


  constructor(private tramitesRevisarService:TramitesRevisarService,
              private router: Router){
    const users = Array.from({ length: 9 }, (_, k) => createNewUser(k + 1));
    this.dataSource7 = new MatTableDataSource(users);
    this.tramitesRevisarInspector = [];
    this.tramitesRevisarArquitecto = [];
    this.tramitesRevisar = [];
  }

  ngOnInit() {
    this.dataSource7.paginator = this.paginator7;
    this.dataSource7.sort = this.sort7;
    
    if(Number(localStorage.getItem('id')) === 2)
    { this.getPendienteSecretariaMunicipal(); }
    else
    { if(Number(localStorage.getItem('id')) === 3)
      { this.getPendientesArquitecto(); }
      else
      { if(Number(localStorage.getItem('id')) === 4)
        { this.getPendientesInspector(); }  
      }   
    }
  }


  getPendientesInspector(){
    this.tramitesRevisarService.getPendientesInspector(Number(localStorage.getItem('id'))).subscribe(resp =>{
      console.log('Inspector',resp);
      let i = 0;
      resp.forEach(element => {
        this.tramitesRevisar[i] = { nombreSolicitante:element.nombreSolicitante, 
                                    clasificador:element.clasificador,
                                    nombre:element.nombre,
                                    nombreEstado:element.nombreEstado,
                                    fechaInicio:element.fechaInicio,
                                    revisionId:element.revisionId,
                                    solicitudId:element.solicitudId,
                                    estadoTramiteId:element.estadoTramiteId,
                                  };
        i++;
      });
    },err => { console.log(err) })
  }


  getPendientesArquitecto(){
    this.tramitesRevisarService.getPendientesArquitecto(Number(localStorage.getItem('id'))).subscribe(resp =>{
      console.log('Arquitecto',resp);
      let i = 0;
      resp.forEach(element => {
        this.tramitesRevisar[i] = { nombreSolicitante:element.nombreSolicitante, 
                                    clasificador:element.clasificador,
                                    nombre:element.nombre,
                                    nombreEstado:element.nombreEstado,
                                    fechaInicio:element.fechaInicio,
                                    revisionId:element.revisionId,
                                    solicitudId:element.solicitudId,
                                    estadoTramiteId:element.estadoTramiteId,
                                  };
        i++;
      });
    },err => { console.log(err) })
  }


  getPendienteSecretariaMunicipal(){
    this.tramitesRevisarService.getPendienteSecretariaMunicipal(Number(localStorage.getItem('id'))).subscribe(resp =>{
      console.log('Secretaria',resp);
      let i = 0;
      resp.forEach(element => {
        this.tramitesRevisar[i] = { nombreSolicitante:element.nombreSolicitante, 
                                    clasificador:element.clasificador,
                                    nombre:element.nombre,
                                    nombreEstado:element.nombreEstado,
                                    fechaInicio:element.fechaInicio,
                                    revisionId:element.revisionId,
                                    solicitudId:element.solicitudId,
                                    estadoTramiteId:element.estadoTramiteId,
                                  };
        i++;
      });
      
    },err => { console.log(err) })
  }

  revisarTramite(estadoTramiteId:number, revisionId:number, solicitudId:number){
    console.log('estadoTramiteId',estadoTramiteId)
    switch (estadoTramiteId) 
    {   case 2:
          this.router.navigate([`/form/f-permiso-construccion/${revisionId}/${solicitudId}`]);     
        break;

        case 3:
          this.router.navigate([`/form/f-subsanarsolicitud/${revisionId}`]);
        break;

        case 4:
          this.router.navigate([`/form/f-permiso-construccion-planos/${revisionId}`]);
        break;

        case 5:
        break;
        
        case 6:
          this.router.navigate([`/form/f-tarea-inspeccion/${revisionId}`]);
        break;

        case 7:
        break;

        case 8:
          this.router.navigate([`/form/f-calculo-impuesto/${revisionId}`]);
        break;

        case 9:
          this.router.navigate([`/form/f-revision-documentos-sellos/${revisionId}`]);
        break;

        case 10:
          this.router.navigate([`/form/f-registrarpago/${revisionId}`]);
        break;

        case 11:
          this.router.navigate([`/form/f-revision-pago/${solicitudId}`]);     
        break;

        case 12:
          this.router.navigate([`/form/f-subsanarpagos/${revisionId}`]);
        break;

        case 13:
          this.router.navigate([`/form/f-aprobacion-tramite/${revisionId}`]);
        break;

        case 17:
          this.router.navigate([`/form/f-recepcion-planos/${revisionId}`]);
        break;
    }
  }


  cambiarpagina(e:PageEvent)
  { this.desde = e.pageIndex * e.pageSize;
    this.hasta = this.desde + e.pageSize;
  }


  applyFilter7(filterValue: string) 
  { this.dataSource7.filter = filterValue.trim().toLowerCase();
    if (this.dataSource7.paginator) 
    { this.dataSource7.paginator.firstPage(); }
  }
}