import { TramitesPendientesService } from './tramites-pendientes.service';
import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectionStrategy} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ServiciosService } from '../servicios/servicios.service';

export interface UserData {
  id: string;
  tramite: string;
  fcreacion: string;
  estado: string;
  color: string;
}

interface TramitesPendientes {
  clasificador:string; 
  nombre:string;
  nombreEstado:string; 
  fechaInicio:string;
  revisionId:number;
  solicitudId:number;
  estadoTramiteId:number;  
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
  styleUrls: ['./tramites-pendientes.component.scss'],
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

  public orderClasificador:boolean = false;
  public orderNombreTramite:boolean = false;
  public orderNombre:boolean = false;
  public orderFechaInicio:boolean = false;
  public step:number = 0;

  @ViewChild('matPaginator7', { static: true }) paginator7: MatPaginator;
  @ViewChild('sort7', { static: true }) sort7: MatSort;

  ngAfterViewInit() {}

  constructor(private tramitesPendientesService:TramitesPendientesService,
              private serviciosService:ServiciosService,
              private router:Router){
              const users = Array.from({ length: 3 }, (_, k) => createNewUser(k + 1));
              this.dataSource7 = new MatTableDataSource(users);
              this.tramitesPendientes = [];
  }

  ngOnInit(){
   
    this.tramitesPendientesService.getAllSubsanacionesBySolicitanteId(Number(localStorage.getItem('id'))).subscribe(resp =>{
      
      if(resp == null)
      { this.serviciosService.tramitesPendientes = 0; }
      else
      {
        this.serviciosService.tramitesPendientes = resp.length;
      
        let i = 0;
        resp.forEach(element => {
          this.tramitesPendientes[i] = { clasificador:element.clasificador,                                        
                                        nombre:element.nombre,
                                        nombreEstado:element.nombreEstado,
                                        fechaInicio:element.fechaInicio,
                                        revisionId:element.revisionId,
                                        solicitudId:element.solicitudId,
                                        estadoTramiteId:element.estadoTramiteId,
                                        };
          i++;
        });
      }  
    },err => { console.log(err) })
  }


  revisarTramite(estadoTramiteId:number, revisionId:number, solicitudId:number){
    console.log('estadoTramiteId',estadoTramiteId);
    console.log('solicitudId',solicitudId);
    switch (estadoTramiteId) 
    {   case 2:
          this.router.navigate([`/form/f-permiso-construccion/${revisionId}/${solicitudId}`]);     
        break;

        case 3:
          this.router.navigate([`/form/f-subsanarsolicitud/${solicitudId}/${estadoTramiteId}`]);
        break;

        case 4:
          this.router.navigate([`/form/f-permiso-construccion-planos/${solicitudId}`]);
        break;

        case 5:
          this.router.navigate([`/form/f-subsanarsolicitud/${solicitudId}/${estadoTramiteId}`]);//// Ojooo
        break;
        
        case 6:
          this.router.navigate([`/form/f-tarea-inspeccion/${solicitudId}`]);
        break;

        case 7:
        break;

        case 8:
          this.router.navigate([`/form/f-calculo-impuesto/${solicitudId}`]);
        break;

        case 9:
          this.router.navigate([`/form/f-revision-documentos-sellos/${solicitudId}`]);
        break;

        case 10:
          this.router.navigate([`/form/f-registrarpago/${solicitudId}`]);
        break;

        case 11:
          this.router.navigate([`/form/f-revision-pago/${solicitudId}`]);     
        break;

        case 12:
          this.router.navigate([`/form/f-subsanarpagos/${solicitudId}`]);
        break;

        case 13:
          this.router.navigate([`/form/f-aprobacion-tramite/${solicitudId}`]);
        break;

        case 17:
          this.router.navigate([`/form/f-recepcion-planos/${solicitudId}`]);
        break;
    }
  }

  sortClasificador(clasificador:string){
    this.orderClasificador = !this.orderClasificador;
    
    let direccion = this.orderClasificador ? 1: -1;
    this.tramitesPendientes.sort(function(a,b){
      if(a[clasificador] < b[clasificador]){
        return -1 * direccion;
      }else if(a[clasificador] > b[clasificador]){
        return 1 * direccion;
      }
    })
    this.step = 1;
  }

  sortNombreTramite(nombre:string){
    this.orderNombreTramite = !this.orderNombreTramite;
    
    let direccion = this.orderNombreTramite ? 1: -1;
    this.tramitesPendientes.sort(function(a,b){
      if(a[nombre] < b[nombre]){
        return -1 * direccion;
      }else if(a[nombre] > b[nombre]){
        return 1 * direccion;
      }
    })
    this.step = 2;
  }

  sortNombre(nombreEstado:string){
    this.orderNombre = !this.orderNombre;
    
    let direccion = this.orderNombre ? 1: -1;
    this.tramitesPendientes.sort(function(a,b){
      if(a[nombreEstado] < b[nombreEstado]){
        return -1 * direccion;
      }else if(a[nombreEstado] > b[nombreEstado]){
        return 1 * direccion;
      }
    })
    this.step = 3;
  }

  sortFechaInicio(fechaInicio:string){
    this.orderFechaInicio = !this.orderFechaInicio;
    
    let direccion = this.orderFechaInicio ? 1: -1;
    this.tramitesPendientes.sort(function(a,b){
      if(a[fechaInicio] < b[fechaInicio]){
        return -1 * direccion;
      }else if(a[fechaInicio] > b[fechaInicio]){
        return 1 * direccion;
      }
    })
    this.step = 4;
  }

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
