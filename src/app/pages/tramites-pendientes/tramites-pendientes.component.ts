import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { HttpClient } from '@angular/common/http';



//Tramites Pendientes
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
* @Trámites Pendientes.
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
    id: id.toString()+'00-PC-'+10+'-2021/12',
    tramite,
    fcreacion: new Date().toDateString(),
    estado: ESTADOS[Math.round(Math.random() * (ESTADOS.length - 1))],
    urls: URLS[Math.round(Math.random() * (URLS.length - 1))],
    color: COLORS[Math.round(Math.random() * (COLORS.length - 1))],
   };
}\n\n
/** Constants used to fill up our data base. */
const COLORS = ['maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple',
  'fuchsia', 'lime', 'teal', 'aqua', 'blue', 'navy', 'black', 'gray'];
const TRAMITE = [  'Trámite 1',
'Trámite 2',
'Trámite 3',
'Trámite 1',
'Trámite 2',
'Trámite 3',
'Trámite 1',
'Trámite 2',
'Trámite 3'];\n
export interface UserData {
  id: string;
  tramite: string;
  fcreacion: string;
  estado: string;
  urls: string;
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
  urls: string;
  color: string;
}

/** Constants used to fill up our data base. */
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
    urls: URLS[Math.round(id)],
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

  @ViewChild('matPaginator7', { static: true }) paginator7: MatPaginator;


  @ViewChild('sort7', { static: true }) sort7: MatSort;

  ngAfterViewInit() {}

  constructor(private http: HttpClient) {
    const users = Array.from({ length: 3 }, (_, k) => createNewUser(k + 1));

    // Assign the data to the data source for the table to render
    this.dataSource7 = new MatTableDataSource(users);
  }

  ngOnInit() {

    this.exampleMain = main;

    // Example 7
    this.dataSource7.paginator = this.paginator7;
    this.dataSource7.sort = this.sort7;
  }


  applyFilter7(filterValue: string) {
    this.dataSource7.filter = filterValue.trim().toLowerCase();

    if (this.dataSource7.paginator) {
      this.dataSource7.paginator.firstPage();
    }
  }
}
