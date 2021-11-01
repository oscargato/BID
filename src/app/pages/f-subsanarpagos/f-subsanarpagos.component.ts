import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { FSubsanarpagosService } from './f-subsanarpagos.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-f-subsanarpagos',
  templateUrl: './f-subsanarpagos.component.html',
  styleUrls: ['./f-subsanarpagos.component.scss']
})


export class FSubsanarpagosComponent implements OnInit {

  public formulario:FormGroup;
  public archivoRegistroPublico:string;
  public tramiteIdRegistroPublico:number;
  
  constructor(private fSubsanarpagosService:FSubsanarpagosService, 
              private router:Router, 
              private formBuilder:FormBuilder, 
              private activatedRoute:ActivatedRoute){}

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
        Validators.required
       ]),
   ],

      checkboxComprobantePago:[false, 
          Validators.compose([
                Validators.required
             ]),
           ],       

    });
    
    this.fSubsanarpagosService.getSubsanacion(this.activatedRoute.snapshot.params.idSolicitud ).subscribe(resp =>{
      console.log('Respuesta',resp);

      /* this.formulario.controls['montoTotal'].setValue(resp.t01_Rev_PermisoConstruccionMun.solicitudId.nombreProyecto);
      this.formulario.controls['numeroRecibo'].setValue(resp.t01_Rev_PermisoConstruccionMun.solicitudId.nombreProyecto);
      this.formulario.controls['fechaPago'].setValue(resp.t01_Rev_PermisoConstruccionMun.solicitudId.nombreProyecto);
      this.formulario.controls['montoPago'].setValue(resp.t01_Rev_PermisoConstruccionMun.solicitudId.nombreProyecto);
      this.formulario.controls['bancoPago'].setValue(resp.t01_Rev_PermisoConstruccionMun.solicitudId.nombreProyecto); */
    })
   
  }


  fileDownloadComprobante(){
    console.log('Nombre Archivo',this.tramiteIdRegistroPublico);
    console.log('Nombre Archivo',this.archivoRegistroPublico);
    this.fSubsanarpagosService.getDownloadFile(this.tramiteIdRegistroPublico,this.archivoRegistroPublico).subscribe(resp=>{
      saveAs(resp,this.archivoRegistroPublico),
      error => console.error(error)
    });
  }


  newSubsanacion(){

    const data = {}
  
    this.fSubsanarpagosService.newSubsanacion(data).subscribe(resp=>{
  
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
}

