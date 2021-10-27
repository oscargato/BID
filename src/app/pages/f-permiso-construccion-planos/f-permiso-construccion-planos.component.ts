import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { FPermisoConstruccionPlanosService } from './f-permiso-construccion-planos.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import KTWizard from '../../../assets/js/components/wizard';
import { KTUtil } from '../../../assets/js/components/util';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-f-permiso-construccion-planos',
  templateUrl: './f-permiso-construccion-planos.component.html',
  styleUrls: ['./f-permiso-construccion-planos.component.scss']
})


export class FPermisoConstruccionPlanosComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('wizard', { static: true }) el: ElementRef;

  public formulario:FormGroup;
  
  wizard: any;

  constructor(private fPermisoConstruccionPlanosService:FPermisoConstruccionPlanosService,
              private formBuilder:FormBuilder,
              private activatedRoute:ActivatedRoute,
              private router:Router) {}

  ngOnInit() {
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


    this.fPermisoConstruccionPlanosService.getRevision(1).subscribe(resp =>{
      console.log('Respuesta',resp);
    })
  }


  fileDownloadPlanos()
  {}

  fileDownloadIdoneo()
  {}

  fileDownloadRegistro()
  {}


  newRevision(){
    const data = {}
  
    this.fPermisoConstruccionPlanosService.newRevisionPlanos(data).subscribe(resp=>{
      if(resp.codigo === 0){
        this.register();
      }
      else{
        this.fail()
      }
    })
   }
  
  
  
  
    register(){  
      Swal.fire(  
        'Subsanacion de Tramite Exitosa!',
        'Haga click para continuar',
        'success',
      ).then((result) => {
        this.router.navigate(['/tramites/tramites-a-revisar/tramites-a-revisar']);
      });  
    }
  
    fail(){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Subsanacion Fallida!'
      })
    }
  





  ngAfterViewInit(): void {
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

  ngOnDestroy() 
  { this.wizard = undefined;  }
}