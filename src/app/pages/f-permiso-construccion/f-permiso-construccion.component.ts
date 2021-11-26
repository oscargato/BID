import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import KTWizard from '../../../assets/js/components/wizard';
import { KTUtil } from '../../../assets/js/components/util';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { FPermisoConstruccionService } from './f-permiso-construccion.service';
import { saveAs } from 'file-saver';


@Component({
  selector: 'app-f-permiso-construccion',
  templateUrl: './f-permiso-construccion.component.html',
  styleUrls: ['./f-permiso-construccion.component.scss']
})


export class FPermisoConstruccionComponent implements OnInit, AfterViewInit {

  @ViewChild('wizard', { static: true }) el: ElementRef;

  wizard: any;

  public formulario:FormGroup;
  public archivoRegistroPublico:string;
  public tramiteIdRegistroPublico:number;
  public archivoIdoneo:string;
  public tramiteIdIdoneo:number;
  public archivoPlanos:string;
  public tramiteIdPlanos:number;
  public revisionId:number;
  public montoPagar:boolean;
  public montoTotal:boolean;
  public pagoElectronico:boolean;
  public pagoManual:boolean;
  public revisionNegada:boolean;
  public solicitudId:number;
  public adjuntos: Array<any>
  public solicitanteTramiteId:number;

  constructor(private formBuilder:FormBuilder, 
              private router: Router,
              private activatedRoute:ActivatedRoute,
              private permisoConstruccionService:FPermisoConstruccionService){
                this.adjuntos = [];
              }

