import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit
} from '@angular/core';
import { HistoricoTramitesService } from './historico-tramites.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';

const COLORS: string[] = [

  'navy',

];
const TRAMITE: string[] = [
  'Trámite 1',
  'Trámite 2',
  'Trámite 3',
  'Trámite 4',
  'Trámite 5',
  'Trámite 6',
  'Trámite 7',
  'Trámite 8',
  'Trámite 9',
  'Trámite 10',
  'Trámite 11',
  'Trámite 12',
  'Trámite 13',
  'Trámite 14',
  'Trámite 15',
  'Trámite 16',
  'Trámite 17',
  'Trámite 18',
  'Trámite 19',
];

function createNewUser(id: number): any {
  const tramite =
    TRAMITE[Math.round(Math.random() * (TRAMITE.length - 1))];

  return {
    id: id.toString()+'00-PC-'+10+'-2021/12',
    tramite,
    fcreacion: new Date().toDateString(),
    estado: 'Realizados',
    color: COLORS[Math.round(Math.random() * (COLORS.length - 1))],
  };
}

@Component({
  selector: 'app-historico-tramites',
  templateUrl: './historico-tramites.component.html',
  styleUrls: ['./historico-tramites.component.scss']
})

export class HistoricoTramitesComponent implements OnInit, AfterViewInit {

  public historicoTramites: Array<any>;
  public desde:number =0;
  public hasta:number =10;
  public pageSize = 10;
  public orderClasificador:boolean = false;
  public orderNombreSolicitante:boolean = false;
  public orderNombreTramite:boolean = false;
  public orderEstadoActual:boolean = false;
  public orderFechaInicio:boolean = false;
  public step:number = 0;

  exampleMain;
  displayedColumns7: string[] = ['id', 'solicitante', 'tramite', 'estado','fcreacion'];
  dataSource7: MatTableDataSource<any>;
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild('matPaginator7', { static: true }) paginator7: MatPaginator;
  @ViewChild('sort7', { static: true }) sort7: MatSort;

  ngAfterViewInit() {}

  constructor(private historicoTramitesService:HistoricoTramitesService, 
              private matPaginatorIntl:MatPaginatorIntl) {
    const users = Array.from({ length: 100 }, (_, k) => createNewUser(k + 1));
    this.dataSource7 = new MatTableDataSource(users);
    this.historicoTramites = [];
  }
  
  ngOnInit() {
    this.dataSource7.paginator = this.paginator7;
    this.dataSource7.sort = this.sort7;
    this.matPaginatorIntl.itemsPerPageLabel = "Registros por página";
    this.getHistoricoTramites()
  }


  getHistoricoTramites(){
    this.historicoTramitesService.getHistoricoTramite(Number(localStorage.getItem('idFunc'))).subscribe(resp =>{
        let i = 0;
        resp.forEach(element => {
          this.historicoTramites[i] = { 
            clasificador:element.clasificador, 
            nombreSolicitante:element.nombreSolicitante,
            nombreTramite:element.nombreTramite,
            nombre:element.nombre,
            fechaInicio:element.fechaInicio,
          };
          i++;
        });
    })
  }


  sortClasificador(clasificador:string){
    this.orderClasificador = !this.orderClasificador;
    
    let direccion = this.orderClasificador ? 1: -1;
    this.historicoTramites.sort(function(a,b){
      if(a[clasificador] < b[clasificador]){
        return -1 * direccion;
      }else if(a[clasificador] > b[clasificador]){
        return 1 * direccion;
      }
    })
    this.step = 1;    
  }

  sortSolicitante(nombreSolicitante:string){
    this.orderNombreSolicitante = !this.orderNombreSolicitante;
    
    let direccion = this.orderNombreSolicitante ? 1: -1;
    this.historicoTramites.sort(function(a,b){
      if(a[nombreSolicitante] < b[nombreSolicitante]){
        return -1 * direccion;
      }else if(a[nombreSolicitante] > b[nombreSolicitante]){
        return 1 * direccion;
      }
    })
    this.step = 2;    
  }
  
  sortNombreTramite(nombreTramite:string){
    this.orderNombreTramite = !this.orderNombreTramite;
    
    let direccion = this.orderNombreTramite ? 1: -1;
    this.historicoTramites.sort(function(a,b){
      if(a[nombreTramite] < b[nombreTramite]){
        return -1 * direccion;
      }else if(a[nombreTramite] > b[nombreTramite]){
        return 1 * direccion;
      }
    })
    this.step = 3;    
  }
  
  sortEstadoActual(nombre:string){
    this.orderEstadoActual = !this.orderEstadoActual;
    
    let direccion = this.orderEstadoActual ? 1: -1;
    this.historicoTramites.sort(function(a,b){
      if(a[nombre] < b[nombre]){
        return -1 * direccion;
      }else if(a[nombre] > b[nombre]){
        return 1 * direccion;
      }
    })
    this.step = 4;    
  }
  
  sortFechaInicio(fechaInicio:string){
    this.orderFechaInicio = !this.orderFechaInicio;
    
    let direccion = this.orderFechaInicio ? 1: -1;
    this.historicoTramites.sort(function(a,b){
      if(a[fechaInicio] < b[fechaInicio]){
        return -1 * direccion;
      }else if(a[fechaInicio] > b[fechaInicio]){
        return 1 * direccion;
      }
    })
    this.step = 5;    
  }

  cambiarpagina(e:PageEvent){
    this.desde = e.pageIndex * e.pageSize;
    this.hasta = this.desde + e.pageSize;
  }

  applyFilter7(filterValue: string){
    this.dataSource7.filter = filterValue.trim().toLowerCase();
    if (this.dataSource7.paginator) {
      this.dataSource7.paginator.firstPage();
    }
  }
}
