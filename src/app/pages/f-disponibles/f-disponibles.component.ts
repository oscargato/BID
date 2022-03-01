import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import  KTWizard  from '../../../assets/js/components/wizard';
import { KTUtil } from '../../../assets/js/components/util';
import { DisponiblesService } from './disponibles.service';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

interface DatosI{
  id:number;
  nombre:string;
}

@Component({
  selector: 'app-f-disponibles',
  templateUrl: './f-disponibles.component.html',
  styleUrls: ['./f-disponibles.component.scss'],
})

export class FDisponiblesComponent implements OnInit, AfterViewInit 
{ @ViewChild('wizard', { static: true }) el: ElementRef;
  wizard: any;

  public formulario:FormGroup;
  public provincias:Array<any> = [];
  public distritos:Array<any> = [];
  public corregimientos:Array<any> = [];
  public tipoPropiedad:Array<DatosI> = [];
  public tipoProp:number =-1;
  public indexProv:number=-1;
  public indexDist:number=-1;
  public indexCorr:number=-1;
  public provincia:string;  
  public distrito:string;
  public corregimiento:string;
  public tipoP:string;
  public solicitante:any;
  public solicitanteTramiteId:number;
  public documentosAdjuntar:Array<any> = [];
  public uploadRegistroPublico:File;
  public uploadIdoneidad:File;
  public uploadPLanos:File;
  public loadRegistro: boolean;
  public loadIdoneidad: boolean;
  public loadPLanos: boolean;
  public urlRegistroPublico:string;
  public urlIdoneidad:string;
  public urlPLanos:string;
  public adjuntoRegistroPublico:string;
  public adjuntoCertificacionIdoneo:string;
  public adjuntoPlanos:string;
  public parametro:number;

  constructor(private disponiblesService:DisponiblesService, 
              private router: Router, 
              private formBuilder:FormBuilder,
              private activatedRoute:ActivatedRoute){}


  ngOnInit(){
    this.formulario = this.formBuilder.group({
  		nombre:['', Validators.compose([Validators.required,Validators.minLength(2),Validators.maxLength(100)]),],  		
      descripcion:['', Validators.compose([Validators.required,Validators.minLength(5),Validators.maxLength(500)]),],                       
      provincia:['', Validators.compose([Validators.required]),],                        
      distrito:['', Validators.compose([Validators.required]),],                       
      corregimiento:['', Validators.compose([Validators.required]),],                 
      tipoPropiedad:['', Validators.compose([Validators.required]),],

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
                Validators.minLength(1),
                Validators.maxLength(1)
              ]),  
           ],
                       
      folio:['', Validators.compose([
                 Validators.required, 
                 Validators.minLength(1),
                 Validators.maxLength(1)
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
    });

    this.loadRegistro = false;
    this.loadIdoneidad = false;
    this.loadPLanos = false;
    
    this.solicitantesTramites(); 
  }


  fileChangeRegistro(element){
    this.uploadRegistroPublico = element.target.files[0];
    const formData = new FormData();
    formData.append('file', this.uploadRegistroPublico);
    this.disponiblesService.uploadArchivo(formData,this.solicitanteTramiteId).subscribe((resp) => { 
      this.urlRegistroPublico = resp.name;
      this.loadRegistro = true;
      let adjunto = this.formulario.controls['registroPublico'].value
      this.adjuntoRegistroPublico = adjunto.substring(adjunto.indexOf("h",10) + 2)
      this.archivoCargado();
    });
  }
  

  fileChangeIdoneo(element){
    this.uploadIdoneidad = element.target.files[0];
    const formData = new FormData();
    formData.append('file', this.uploadIdoneidad);
    this.disponiblesService.uploadArchivo(formData,this.solicitanteTramiteId).subscribe((resp) => {
      this.urlIdoneidad = resp.name;
      this.loadIdoneidad = true;
      let adjunto = this.formulario.controls['certificacionIdoneo'].value
      this.adjuntoCertificacionIdoneo = adjunto.substring(adjunto.indexOf("h",10) + 2)
      this.archivoCargado();
    });
  }  


  fileChangePlanos(element){
    this.uploadPLanos = element.target.files[0];
    const formData = new FormData();
    formData.append('file', this.uploadPLanos);
    this.disponiblesService.uploadArchivo(formData,this.solicitanteTramiteId).subscribe((resp) => {      
      this.urlPLanos = resp.name;
      this.loadPLanos = true;
      let adjunto = this.formulario.controls['planos'].value
      this.adjuntoPlanos = adjunto.substring(adjunto.indexOf("h",10) + 2)
      this.archivoCargado();
    });
  } 
  

