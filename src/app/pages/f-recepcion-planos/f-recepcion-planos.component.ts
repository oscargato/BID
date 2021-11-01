import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import KTWizard from '../../../assets/js/components/wizard';
import { KTUtil } from '../../../assets/js/components/util';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { FRecepcionPlanosService } from './f-recepcion-planos.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-f-recepcion-planos',
  templateUrl: './f-recepcion-planos.component.html',
  styleUrls: ['./f-recepcion-planos.component.scss']
})


export class FRecepcionPlanosComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('wizard', { static: true }) el: ElementRef;
  wizard: any;

  public formulario:FormGroup;

  constructor(private formBuilder:FormBuilder, 
              private activatedRoute:ActivatedRoute,
              private router: Router,
              private fRecepcionPlanosService:FRecepcionPlanosService){}

  ngOnInit(){
    this.initFormulario();
    this.getRevision();
  }


  initFormulario(){
    this.formulario = this.formBuilder.group({
  		nombre:['', Validators.compose([
                  Validators.required
                ]),
              ],              

      descripcion:['', Validators.compose([
                       Validators.required, 
                       Validators.minLength(5),
                       Validators.maxLength(500)
                    ]),  
                  ],
                       
      provincia:['', Validators.compose([
                     Validators.required
                  ]),    
                ],
                
      distrito:['', Validators.compose([
                    Validators.required
                  ]),
               ],

      corregimiento:['', Validators.compose([
                         Validators.required
                      ]),  
                    ],
                    
      tipoPropiedad:['', Validators.compose([
                         Validators.required
                        ]),  
                    ],

      codigoUbicacion:['', Validators.compose([
                           Validators.required, 
                           Validators.minLength(5),
                           Validators.maxLength(50)
                          ]), 
                      ],
                      
      finca:['', Validators.compose([
                 Validators.required, 
                 Validators.minLength(5),
                 Validators.maxLength(60)
                ]),  
            ],
             
      tomo:['', Validators.compose([
                Validators.required, 
                Validators.minLength(5),
                Validators.maxLength(50)
              ]),  
           ],
    
      folio:['', Validators.compose([
                 Validators.required, 
                 Validators.minLength(5),
                 Validators.maxLength(50)
                ]),    
            ],
            
      constructor:['', Validators.compose([
                       Validators.required, 
                       Validators.minLength(5),
                       Validators.maxLength(120)
                    ]),
                  ],                       

      propietarioTerreno:['', Validators.compose([
                              Validators.required, 
                              Validators.minLength(5),
                              Validators.maxLength(120)
                           ]),   
                         ],

      valorObra:['', Validators.compose([
                     Validators.required, 
                     Validators.minLength(2),
                     Validators.maxLength(20)
                    ]),
                ], 

      nombreProfesionalIdoneo:['', Validators.compose([ 
                                   Validators.required, 
                                   Validators.minLength(2),
                                   Validators.maxLength(120)
                                  ]),
                              ], 

      numeroIdoneidad:['', Validators.compose([
                           Validators.required, 
                           Validators.minLength(5),
                           Validators.maxLength(120)
                          ]),
                      ],

      nombreProfesionalResidente:['', Validators.compose([ 
                                      Validators.required, 
                                      Validators.minLength(2),
                                      Validators.maxLength(120)
                                    ]),
                                  ],

      registroPublico:['', Validators.compose([
                           Validators.required
                          ]),
                      ],
                      
      certificacionIdoneo:['',Validators.compose([
                              Validators.required
                            ]), 
                          ],

      planos:['', Validators.compose([
                  Validators.required
               ]), 
             ],
                     
      noviable:[false, Validators.compose([
                       Validators.required
                ]),
             ],                     
    });
  }

  getRevision(){
    this.fRecepcionPlanosService.getRevision(this.activatedRoute.snapshot.params.idRevision).subscribe(resp=>{
        console.log(resp);

    })
  }

  recibirPlanos(){}












    register(){  
      Swal.fire(  
        'Revision de Tramite Exitosa!',
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
        text: 'Revision Fallida!'
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
  { this.wizard = undefined; } 
}