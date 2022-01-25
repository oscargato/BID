import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectionStrategy} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MisTramitesService } from './mis-tramites.service';
import { MisTramites } from './mis-tramites';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';


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
    <!-- fecha de Creacion Column -->
    <ng-container matColumnDef="fcreacion">
      <mat-header-cell *matHeaderCellDef mat-sort-header> Fecha Creación </mat-header-cell>
      <mat-cell *matCellDef="let row"> {{row.fcreacion}}% </mat-cell>
    </ng-container>
    <!-- Estado Column -->
    <ng-container matColumnDef="estado">
      <mat-header-cell *matHeaderCellDef mat-sort-header> Estado </mat-header-cell>
      <mat-cell *matCellDef="let row" [style.color]="row.color"> {{row.estado}} </mat-cell>
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
* @Trámites Disponibles.
*/
@Component({
  selector: 'table-overview-example',
  styleUrls: ['table-overview-example.css'],
  templateUrl: 'table-overview-example.html',
})
export class TableOverviewExample {
  displayedColumns = ['id', 'tramite', 'fcreacion','estado'];
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
    fcreacion: new Date().toDateString(),
    estado:  id.toString(),
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
  fcreacion: string;
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
  fcreacion: string;
  estado: string;
  color: string;
}

/** Constants used to fill up our data base. */
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

/** Builds and returns a new User. */
function createNewUser(id: number): UserData {
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
  selector: 'app-tramites-mis-tramites',
  templateUrl: './mis-tramites.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
  styleUrls: ['./mis-tramites.component.scss']
})

export class MisTramitesComponent implements OnInit, AfterViewInit {

  public misTramites: Array<MisTramites>;
  public desde:number = 0;
  public hasta:number = 10;
  public pageSize = 10;
  public dataSource: MatTableDataSource<MisTramites>;

  public first:number = 0;
  public rows:number = 10;
  public last:number;
  public totalRecords:number;
  public loading: boolean = true;
  public orderClasificador:boolean = false;
  public orderNombreTramite:boolean = false;
  public orderNombre:boolean = false;
  public orderFechaInicio:boolean = false;
  public step:number = 0;

  exampleMain;
  displayedColumns7: string[] = ['clasificador', 'nombreTramite', 'nombre','fechaInicio'];
  dataSource7: MatTableDataSource<MisTramites>;
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild('matPaginator7', { static: true }) paginator7: MatPaginator;
  @ViewChild('sort7', { static: true }) sort7: MatSort;
  //@ViewChild('miTabla',{ static: false }) table: any;

  ngAfterViewInit(){
    //this.dataSource7.sort = this.sort7;
    //this.table = $(this.table.nativeElement);
    //this.table.tablesorter();
  }

  constructor(private misTramitesService:MisTramitesService, 
              private MatPaginatorIntl:MatPaginatorIntl)
  { const users = Array.from({ length: 100 }, (_, k) => createNewUser(k + 1));
    //this.dataSource7 = new MatTableDataSource(users);
    this.MatPaginatorIntl.itemsPerPageLabel = "Registros por página";
    this.misTramites = [];
  }

  ngOnInit(){
    //this.exampleMain = main;
    //this.dataSource7.paginator = this.paginator7;
    //this.dataSource7.sort = this.sort7;
    this.getTramitesSolicitante()
    this.first = 1;
    this.last = 10;
    this.totalRecords = 200;
    this.loading = false;    
  }


  getTramitesSolicitante(){
    this.misTramitesService.getTramitesSolicitante(Number(localStorage.getItem('id'))).subscribe(resp =>{
      console.log('Mis Trámites',resp);
      
      let i = 0;
      resp.forEach(element => {
        this.misTramites[i] = { clasificador:element.clasificador, 
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
    this.misTramites.sort(function(a,b){
      if(a[clasificador] < b[clasificador]){
        return -1 * direccion;
      }else if(a[clasificador] > b[clasificador]){
        return 1 * direccion;
      }
    })
    this.step = 1;
  }

  sortNombreTramite(nombreTramite:string){
    this.orderNombreTramite = !this.orderNombreTramite;
    
    let direccion = this.orderNombreTramite ? 1: -1;
    this.misTramites.sort(function(a,b){
      if(a[nombreTramite] < b[nombreTramite]){
        return -1 * direccion;
      }else if(a[nombreTramite] > b[nombreTramite]){
        return 1 * direccion;
      }
    })
    this.step = 2;
  }

  sortNombre(nombre:string){
    this.orderNombre = !this.orderNombre;
    
    let direccion = this.orderNombre ? 1: -1;
    this.misTramites.sort(function(a,b){
      if(a[nombre] < b[nombre]){
        return -1 * direccion;
      }else if(a[nombre] > b[nombre]){
        return 1 * direccion;
      }
    })
    this.step = 3;
  }

  sortFechaInicio(fechaInicio:string){
    this.orderFechaInicio = !this.orderFechaInicio;
    
    let direccion = this.orderFechaInicio ? 1: -1;
    this.misTramites.sort(function(a,b){
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

  applyFilter7(filterValue: string){
    this.dataSource7.filter = filterValue.trim().toLowerCase();
    if (this.dataSource7.paginator) {
      this.dataSource7.paginator.firstPage();
    }
  }
}
