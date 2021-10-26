import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { FRegistrarpagoService } from './f-registrarpago.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import KTWizard from '../../../assets/js/components/wizard';
import { KTUtil } from '../../../assets/js/components/util';


@Component({
  selector: 'app-f-registrarpago',
  templateUrl: './f-registrarpago.component.html',
  styleUrls: ['./f-registrarpago.component.scss']
})

export class FRegistrarpagoComponent implements OnInit, AfterViewInit, OnDestroy {


  //@ViewChild('wizard', { static: true }) el: ElementRef;

  model: any = {
   
    banco: 'Banco Nacional de Panamá',
    nrecibo: '123a-456b',
    montototal: '$12,213,456.78',
    montopago: '$1213,456.70',
  
  };
  submitted = false;
  wizard: any;

  constructor(private fRegistrarpagoService:FRegistrarpagoService, 
    private router:Router) {}

  ngOnInit() {
    this.fRegistrarpagoService.getSubsanacion(1).subscribe(resp =>{
      console.log('Respuesta',resp);
    })

  }


  newSubsanacion(){

    const data = {}
  
    this.fRegistrarpagoService.newSubsanacion(data).subscribe(resp=>{
  
      if(resp.codigo === 0){
        this.registerAlert();
      }
      else{
        this.failSubsanar()
      }
    })
   }
  
  
  
  
    registerAlert(){  
      Swal.fire(  
        'Subsanacion de Tramite Exitosa!',
        'Haga click para continuar',
        'success',
      ).then((result) => {
        this.router.navigate(['/tramites/tramites-a-revisar/tramites-a-revisar']);
      });  
    }
  
    failSubsanar(){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Subsanacion Fallida!'
      })
    }
  
  

  ngAfterViewInit(): void {}

  onSubmit() {
    this.submitted = true;
  }

  ngOnDestroy() {
    this.wizard = undefined;
  }
  
}