  solicitantesTramites(){
    this.disponiblesService.solicitantesTramites(Number(localStorage.getItem('id')), this.activatedRoute.snapshot.params.Id).subscribe(resp=>{
      this.solicitanteTramiteId = resp.solicitanteTramiteId;
      this.getSolicitud(this.solicitanteTramiteId);
    })
  }


  getSolicitud(idSolicitud:number){
    this.provincias = [];
    this.distritos = [];
    this.corregimientos = [];

    this.disponiblesService.getSolicitud(idSolicitud).subscribe(resp=>{
      
      let i = 0;
      resp.lstProvincias.forEach(element => {
        this.provincias[i] = element;
        i++;
      });


      let j = 0;
      resp.lstTiposPropiedad.forEach(element => {
        this.tipoPropiedad[j] = { id:element.tipoPropiedadId, nombre:element.descripcion  };
        j++;
      });
      

      let k = 0;
      resp.lstTiposDocumentos.forEach(element => {
        this.documentosAdjuntar[k] = element;
        k++;
      });
      
      this.solicitante = resp.solicitante;
    })
  }


  getCargaDistritos(idProvincia:number){
    if(idProvincia >= 0){
      this.distritos = [];
      this.corregimientos = [];
      const id = this.provincias[idProvincia].provinciaId
      this.provincia = this.provincias[idProvincia].nomProvincia
      this.disponiblesService.getDistritos(id).subscribe(resp=>{
        let i = 0;
        resp.forEach(element => {
          this.distritos[i] = element;
          i++;
        });
      })
    }
  }

  
  getCargaCorregimientos(idDistrito:number){
    if(idDistrito >= 0){
      this.corregimientos = [];
      const id = this.distritos[idDistrito].distritoId
      this.distrito = this.distritos[idDistrito].nomDistrito
      this.disponiblesService.getCorregimientos(id).subscribe(resp=>{
        let i = 0;
        resp.forEach(element => {
          this.corregimientos[i] = element;
          i++;
        });
      })      
    }
  }

  getCarga(idCorregimiento:number){
    this.corregimiento = this.corregimientos[idCorregimiento].nomCorregimiento
  }
 
  getTipoPropiedad(){
    console.log('tipoProp',this.tipoProp)
    if(this.tipoProp > -1){
      this.tipoP = this.tipoPropiedad[this.tipoProp].nombre;
    }
  }

