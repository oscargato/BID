import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { HistoricoTramitesService } from './historico-tramites.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { PageEvent } from '@angular/material/paginator';

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

  exampleMain;
  displayedColumns7: string[] = ['id', 'solicitante', 'tramite', 'estado','fcreacion'];
  dataSource7: MatTableDataSource<any>;
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild('matPaginator7', { static: true }) paginator7: MatPaginator;
  @ViewChild('sort7', { static: true }) sort7: MatSort;

  ngAfterViewInit() {}

  constructor(private historicoTramitesService:HistoricoTramitesService) {
    const users = Array.from({ length: 100 }, (_, k) => createNewUser(k + 1));
    this.dataSource7 = new MatTableDataSource(users);
    this.historicoTramites = [];
  }
  
  ngOnInit() {
    this.dataSource7.paginator = this.paginator7;
    this.dataSource7.sort = this.sort7;
    this.getHistoricoTramites()
  }


  getHistoricoTramites(){
    this.historicoTramitesService.getHistoricoTramite(Number(localStorage.getItem('id'))).subscribe(resp =>{
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
/*         this.historicoTramites[0] = { clasificador:1, 
          nombreTramite:'nombre 1',
          nombre:'nombre 1',
          fechaInicio:'20-20-21',
        };
        this.historicoTramites[1] = { clasificador:1, 
          nombreTramite:'nombre 1',
          nombre:'nombre 1',
          fechaInicio:'20-20-21',
        }; */
        

    })
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
