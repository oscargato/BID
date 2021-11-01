import { FTareaInspeccionService } from './f-tarea-inspeccion.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-f-tarea-inspeccion',
  templateUrl: './f-tarea-inspeccion.component.html',
  styleUrls: ['./f-tarea-inspeccion.component.scss']
})


export class FTareaInspeccionComponent implements OnInit {

  public formulario:FormGroup;

  constructor(private fTareaInspeccionService:FTareaInspeccionService, 
              private router:Router, 
              private formBuilder:FormBuilder, 
              private activatedRoute:ActivatedRoute){}

  ngOnInit() {

    this.formulario = this.formBuilder.group({  

  		nombreProyecto:['', Validators.compose([
          Validators.required,
        ]),
      ],

      inspeccion:[true, Validators.compose([
                        Validators.required
                  ]),
                 ], 

  		observaciones:['', Validators.compose([
          Validators.required,
        ]),
      ],

      informe:['', Validators.compose([
        Validators.required
        ]),
      ], 

    });

    this.fTareaInspeccionService.getRevision(this.activatedRoute.snapshot.params.idRevision ).subscribe(resp =>{
      console.log('Respuesta',resp);

      this.formulario.controls['nombreProyecto'].setValue(resp.t01_Rev_PermisoConstruccionMun.solicitudId.nombreProyecto);
    })
  }


  newRevisionInspeccion(){

    const data = {}
    
    this.fTareaInspeccionService.newRevisionInspeccion(data).subscribe(resp=>{
  
      if(resp.codigo === 0){
        this.registerAlert();
      }
      else{
        this.failRevision()
      }
    })
    
  }

  registerAlert(){  
    Swal.fire(  
      'Revision de Tramite Exitosa!',
      'Haga click para continuar',
      'success',
    ).then((result) => {
      this.router.navigate(['/tramites/tramites-a-revisar/tramites-a-revisar']);
    });  
  }

  failRevision(){
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Revision Fallida!'
    })
  }
}