  onRegistrar(){
    const data = {
        "t01_Sol_PermisoConstruccionMun":{    
            "solicitanteTramiteId": { 
                "solicitanteTramiteId": this.solicitanteTramiteId
            },
            "nombreProyecto":this.formulario.controls['nombre'].value,
            "descripcionProyecto": this.formulario.controls['descripcion'].value,
            "codUbicacion": this.formulario.controls['codigoUbicacion'].value,
            "finca": this.formulario.controls['finca'].value,
            "tomo": this.formulario.controls['tomo'].value,
            "folio": this.formulario.controls['folio'].value,
            "nombreResp": this.formulario.controls['constructor'].value,
            "nombrePropietarioTerreno": this.formulario.controls['propietarioTerreno'].value,
            "nombreProfesionalIdoneo": this.formulario.controls['nombreProfesionalIdoneo'].value,
            "numIdoneidad": this.formulario.controls['numeroIdoneidad'].value, 
            "nombreProfesionalResidente": this.formulario.controls['nombreProfesionalResidente'].value, 
            "valorAproxObra": this.formulario.controls['valorObra'].value, 
            "tipoPropiedadId": {
                "descripcion": this.tipoPropiedad[this.tipoProp].nombre,
                "tipoPropiedadId": this.tipoPropiedad[this.tipoProp].id,
            },
            "provinciaProyectoId":{
               "provinciaId": this.provincias[this.indexProv].provinciaId,
                "regionId": {
                    "regionId": this.provincias[this.indexProv].regionId.regionId,
                    "codRegion": this.provincias[this.indexProv].regionId.codRegion,
                    "nomRegion": this.provincias[this.indexProv].regionId.nomRegion
                },
                "codProvincia": this.provincias[this.indexProv].codProvincia,
                "nomProvincia": this.provincias[this.indexProv].nomProvincia,
            },
            "distritoProyectoId":{
                "distritoId": this.distritos[this.indexDist].distritoId,
                "provinciaId": {
                    "provinciaId": this.distritos[this.indexDist].provinciaId.provinciaId,
                    "regionId": {
                        "regionId": this.distritos[this.indexDist].provinciaId.regionId.regionId,
                        "codRegion": this.distritos[this.indexDist].provinciaId.regionId.codRegion,
                        "nomRegion": this.distritos[this.indexDist].provinciaId.regionId.nomRegion,
                    },
                    "codProvincia": this.distritos[this.indexDist].provinciaId.codProvincia,
                    "nomProvincia": this.distritos[this.indexDist].provinciaId.nomProvincia,
                },
                "codDistrito": this.distritos[this.indexDist].codDistrito,
                "nomDistrito": this.distritos[this.indexDist].nomDistrito,
            },
            "corregimientoProyectoId":{
                "corregimientoId": this.corregimientos[this.indexCorr].corregimientoId,
                "distritoId": {
                    "distritoId": this.corregimientos[this.indexCorr].distritoId.distritoId,
                    "provinciaId": {
                        "provinciaId": this.corregimientos[this.indexCorr].distritoId.provinciaId.provinciaId,
                        "regionId": {
                            "regionId": this.corregimientos[this.indexCorr].distritoId.provinciaId.regionId.regionId,
                            "codRegion": this.corregimientos[this.indexCorr].distritoId.provinciaId.regionId.codRegion,
                            "nomRegion": this.corregimientos[this.indexCorr].distritoId.provinciaId.regionId.nomRegion,
                        },
                        "codProvincia": this.corregimientos[this.indexCorr].distritoId.provinciaId.codProvincia,
                        "nomProvincia": this.corregimientos[this.indexCorr].distritoId.provinciaId.nomProvincia,
                    },
                    "codDistrito": this.corregimientos[this.indexCorr].distritoId.codDistrito,
                    "nomDistrito": this.corregimientos[this.indexCorr].distritoId.nomDistrito,
                },
                "codCorregimiento": this.corregimientos[this.indexCorr].codCorregimiento,
                "nomCorregimiento": this.corregimientos[this.indexCorr].nomCorregimiento,
            }
        },
        "lstAdjuntos": [{
            "solicitanteTramiteId": { 
                "solicitanteTramiteId": this.solicitanteTramiteId
            },
            "tipoDocumentoId": { 
                "tipoDocumentoId": 1 
            },
            "solicitanteId": {
                "solicitanteId": this.solicitante.solicitanteId,
            },
            "nombre": this.adjuntoRegistroPublico,
            "urlAdjunto": this.urlRegistroPublico
        },
        {
            "solicitanteTramiteId": { 
                "solicitanteTramiteId": this.solicitanteTramiteId
            },
            "tipoDocumentoId": { 
                "tipoDocumentoId": 2 
            },
            "solicitanteId": {
                "solicitanteId": this.solicitante.solicitanteId,
            },
            "nombre": this.adjuntoCertificacionIdoneo,
            "urlAdjunto": this.urlIdoneidad
        },
        {
            "solicitanteTramiteId": { 
                "solicitanteTramiteId": this.solicitanteTramiteId
            },
            "tipoDocumentoId": { 
                "tipoDocumentoId": 5
            },
            "solicitanteId": {
                "solicitanteId": this.solicitante.solicitanteId,
            },
            "nombre": this.adjuntoPlanos,
            "urlAdjunto": this.urlPLanos
        }]    
    };
    
    this.disponiblesService.registrarSolicitud(data).subscribe(resp=>{
      console.log('Respuesta',resp)
      if(resp.codigo === 0)
      { this.registerExitoso();}
      else
      { this.failRegister();  }
    })
  }


  registerExitoso(){  
    Swal.fire(  
      'Solicitud de Trámite Exitosa!',
      'Haga click para continuar',
      'success',
    ).then((result) => {
      this.router.navigate(['/tramites/tramites-disponibles/tramites-disponibles']);
    });  
  }

  failRegister(){
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Solicitud de Trámite Fallida!'
    })
  }

  archivoCargado(){
    Swal.fire({ position: 'center',
                icon: 'success',
                title: 'Archivo Cargado Exitosamente',
                showConfirmButton: false,
                timer: 1500
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
}
