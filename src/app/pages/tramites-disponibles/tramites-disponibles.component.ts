import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { TramitesDisponiblesService } from '../../../app/pages/tramites-disponibles/tramites-disponibles.service';
import { Router } from '@angular/router';

export interface UserData {
  id: string;
  tramite: string;
  fcreacion: string;
  estado: string;
  color: string;
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
  const tramite = TRAMITE[Math.round(Math.random() * (TRAMITE.length - 1))];

  return {
    id: id.toString()+'00-PC-'+10+'-2021/12',
    tramite,
    fcreacion: new Date().toDateString(),
    estado: 'Verificar',
    color: COLORS[Math.round(Math.random() * (COLORS.length - 1))],
  };
}


@Component({
  selector: 'app-tramites-tramites-disponibles',
  templateUrl: './tramites-disponibles.component.html',
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


export class TramitesDisponiblesComponent implements OnInit, AfterViewInit {

  displayedColumns7:string[] = ['tramite'];
  dataSource7: MatTableDataSource<UserData>;
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  tramites:Array<any>;
  tramiteId:string;


  @ViewChild('matPaginator7', { static: true }) paginator7: MatPaginator;
  @ViewChild('sort7', { static: true }) sort7: MatSort;

  ngAfterViewInit() {}

  constructor(private tramitesDisponiblesService:TramitesDisponiblesService,
              private router: Router)
  { const users = Array.from({ length: 100 }, (_, k) => createNewUser(k + 1));
    this.dataSource7 = new MatTableDataSource(users);
    this.tramites = [];
  }


  ngOnInit(){
    //this.exampleMain = main;
    this.dataSource7.paginator = this.paginator7;
    this.dataSource7.sort = this.sort7;
    this.getTramitesDisponibles();
  }


  applyFilter7(filterValue: string)
  { this.dataSource7.filter = filterValue.trim().toLowerCase();
    if (this.dataSource7.paginator)
    { this.dataSource7.paginator.firstPage(); }
  }


  getTramitesDisponibles(){
    this.tramitesDisponiblesService.tramitesDisponibles().subscribe(resp => {
      
      console.log('Tramites',resp);
      let i = 0;
      resp.forEach(element => {
        this.tramites[i] = { nombre:element.nombre, tramiteId:element.tramiteId } ;
        //this.tramiteId = element.tramiteId;
        i++;
      });
      //localStorage.setItem("tramiteId", this.tramiteId);
    })
  }


  tramitesDisponibles(tramiteId:number){
    //this.tramitesDisponiblesService.callback.emit(tramiteId);
    this.router.navigate([`/form/f-disponibles/${tramiteId}`]);

  }
}
