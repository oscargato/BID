import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';
import { TramitesFinalizadosService } from './tramites-finalizados.service'
import { PageEvent } from '@angular/material/paginator';

const main = {
  htmlCode: `
<div class="example-header">
  <mat-form-field>
    <input matInput (keyup)="applyFilter($event.target.value)" placeholder="Filter">
  </mat-form-field>
</div>
<div class="example-container mat-elevation-z8">
  <mat-table [dataSource]="dataSource" matSort>
    <!-- ID Column -->
    <ng-container matColumnDef="id">
      <mat-header-cell *matHeaderCellDef mat-sort-header> ID </mat-header-cell>
      <mat-cell *matCellDef="let row"> {{row.id}} </mat-cell>
    </ng-container>
    <!-- Tramite Column -->
    <ng-container matColumnDef="tramite">
      <mat-header-cell *matHeaderCellDef mat-sort-header> Trámite </mat-header-cell>
      <mat-cell *matCellDef="let row"> {{row.tramite}} </mat-cell>
    </ng-container>
    <!-- fInicio Column -->
    <ng-container matColumnDef="finicio">
      <mat-header-cell *matHeaderCellDef mat-sort-header> Trámites </mat-header-cell>
      <mat-cell *matCellDef="let row"> {{row.finicio}}% </mat-cell>
    </ng-container>
    <!-- ffinal Column -->
    <ng-container matColumnDef="ffinal">
      <mat-header-cell *matHeaderCellDef mat-sort-header> Trámites </mat-header-cell>
      <mat-cell *matCellDef="let row"> {{row.ffinal}} </mat-cell>
    </ng-container>
    <!-- Estado Column -->
    <ng-container matColumnDef="estado">
      <mat-header-cell *matHeaderCellDef mat-sort-header> Estado </mat-header-cell>
      <mat-cell *matCellDef="let row" [style.color]="row.color"> {{row.estado}} </mat-cell>
    </ng-container>
    <!-- Descarga Column -->
    <ng-container matColumnDef="down">
      <mat-header-cell *matHeaderCellDef mat-sort-header> Descargar </mat-header-cell>
      <mat-cell *matCellDef="let row" [style.color]="row.down"> {{row.down}} </mat-cell>
    </ng-container>
    <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
      <mat-row *matRowDef="let row; columns: displayedColumns;">
    </mat-row>
  </mat-table>
  <mat-paginator #paginator
  [pageSize]="10"
  [pageSizeOptions]="[5, 10, 20]"
  [showFirstLastButtons]="true">
</mat-paginator>
</div>`,
  tsCode: `
import {Component, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';\n
/**
* @Trámites Finalizados.
*/
@Component({
  selector: 'table-overview-example',
  styleUrls: ['table-overview-example.css'],
  templateUrl: 'table-overview-example.html',
})
export class TableOverviewExample {
  displayedColumns = ['id', 'tramite', 'finicio', 'ffinal','estado','descarga'];
  dataSource: MatTableDataSource<UserData>;\n
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;\n
  constructor() {
    // Create 100 users
    const users: UserData[] = [];
      for (let i = 1; i <= 100; i++) { users.push(createNewUser(i)); }\n
      // Assign the data to the data source for the table to render
      this.dataSource = new MatTableDataSource(users);
  }\n
  /**
  * Set the paginator and sort after the view init since this component will
  * be able to query its view for the initialized paginator and sort.
  */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }\n
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}\n\n
/** Builds and returns a new User. */
function createNewUser(id: number): UserData {
  const tramite =
  TRAMITE[Math.round(Math.random() * (TRAMITE.length - 1))] + ' ' +
  TRAMITE[Math.round(Math.random() * (TRAMITE.length - 1))].charAt(0) + '.';\n\n
  return {
    id: id.toString(),
    tramite: tramite,
    finicio: new Date().toDateString(),
    ffinal:  new Date().toDateString(),
    estado:  id.toString(),
    down: 'descargar';
    color: COLORS[Math.round(Math.random() * (COLORS.length - 1))]
   };
}\n\n
/** Constants used to fill up our data base. */
const COLORS = ['maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple',
  'fuchsia', 'lime', 'teal', 'aqua', 'blue', 'navy', 'black', 'gray'];
const TRAMITE = ['Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack',
  'Charlotte', 'Theodore', 'Isla', 'Oliver', 'Isabella', 'Jasper',
  'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'];\n
export interface UserData {
  id: string;
  tramite: string;
  finicio: string;
  ffinal: string;
  estado: string;
  color: string;
}`,
  cssCode: `
.example-container {
  display: flex;
  flex-direction: column;
  min-width: 300px;
}
.example-header {
  min-height: 64px;
  padding: 8px 24px 0;
}
.mat-form-field {
  font-size: 14px;
  width: 100%;
}
.mat-table {
  overflow: auto;
  max-height: 500px;
}`,

  isCodeVisible: false,
  isExampleExpanded: true,
};


export interface UserData {
  id: string;
  tramite: string;
  finicio: string;
  ffinal: string;
  estado: string;
  down: string;
  color: string;
}

interface TramitesFinalizados {
  clasificador:string; 
  nombre:string;
  nombreEstado:string; 
  fechaInicio:number;
}

/** Constants used to fill up our data base. */
const COLORS: string[] = [

  'green',
 

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

/** Builds and returns a new User. */
function createNewUser(id: number): UserData {
  const tramite =
    TRAMITE[Math.round(Math.random() * (TRAMITE.length - 1))];

  return {
    id: id.toString()+'00-PC-'+10+'-2021/12',
    tramite,
    finicio: new Date().toDateString(),
    ffinal: new Date().toDateString(),
    estado: 'Trámites Completados',
    down: 'descargar',
    color: COLORS[Math.round(Math.random() * (COLORS.length - 1))],
  };
}

@Component({
  selector: 'app-tramites-tramites-finalizados',
  templateUrl: './tramites-finalizados.component.html',
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
export class TramitesFinalizadosComponent implements OnInit, AfterViewInit {
  exampleMain;
  displayedColumns7: string[] = ['id', 'tramite', 'finicio', 'ffinal','estado','down'];
  dataSource7: MatTableDataSource<UserData>;
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  public tramitesFinalizados: Array<TramitesFinalizados>;
  public desde:number =0;
  public hasta:number =10;
  public pageSize = 10;

  @ViewChild('matPaginator7', { static: true }) paginator7: MatPaginator;
  @ViewChild('sort7', { static: true }) sort7: MatSort;

  ngAfterViewInit() {}

  constructor(private tramitesFinalizadosService:TramitesFinalizadosService,
              private activatedRoute:ActivatedRoute) 
              { const users = Array.from({ length: 100 }, (_, k) => createNewUser(k + 1));
                this.dataSource7 = new MatTableDataSource(users);
                this.tramitesFinalizados = [];
              }

  ngOnInit(){
    this.exampleMain = main;
    this.dataSource7.paginator = this.paginator7;
    this.dataSource7.sort = this.sort7;

    this.tramitesFinalizadosService.getTramitesFinalizados(Number(localStorage.getItem('id'))).subscribe(resp =>{
      console.log('Respuesta',resp);

      let i = 0;
      resp.forEach(element => {
        this.tramitesFinalizados[i] = { clasificador:element.clasificador,                                        
                                        nombre:element.nombre,
                                        nombreEstado:element.nombreEstado,
                                        fechaInicio:element.fechaInicio,
                                      };
        i++;
      });      
    },err => { console.log(err) })
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