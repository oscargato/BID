import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { FCalculoImpuestoService } from './f-calculo-impuesto.service'
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import KTWizard from '../../../assets/js/components/wizard';
import { KTUtil } from '../../../assets/js/components/util';



@Component({
  selector: 'app-f-calculo-impuesto',
  templateUrl: './f-calculo-impuesto.component.html',
  styleUrls: ['./f-calculo-impuesto.component.scss']
})
export class FCalculoImpuestoComponent implements OnInit, AfterViewInit, OnDestroy {


  //@ViewChild('wizard', { static: true }) el: ElementRef;

  model: any = {
   
  
    nombreProyecto: 'Finca los Tucanes',
    montoc: '$1213,456.70',
  
  };
  submitted = false;
  wizard: any;

  constructor(private fCalculoImpuestoService:FCalculoImpuestoService, 
    private router:Router)
    {}

  ngOnInit() {
    this.fCalculoImpuestoService.getRevision(1).subscribe(resp =>{
      console.log('Respuesta',resp);
    })
  }


  newRevisonPago(){

    const data = {}
  
    this.fCalculoImpuestoService.newCalculoImpuesto(data).subscribe(resp=>{
  
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


