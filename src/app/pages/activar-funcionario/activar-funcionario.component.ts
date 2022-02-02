import { Component, OnInit } from '@angular/core';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-activar-funcionario',
  templateUrl: './activar-funcionario.component.html',
  styleUrls: ['./activar-funcionario.component.scss']
})

export class ActivarFuncionarioComponent implements OnInit {

  public Funcionarios: Array<any>;
  public desde:number = 0;
  public hasta:number = 10;
  public pageSize = 10;
  public orderCorreo:boolean = false;
  public orderRevisor:boolean = false;
  public orderNombre:boolean = false;
  public step:number = 0;

  constructor(private matPaginatorIntl:MatPaginatorIntl){
    this.matPaginatorIntl.itemsPerPageLabel = "Registros por página";
    this.Funcionarios = [];
  }

  ngOnInit(): void {}

  sortNombre(nombre:string){
    this.orderNombre = !this.orderNombre;
    
    let direccion = this.orderNombre ? 1: -1;
    this.Funcionarios.sort(function(a,b){
      if(a[nombre] < b[nombre]){
        return -1 * direccion;
      }else if(a[nombre] > b[nombre]){
        return 1 * direccion;
      }
    })
    this.step = 1;    
  }

  sortCorreo(correo:string){
    this.orderCorreo = !this.orderCorreo;
    
    let direccion = this.orderCorreo ? 1: -1;
    this.Funcionarios.sort(function(a,b){
      if(a[correo] < b[correo]){
        return -1 * direccion;
      }else if(a[correo] > b[correo]){
        return 1 * direccion;
      }
    })
    this.step = 2;    
  }

  sortRevisor(revisor:string){
    this.orderRevisor = !this.orderRevisor;
    
    let direccion = this.orderRevisor ? 1: -1;
    this.Funcionarios.sort(function(a,b){
      if(a[revisor] < b[revisor]){
        return -1 * direccion;
      }else if(a[revisor] > b[revisor]){
        return 1 * direccion;
      }
    })
    this.step = 3;
  }


  cambiarpagina(e:PageEvent){
    this.desde = e.pageIndex * e.pageSize;
    this.hasta = this.desde + e.pageSize;
  }
}
