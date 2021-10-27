import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { FCalculoImpuestoService } from './f-calculo-impuesto.service'
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-f-calculo-impuesto',
  templateUrl: './f-calculo-impuesto.component.html',
  styleUrls: ['./f-calculo-impuesto.component.scss']
})


export class FCalculoImpuestoComponent implements OnInit, AfterViewInit, OnDestroy {

  public formulario:FormGroup;
  
  submitted = false;
  wizard: any;

  constructor(private fCalculoImpuestoService:FCalculoImpuestoService, 
    private router:Router, private formBuilder:FormBuilder, private activatedRoute:ActivatedRoute)
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

    this.fCalculoImpuestoService.getRevision(this.activatedRoute.snapshot.params.tramiteId ).subscribe(resp =>{
      //console.log('Respuesta',resp);
      this.formulario.controls['nombre'].setValue(resp.t01_Rev_PermisoConstruccionMun.solicitudId.nombreProyecto);
    })
  }


  newCalculoImpuesto() 
  { 
    const data = {  
      "t01_Sol_PermisoConstruccionMun": {
        "solicitudId": 1,
        "montoPagar": this.formulario.controls.impuesto.value
      }
    }

    this.fCalculoImpuestoService.newCalculoImpuesto(data).subscribe(resp=>{
      console.log('respuesta:', resp)
      if(resp.codigo === 0){

        this.registerAlert();
      }
      else{
        this.failCalculo()
      }
    })
  }

   registerAlert(){  
    Swal.fire(  
      'Calculo de Impuesto Exitoso!',
      'Haga click para continuar',
      'success',
    ).then((result) => {
      this.router.navigate(['/tramites/tramites-a-revisar/tramites-a-revisar']);
    });  
  }

  failCalculo(){
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Calculo Fallido!'
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


