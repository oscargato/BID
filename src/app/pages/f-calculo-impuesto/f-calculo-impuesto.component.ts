import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { FCalculoImpuestoService } from './f-calculo-impuesto.service'
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import KTWizard from '../../../assets/js/components/wizard';
import { KTUtil } from '../../../assets/js/components/util';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';



@Component({
  selector: 'app-f-calculo-impuesto',
  templateUrl: './f-calculo-impuesto.component.html',
  styleUrls: ['./f-calculo-impuesto.component.scss']
})
export class FCalculoImpuestoComponent implements OnInit, AfterViewInit, OnDestroy {

  public formulario:FormGroup;
  
  //@ViewChild('wizard', { static: true }) el: ElementRef;

  submitted = false;
  wizard: any;

  constructor(private fCalculoImpuestoService:FCalculoImpuestoService, 
    private router:Router,private formBuilder:FormBuilder)
    {}

  ngOnInit() {


    this.formulario = this.formBuilder.group({
  		nombre:['', Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(100)
        ]),
      ],

  		impuesto:['', Validators.compose([
          Validators.required,
        ]),
      ],
    });

    this.fCalculoImpuestoService.getRevision(1).subscribe(resp =>{
      console.log('Respuesta',resp);
      this.formulario.controls['nombre'].setValue(resp.t01_Rev_PermisoConstruccionMun.solicitudId.nombreProyecto);
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


