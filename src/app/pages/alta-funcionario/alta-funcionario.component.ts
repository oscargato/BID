import { Component, OnInit } from '@angular/core';
import { AltaFuncionarioService } from './alta-funcionario.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

interface TipoFuncionario{
  id:number;
  nombre:string;
}

interface Tramite{
  obj:any;
  seleccionado:boolean;
}
@Component({
  selector: 'app-alta-funcionario',
  templateUrl: './alta-funcionario.component.html',
  styleUrls: ['./alta-funcionario.component.scss']
})

export class AltaFuncionarioComponent implements OnInit {
  public TiposFuncionarios: Array<TipoFuncionario> = [];
  public provincias:Array<any> = [];
  public distritos:Array<any> = [];
  public dist:Array<any> = [];
  public tramites:Array<Tramite> = [];
  public provincia:string;
  public formulario:FormGroup;
  public indexFunc:number=-1;
  public indexProv:number=-1;
  public indexDist:number=-1;  
  public Funcionario:TipoFuncionario;
  public tram:Array<any> = [];

  constructor(private altaFuncionarioService:AltaFuncionarioService,
              private formBuilder:FormBuilder,
              private router:Router){}

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
  		tipoFuncinario:['', Validators.compose([Validators.required]),],
      provincia:['', Validators.compose([Validators.required]),],
      nombre:['', Validators.compose([Validators.required,Validators.minLength(5),Validators.maxLength(60)]),],
      email: ['',Validators.compose([Validators.required,Validators.email,Validators.minLength(3),Validators.maxLength(360), ]),],
      password: ['',Validators.compose([Validators.required,Validators.minLength(3),Validators.maxLength(100),]),],
      distrito:['', Validators.compose([Validators.required]),],
    });

    this.getDatosFuncionarios();
  }
  
  getDatosFuncionarios(){
    this.altaFuncionarioService.getDatosFuncionarios().subscribe(resp=>{
      console.log('respu',resp);
      
      resp.lstTiposRevisores.forEach(element => {
        const data = { id:element.tipoRevisorId, nombre:element.descripcion };
        this.TiposFuncionarios.push(data);        
      });      
      
      resp.lstProvincias.forEach(element => {
        this.provincias.push(element);        
      });
            
      resp.lstDistritos.forEach(element => {
        this.distritos.push(element);  
      });      
    })
  }
  

  tipoFuncionario(tipo:any){
    console.log('tipo',tipo);
  }


  getCargaDistritos(idProvincia:number){
    if(idProvincia >= 0){
      const id = this.provincias[idProvincia].provinciaId      
      this.dist = this.distritos.filter(resp => resp.provinciaId.provinciaId == id);            
    }
  }

  changeDistrito(idDistrito:number){
    this.altaFuncionarioService.getTramitesByDistritoId(this.dist[idDistrito].distritoId).subscribe(resp=>{
      console.log('resp',resp);
      this.tramites = [];
      resp.forEach(element =>{
        const obj = {   obj:element, seleccionado:false }
        this.tramites.push(obj);
      })
      console.log('tramites',this.tramites);
    })
  }

  seleccionar(indice:number){
    this.tramites[indice].seleccionado = !this.tramites[indice].seleccionado;    
  }

  crearRevisor(){
    this.tram = [];
    for (let i = 0; i < this.tramites.length; i++)
    { if(this.tramites[i].seleccionado)
      { this.tram.push(this.tramites[i].obj);  }
    }

    const data = 
    { "nombre": this.formulario.controls['nombre'].value,
      "password": this.formulario.controls['password'].value,
      "tiposRevisores":{  "tipoRevisorId": this.TiposFuncionarios[this.indexFunc].id,
                          "descripcion": this.TiposFuncionarios[this.indexFunc].nombre,
                       },
      "provinciaId":{
          "provinciaId": this.provincias[this.indexProv].provinciaId,
          "regionId": { "regionId": this.provincias[this.indexProv].regionId.regionId,
                        "codRegion": this.provincias[this.indexProv].regionId.codRegion,
                        "nomRegion": this.provincias[this.indexProv].regionId.nomRegion,
                      },
          "codProvincia": this.provincias[this.indexProv].codProvincia,
          "nomProvincia": this.provincias[this.indexProv].nomProvincia,
      },
      "email": this.formulario.controls['email'].value,
      "distritoId": {
          "distritoId": this.dist[this.indexDist].distritoId,
          "provinciaId": {  "provinciaId": this.dist[this.indexDist].provinciaId.provinciaId,
                            "regionId": { "regionId": this.dist[this.indexDist].provinciaId.regionId.regionId,
                                          "codRegion": this.dist[this.indexDist].provinciaId.regionId.codRegion,
                                          "nomRegion": this.dist[this.indexDist].provinciaId.regionId.nomRegion,
                                        },
                            "codProvincia": this.dist[this.indexDist].provinciaId.codProvincia,
                            "nomProvincia": this.dist[this.indexDist].provinciaId.nomProvincia,
          },
          "codDistrito": this.dist[this.indexDist].codDistrito,
          "nomDistrito": this.dist[this.indexDist].nomDistrito,
      },
      "lstTramites":this.tram,
    }

    console.log('Objeto',data);

    this.altaFuncionarioService.crearRevisor(data).subscribe(resp=>{
      console.log(resp)
      if(resp.codigo === 0)
      { this.registerAlert(); }
      else
      { this.failSubsanar() }      
    })
  }


  registerAlert(){  
    Swal.fire(  
      'Registro Exitoso!',
      'Haga click para continuar',
      'success',
    ).then((result) => {
      this.router.navigate(['/tramites/tramites-adm/tramites-adm']);
    });  
  }


  failSubsanar(){
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Creacion Fallida!'
    })
  }  
}