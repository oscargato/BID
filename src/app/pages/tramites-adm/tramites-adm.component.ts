import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tramites-adm',
  templateUrl: './tramites-adm.component.html',
  styleUrls: ['./tramites-adm.component.scss']
})

export class TramitesAdmComponent implements OnInit {

  public Tramites:Array<any>;
  public desde:number = 0;
  public hasta:number = 10;
  public pageSize = 10;

  constructor(private router: Router){
    this.Tramites = [];
  }

  ngOnInit(): void {}

  tramitesRevisar(){
    this.router.navigate([`tramites/alta-Funcionario/alta-Funcionario`]);
  }

  cambiarpagina(e:PageEvent)
  { this.desde = e.pageIndex * e.pageSize;
    this.hasta = this.desde + e.pageSize;
  }
}