  ngOnInit(){
    this.formulario = this.formBuilder.group({
  		nombre:['', Validators.compose([
                  Validators.required
                ]),
              ],

      checkboxNombre:[false, Validators.compose([
                             Validators.required
                        ]),
                     ],              

      descripcion:['', Validators.compose([
                       Validators.required, 
                       Validators.minLength(5),
                       Validators.maxLength(500)
                    ]),  
                  ],

      checkboxDescripcion:[false, Validators.compose([
                                  Validators.required
                            ]),
                          ],

                       
      provincia:['', Validators.compose([
                     Validators.required
                  ]),    
                ],
                
      checkboxProvincia:[false, Validators.compose([
                                Validators.required
                            ]),
                          ],
 
      distrito:['', Validators.compose([
                    Validators.required
                  ]),
               ],

      checkboxDistrito:[false, Validators.compose([
                               Validators.required
                        ]),
                      ],               
                       
      corregimiento:['', Validators.compose([
                         Validators.required
                      ]),  
                    ],
                    
      checkboxCorregimiento:[false, Validators.compose([
                                    Validators.required
                          ]),
                        ],                    

      tipoPropiedad:['', Validators.compose([
                         Validators.required
                        ]),  
                    ],

      checkboxTipoPropiedad:[false, Validators.compose([
                                    Validators.required
                              ]),
                            ],                    

      codigoUbicacion:['', Validators.compose([
                           Validators.required, 
                           Validators.minLength(5),
                           Validators.maxLength(50)
                          ]), 
                      ],
                      
      checkboxCodigoUbicacion:[false, Validators.compose([
                                   Validators.required
                              ]),
                            ],                      

      finca:['', Validators.compose([
                 Validators.required, 
                 Validators.minLength(5),
                 Validators.maxLength(60)
                ]),  
            ],
            
      checkboxFinca:[false, Validators.compose([
                             Validators.required
                          ]),
                        ],            
                       
      tomo:['', Validators.compose([
                Validators.required, 
                Validators.minLength(5),
                Validators.maxLength(50)
              ]),  
           ],

      checkboxTomo:[false, Validators.compose([
                        Validators.required
                    ]),
                  ],           
                       
      folio:['', Validators.compose([
                 Validators.required, 
                 Validators.minLength(5),
                 Validators.maxLength(50)
                ]),    
            ],

      checkboxFolio:[false, Validators.compose([
                            Validators.required
                      ]),
                    ],      
                       
      constructor:['', Validators.compose([
                       Validators.required, 
                       Validators.minLength(5),
                       Validators.maxLength(120)
                    ]),
                  ],                       

      checkboxConstructor:[false, Validators.compose([
                               Validators.required
                          ]),
               ],

      propietarioTerreno:['', Validators.compose([
                              Validators.required, 
                              Validators.minLength(5),
                              Validators.maxLength(120)
                           ]),   
                         ],

      checkboxPropietarioTerreno:[false, Validators.compose([
                                      Validators.required
                                  ]),
                                 ],

      valorObra:['', Validators.compose([
                     Validators.required, 
                     Validators.minLength(2),
                     Validators.maxLength(20)
                    ]),
                ], 

      checkboxValorObra:[false, Validators.compose([
                             Validators.required
                          ]),
                        ],                

      nombreProfesionalIdoneo:['', Validators.compose([ 
                                   Validators.required, 
                                   Validators.minLength(2),
                                   Validators.maxLength(120)
                                  ]),
                              ], 

      checkboxNombreProfesional:[false, Validators.compose([
                                     Validators.required
                                  ]),
                                ],                              

      numeroIdoneidad:['', Validators.compose([
                           Validators.required, 
                           Validators.minLength(5),
                           Validators.maxLength(120)
                          ]),
                      ],

      checkboxNumeroIdoneidad:[false, Validators.compose([
                                   Validators.required
                                ]),
                              ],

      nombreProfesionalResidente:['', Validators.compose([ 
                                      Validators.required, 
                                      Validators.minLength(2),
                                      Validators.maxLength(120)
                                    ]),
                                  ],

      checkboxNombreProfesionalResidente:[false, Validators.compose([
                                                 Validators.required
                                            ]),
                                        ],

      registroPublico:['', Validators.compose([
                           Validators.required
                          ]),
                      ],

      checkboxRegistroPublico:[false, Validators.compose([
                                   Validators.required
                                ]),
                              ],                      

      certificacionIdoneo:['',Validators.compose([
                              Validators.required
                            ]), 
                          ],

      checkboxCertificacionIdoneo:[false, Validators.compose([
                            Validators.required
                         ]),
                       ],                          

      planos:['', Validators.compose([
                  Validators.required
               ]), 
             ],
             
      checkboxPlanos:[false, Validators.compose([
                             Validators.required
                        ]),
                     ], 
                     
      noviable:[false, Validators.compose([
                       Validators.required
                ]),
             ],                     
    });
  
    this.getRevision();
  }


