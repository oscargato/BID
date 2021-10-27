import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { FRegistrarpagoService } from './f-registrarpago.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import KTWizard from '../../../assets/js/components/wizard';
import { KTUtil } from '../../../assets/js/components/util';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-f-registrarpago',
  templateUrl: './f-registrarpago.component.html',
  styleUrls: ['./f-registrarpago.component.scss']
})

export class FRegistrarpagoComponent implements OnInit, AfterViewInit, OnDestroy {

  public formulario:FormGroup;
  public comprobantePago:string;
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
    private router:Router, private formBuilder:FormBuilder, 
    private activatedRoute:ActivatedRoute) {}

  ngOnInit() {

    this.formulario = this.formBuilder.group({
  		montoTotal:['', Validators.compose([
          Validators.required,
        ]),
      ],  

  		numeroRecibo:['', Validators.compose([
          Validators.required,
        ]),
      ],
      checkboxNumeroRecibo:[false, Validators.compose([
        Validators.required
        ]),
      ], 

  		fechaPago:['', Validators.compose([
          Validators.required,
        ]),
      ],
      checkboxFechaPago:[false, Validators.compose([
        Validators.required
        ]),
      ], 


  		montoPago:['', Validators.compose([
          Validators.required,
        ]),
      ],
      checkboxMontoPago:[false, Validators.compose([
        Validators.required
        ]),
      ], 

  		bancoPago:['', Validators.compose([
          Validators.required,
        ]),
      ],
      checkboxBancoPago:[false, Validators.compose([
        Validators.required
        ]),
      ], 

      comprobantePago:['', Validators.compose([
          Validators.required,
          ]),
      ],  
      checkboxComprobantePago:[false, Validators.compose([
        Validators.required
        ]),
      ], 

  });

    this.fRegistrarpagoService.getSubsanacion(1).subscribe(resp =>{
      console.log('Respuesta',resp);
      /* this.formulario.controls['montoTotal'].setValue(resp.t01_Rev_PermisoConstruccionMun.solicitudId.nombreProyecto);
      this.formulario.controls['numeroRecibo'].setValue(resp.t01_Rev_PermisoConstruccionMun.solicitudId.nombreProyecto);
      this.formulario.controls['fechaPago'].setValue(resp.t01_Rev_PermisoConstruccionMun.solicitudId.nombreProyecto);
      this.formulario.controls['montoPago'].setValue(resp.t01_Rev_PermisoConstruccionMun.solicitudId.nombreProyecto);
      this.formulario.controls['bancoPago'].setValue(resp.t01_Rev_PermisoConstruccionMun.solicitudId.nombreProyecto); 
      this.comprobantePago = resp.lstAdjuntos[0].urlAdjunto;*/
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

