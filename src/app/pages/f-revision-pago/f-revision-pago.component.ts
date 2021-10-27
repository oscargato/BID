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
    this.fRevisionPagoService.getRevision(this.activatedRoute.snapshot.params.id).subscribe(resp =>{
      console.log('Respuesta',resp);
      this.formulario.controls['nombre'].setValue(resp.t01_Rev_PermisoConstruccionMun.solicitudId.nombreProyecto);
    })
  }


 newRevisonPago(){
  const data = {
      "incorrecto": false,
        "t01_Rev_PermisoConstruccionMun": {
            "codUbicacion": true,
            "comentarios": "string",
            "comentariosCierre": "string",
            "comentariosInternos": "string",
            "comprobacionNegada": true,
            "corregimientoProyectoId": true,
            "descripcionProyecto": true,
            "distritoProyectoId": true,
            "fechaRevision": "2021-09-09T15:13:32.947Z",
            "fechaRevisionInspeccion": null,
            "fechaRevisionPlanos": null,
            "finca": true,
            "folio": true,
            "montoPagar": true,
            "montoPagarFunc": true,
            "montoTotal": true,
            "noViable": false,
            "nombreEntidadEvaluadora": true,
            "nombreEntidadEvaluadoraFunc": true,
            "nombreProfesionalIdoneo": true,
            "nombreProfesionalResidente": true,
            "nombrePropietarioTerreno": true,
            "nombreProyecto": true,
            "nombreResp": true,
            "numIdoneidad": true,
            "observacionComprobacion": "string",
            "observaciones": "string",
            "pagoElectronico": true,
            "pagoManual": true,
            "provinciaProyectoId": true,
            "revisionId": 1,
            "revisionNegada": true,
            "revisorId": {
                "revisorId": 2,
                "tipoRevisorId": {
                    "descripcion": "Secretaria Municipio",
                    "tipoRevisorId": 2
                }
            },
            "solicitudConfirmada": true,
            "solicitudId": {
          "solicitudId": 1
        },
            "tipoPropiedadId": true,
            "tomo": true,
            "valorAproxObra": true
        },
      "lstAdjuntos": [
        {
          "adjuntoId": 1,
          "fecha": "2021-09-09T15:13:32.947Z",
          "fechaRevision": "2021-09-09T15:13:32.947Z",
          "nombre": "Registro Público",
          "rechazado": true,
          "tipoDocumentoId": {
          "diasVigencia": 0,
          "nombre": "Registro Público",
          "tipoDocumentoId": 1
          },
          "urlAdjunto": "RegistroPublico1.pdf",
               "solicitanteId": {
                   "solicitanteId":1
               }
        }
        ]
  }

  this.fRevisionPagoService.newRevisionPago(data).subscribe(resp=>{

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