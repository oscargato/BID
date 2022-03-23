import { Component, OnInit } from '@angular/core';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { ActivarFuncionarioService } from './activar-funcionario.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

interface Funcionarios {
  nombreCompleto:string; 
  email:string;
  tipoRevisor:string; 
  activo:boolean;
  revisorId:number;
  tipoRevisorId:number;
  usuarioId:number;
}

@Component({
  selector: 'app-activar-funcionario',
  templateUrl: './activar-funcionario.component.html',
  styleUrls: ['./activar-funcionario.component.scss']
})

export class ActivarFuncionarioComponent implements OnInit {
  public Funcionarios: Array<Funcionarios>;
  public desde:number = 0;
  public hasta:number = 10;
  public pageSize = 10;
  public orderCorreo:boolean = false;
  public orderRevisor:boolean = false;
  public orderNombre:boolean = false;
  public step:number = 0;

  constructor(private matPaginatorIntl:MatPaginatorIntl,
              private router: Router,  
              private activarFuncionarioService:ActivarFuncionarioService){
    this.matPaginatorIntl.itemsPerPageLabel = "Registros por página";
    this.Funcionarios = [];
  }

  ngOnInit(): void {
    this.getAllListadoRevisores();
  }

  getAllListadoRevisores(){
    this.activarFuncionarioService.getAllListadoRevisores().subscribe(resp=>{
      console.log('resp',resp)
      let i = 0;
      resp.forEach(element =>{
        this.Funcionarios[i] = {
            nombreCompleto:element.nombreCompleto,
            email:element.email,
            tipoRevisor:element.tipoRevisor.descripcion, 
            activo:element.activo,
            revisorId:element.revisorId,
            tipoRevisorId:element.tipoRevisor.tipoRevisorId,
            usuarioId:element.usuarioId,
        };
        i++; 
      });
      console.log('Arreglo',this.Funcionarios);
    })
  }

  status(usuarioId:number,activo:boolean,indice:number,funcionario:Funcionarios){
    if(activo)
    { this.activarFuncionarioService.activarRevisor(usuarioId).subscribe(resp=>{        
        this.Funcionarios[indice] = {  
          nombreCompleto:funcionario.nombreCompleto,
          email:funcionario.email,
          tipoRevisor:funcionario.tipoRevisor, 
          activo:true,
          revisorId:funcionario.revisorId,
          tipoRevisorId:funcionario.tipoRevisorId,
          usuarioId:funcionario.usuarioId,
        }
      });
    }
    else
    { this.activarFuncionarioService.desactivarRevisor(usuarioId).subscribe(resp=>{      
        this.Funcionarios[indice] = {  
          nombreCompleto:funcionario.nombreCompleto,
          email:funcionario.email,
          tipoRevisor:funcionario.tipoRevisor, 
          activo:false,
          revisorId:funcionario.revisorId,
          tipoRevisorId:funcionario.tipoRevisorId,
          usuarioId:funcionario.usuarioId,
        }
      });
    }

    this.cambioExitoso()
  }

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

  cambioExitoso(){  
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Su estatus se cambio exitosamente',
      showConfirmButton: false,
      timer: 2500
    })  
  }
}