  getRevision(){
    this.permisoConstruccionService.getRevision(this.activatedRoute.snapshot.params.idRevision).subscribe(resp=>{
        console.log('Respuesta Cosntruccion',resp);
        this.formulario.controls['nombre'].setValue(resp.t01_Rev_PermisoConstruccionMun.solicitudId.nombreProyecto);
        this.formulario.controls['descripcion'].setValue(resp.t01_Rev_PermisoConstruccionMun.solicitudId.descripcionProyecto);
        this.formulario.controls['provincia'].setValue(resp.t01_Rev_PermisoConstruccionMun.solicitudId.provinciaProyectoId.nomProvincia);
        this.formulario.controls['distrito'].setValue(resp.t01_Rev_PermisoConstruccionMun.solicitudId.distritoProyectoId.nomDistrito);
        this.formulario.controls['corregimiento'].setValue(resp.t01_Rev_PermisoConstruccionMun.solicitudId.corregimientoProyectoId.nomCorregimiento);
        this.formulario.controls['tipoPropiedad'].setValue(resp.t01_Rev_PermisoConstruccionMun.solicitudId.tipoPropiedadId.descripcion);
        this.formulario.controls['codigoUbicacion'].setValue(resp.t01_Rev_PermisoConstruccionMun.solicitudId.codUbicacion);
        this.formulario.controls['finca'].setValue(resp.t01_Rev_PermisoConstruccionMun.solicitudId.finca);
        this.formulario.controls['tomo'].setValue(resp.t01_Rev_PermisoConstruccionMun.solicitudId.tomo);
        this.formulario.controls['folio'].setValue(resp.t01_Rev_PermisoConstruccionMun.solicitudId.folio);
        this.formulario.controls['constructor'].setValue(resp.t01_Rev_PermisoConstruccionMun.solicitudId.nombreResp);
        this.formulario.controls['propietarioTerreno'].setValue(resp.t01_Rev_PermisoConstruccionMun.solicitudId.nombrePropietarioTerreno);
        this.formulario.controls['valorObra'].setValue(resp.t01_Rev_PermisoConstruccionMun.solicitudId.valorAproxObra);
        this.formulario.controls['nombreProfesionalIdoneo'].setValue(resp.t01_Rev_PermisoConstruccionMun.solicitudId.nombreProfesionalIdoneo);
        this.formulario.controls['numeroIdoneidad'].setValue(resp.t01_Rev_PermisoConstruccionMun.solicitudId.numIdoneidad);
        this.formulario.controls['nombreProfesionalResidente'].setValue(resp.t01_Rev_PermisoConstruccionMun.solicitudId.nombreProfesionalResidente);
        this.archivoRegistroPublico = resp.lstAdjuntos[0].urlAdjunto;
        this.tramiteIdRegistroPublico = resp.lstAdjuntos[0].solicitanteTramiteId.solicitanteTramiteId;
        this.archivoIdoneo = resp.lstAdjuntos[1].urlAdjunto;
        this.tramiteIdIdoneo = resp.lstAdjuntos[1].solicitanteTramiteId.solicitanteTramiteId;
        this.archivoPlanos = resp.lstAdjuntos[2].urlAdjunto;
        this.tramiteIdPlanos = resp.lstAdjuntos[2].solicitanteTramiteId.solicitanteTramiteId;
        this.revisionId = parseInt(this.activatedRoute.snapshot.params.idRevision);//resp.t01_Rev_PermisoConstruccionMun.revisionId;
        this.montoPagar = resp.t01_Rev_PermisoConstruccionMun.montoPagar;
        this.montoTotal = resp.t01_Rev_PermisoConstruccionMun.montoTotal;
        this.pagoElectronico = resp.t01_Rev_PermisoConstruccionMun.pagoElectronico;
        this.pagoManual = resp.t01_Rev_PermisoConstruccionMun.pagoManual;
        this.revisionNegada = resp.t01_Rev_PermisoConstruccionMun.revisionNegada;

        this.solicitudId = parseInt(this.activatedRoute.snapshot.params.solicitudId);
        console.log('solicitudId',this.activatedRoute.snapshot.params.solicitudId)
        this.solicitanteTramiteId = resp.t01_Rev_PermisoConstruccionMun.solicitudId.solicitanteTramiteId.solicitanteTramiteId;

        let i = 0;
        resp.lstAdjuntos.forEach(element => {
          this.adjuntos[i] = element
          i++;
        });
    })
  }


  fileDownloadRegistro(){
    this.permisoConstruccionService.getDownloadFile(this.tramiteIdRegistroPublico,this.archivoRegistroPublico).subscribe(resp=>{
      saveAs(resp,this.archivoRegistroPublico),
      error => console.error(error)
    });
  }

  fileDownloadIdoneo(){
    this.permisoConstruccionService.getDownloadFile(this.tramiteIdIdoneo,this.archivoIdoneo).subscribe(resp=>{
      saveAs(resp,this.archivoIdoneo),
      error => console.error(error)      
    });
  } 

