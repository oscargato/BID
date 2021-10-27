import { Component, OnInit } from '@angular/core';
import { FRevisionPagoService } from './f-revision-pago.service'
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-f-revision-pago',
  templateUrl: './f-revision-pago.component.html',
  styleUrls: ['./f-revision-pago.component.scss']
})


export class FRevisionPagoComponent implements OnInit {

  public formulario:FormGroup;

  constructor(private fRevisionPagoService:FRevisionPagoService, 
              private router:Router,
              private formBuilder:FormBuilder,
              private activatedRoute:ActivatedRoute){}

  ngOnInit(){
    this.iniciarFormulario();
    this.getRevision();
  }


  iniciarFormulario(){
    this.formulario = this.formBuilder.group({
  		nombre:['', Validators.compose([
                  Validators.required
                ]),
              ],

      montototal:['', Validators.compose([
                      Validators.required
                    ]),
                 ],              

      numRecibo:['', Validators.compose([
                     Validators.required
                    ]),  
                  ],

      checkboxNumRecibo:[false, Validators.compose([
                                Validators.required
                          ]),
                        ],                  

      fechaPago:['', Validators.compose([
                     Validators.required
                  ]),
                ],

      checkboxFechaPago:['', Validators.compose([
                             Validators.required
                          ]),
                        ],                
                       
      metodoPago:['', Validators.compose([
                      Validators.required
                    ]),    
                 ],

      checkboxMetodoPago:['', Validators.compose([
                      Validators.required
                   ]),    
                 ],                 
                
      nombreEntidad:['', Validators.compose([
                         Validators.required
                      ]),
                    ],

      checkboxNombreEntidad:['', Validators.compose([
                                 Validators.required
                              ]),
                            ],

      comprobantePago:['', Validators.compose([
                         Validators.required
                      ]),
                    ],
                    
      checkboxComprobantePago:['', Validators.compose([
                                   Validators.required
                                ]),
                              ],
    });
  }


  getRevision(){
    this.fRevisionPagoService.getRevision(this.activatedRoute.snapshot.params.tramiteId).subscribe(resp =>{
      console.log('Respuesta',resp);
      this.formulario.controls['nombre'].setValue(resp.t01_Rev_PermisoConstruccionMun.solicitudId.nombreProyecto);
    })
  }


 newRevisonPago(){
  const data = {
      
  
  }

  this.fRevisionPagoService.newRevisionPago(data).subscribe(resp=>{
    console.log(resp)
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