  fileDownloadPlanos(){
    this.permisoConstruccionService.getDownloadFile(this.tramiteIdPlanos,this.archivoPlanos).subscribe(resp=>{
      saveAs(resp,this.archivoPlanos),
      error => console.error(error)      
    });    
  }



  onSubsanar() 
  { 
    const hoy = new Date();

    let incorrecto:boolean;

    if(this.formulario.controls['checkboxNombre'].value === false &&
       this.formulario.controls['checkboxDescripcion'].value === false &&
       this.formulario.controls['checkboxProvincia'].value === false &&
       this.formulario.controls['checkboxDistrito'].value === false &&
       this.formulario.controls['checkboxCorregimiento'].value === false &&
       this.formulario.controls['checkboxTipoPropiedad'].value === false &&
       this.formulario.controls['checkboxCodigoUbicacion'].value === false &&
       this.formulario.controls['checkboxFinca'].value === false &&
       this.formulario.controls['checkboxTomo'].value === false &&
       this.formulario.controls['checkboxFolio'].value === false &&
       this.formulario.controls['checkboxConstructor'].value === false &&
       this.formulario.controls['checkboxPropietarioTerreno'].value === false &&
       this.formulario.controls['checkboxValorObra'].value === false &&
       this.formulario.controls['checkboxNombreProfesional'].value === false &&
       this.formulario.controls['checkboxNumeroIdoneidad'].value === false &&
       this.formulario.controls['checkboxNombreProfesionalResidente'].value === false &&
       this.formulario.controls['checkboxRegistroPublico'].value === false &&
       this.formulario.controls['checkboxCertificacionIdoneo'].value === false &&
       this.formulario.controls['checkboxPlanos'].value === false)
      { incorrecto = false; }
      else
      { incorrecto = true; }

    const data = {
      "incorrecto": incorrecto,
        "t01_Rev_PermisoConstruccionMun": {
            "codUbicacion": this.formulario.controls['checkboxCodigoUbicacion'].value,
            "comentarios": "string",
            "comentariosCierre": "string",
            "comentariosInternos": "string",
            "comprobacionNegada": true,
            "corregimientoProyectoId": this.formulario.controls['checkboxCorregimiento'].value, 
            "descripcionProyecto": this.formulario.controls['checkboxDescripcion'].value,
            "distritoProyectoId": this.formulario.controls['checkboxDistrito'].value,
            "fechaRevision": hoy.toISOString(),//"2021-09-09T15:13:32.947Z", 
            "fechaRevisionInspeccion": null,
            "fechaRevisionPlanos": null,
            "finca": this.formulario.controls['checkboxFinca'].value,
            "folio": this.formulario.controls['checkboxFolio'].value,
            "montoPagar": this.montoPagar,
            "montoPagarFunc": true,
            "montoTotal": this.montoTotal,
            "noViable": this.formulario.controls['noviable'].value,
            "nombreEntidadEvaluadora": true,
            "nombreEntidadEvaluadoraFunc": true,
            "nombreProfesionalIdoneo": this.formulario.controls['checkboxNombreProfesional'].value,
            "nombreProfesionalResidente": this.formulario.controls['checkboxNombreProfesionalResidente'].value,
            "nombrePropietarioTerreno": this.formulario.controls['checkboxPropietarioTerreno'].value,
            "nombreProyecto": this.formulario.controls['checkboxNombre'].value,
            "nombreResp": this.formulario.controls['checkboxConstructor'].value,
            "numIdoneidad": this.formulario.controls['checkboxNumeroIdoneidad'].value,
            "observacionComprobacion": "string",
            "observaciones": "string",
            "pagoElectronico": this.pagoElectronico,
            "pagoManual": this.pagoManual,
            "provinciaProyectoId": this.formulario.controls['checkboxProvincia'].value,
            "revisionId": this.revisionId,
            "revisionNegada": this.revisionNegada,
            "revisorId": {
                "revisorId": 2,
                "tipoRevisorId": {
                    "descripcion": "Secretaria Municipio",
                    "tipoRevisorId": Number(localStorage.getItem('id'))
                }
            },
            "solicitudConfirmada": true,
            "solicitudId": {
          "solicitudId": this.solicitudId
        },
            "tipoPropiedadId": this.formulario.controls['checkboxTipoPropiedad'].value,
            "tomo": this.formulario.controls['checkboxTomo'].value,
            "valorAproxObra": this.formulario.controls['checkboxValorObra'].value,
        },

      "lstAdjuntos": [
        { "adjuntoId": this.adjuntos[0].adjuntoId, 
          "fecha": hoy.toISOString(),
          "fechaRevision": hoy.toISOString(),
          "nombre": this.adjuntos[0].nombre,
          "rechazado": this.formulario.controls['checkboxRegistroPublico'].value,
          "solicitanteTramiteId": { 
            "solicitanteTramiteId": this.solicitanteTramiteId,
          },
          "tipoDocumentoId": {
          "diasVigencia": 0, 
          "nombre": this.adjuntos[0].nombre, 
          "tipoDocumentoId": this.adjuntos[0].tipoDocumentoId.tipoDocumentoId,
          },
          "urlAdjunto": this.adjuntos[0].urlAdjunto, 
              "solicitanteId": {
                  "solicitanteId": this.adjuntos[0].solicitanteId.solicitanteId,
              }    
        },
        {
          "adjuntoId": this.adjuntos[1].adjuntoId,
          "fecha": hoy.toISOString(),
          "fechaRevision": hoy.toISOString(),
          "nombre": this.adjuntos[1].nombre,
          "rechazado": this.formulario.controls['checkboxCertificacionIdoneo'].value,
          "solicitanteTramiteId": { 
            "solicitanteTramiteId": this.solicitanteTramiteId,
          },
          "tipoDocumentoId": {
          "diasVigencia": 0,
          "nombre": this.adjuntos[1].nombre,
          "tipoDocumentoId": this.adjuntos[1].tipoDocumentoId.tipoDocumentoId,
          },
          "urlAdjunto": this.adjuntos[1].urlAdjunto,
              "solicitanteId": {
                  "solicitanteId": this.adjuntos[1].solicitanteId.solicitanteId,
              }
        },
        {
          "adjuntoId": this.adjuntos[2].adjuntoId,
          "fecha": hoy.toISOString(),
          "fechaRevision": hoy.toISOString(),
          "nombre": this.adjuntos[2].nombre,
          "rechazado": this.formulario.controls['checkboxPlanos'].value,
          "solicitanteTramiteId": { 
            "solicitanteTramiteId": this.solicitanteTramiteId,
          },
          "tipoDocumentoId": {
          "diasVigencia": 0,
          "nombre": this.adjuntos[2].nombre,
          "tipoDocumentoId": this.adjuntos[2].tipoDocumentoId.tipoDocumentoId,
          },
          "urlAdjunto": this.adjuntos[2].urlAdjunto,
              "solicitanteId": {
                  "solicitanteId": this.adjuntos[2].solicitanteId.solicitanteId,
              }
        }
        ]
    }

    console.log('data',data)
 
    this.permisoConstruccionService.newRevision(data).subscribe(resp=>{
      if(resp.codigo === 0)
      { this.registerAlert(); }
      else
      { this.failSubsanar()
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

















  

  ngAfterViewInit(): void 
  {
    this.wizard = new KTWizard(this.el.nativeElement, {
      startStep: 1,
      clickableSteps: true
    });

    this.wizard.on('beforeNext', (wizardObj) => {
      if (wizardObj.currentStep === 1) {
        if (this.wizard.invalid) {
            this.wizard.markAllAsTouched();
            wizardObj.stop();
          }
      }
    });

    this.wizard.on('change', () => {
      setTimeout(() => {
        KTUtil.scrollTop();
      }, 500);
    });
  }
}