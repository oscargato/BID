import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import KTWizard from '../../../assets/js/components/wizard';
import { KTUtil } from '../../../assets/js/components/util';


@Component({
  selector: 'app-f-recepcion-planos',
  templateUrl: './f-recepcion-planos.component.html',
  styleUrls: ['./f-recepcion-planos.component.scss']
})


export class FRecepcionPlanosComponent implements OnInit, AfterViewInit, OnDestroy {


  @ViewChild('wizard', { static: true }) el: ElementRef;

  model: any = {
    pname: 'Edicion John Wick',
    dproyecto: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sed mollis sem, sit amet dictum tortor. Aenean tortor ex, suscipit tempus viverra in, lacinia vel sem.',
    provincia: '8',
    distrito: '8',
    corregimiento: '8',
    tpropiedad: 'Tipo 2',
    cubicacion: 'La Floresta',
    finca: '6',
    tomo: '10',
    folio: '6',
    cresponsable: 'John Wick',
    pterreno: 'regular',
    valorobra: '$12,213,456.78',
    npidonio: 'Mrs Wick',
    nidoneidad: '456-879-123',
    npresidente: '3072',
    rpublico: '123-564-789',
    cidoneo: 'VIC',
    ccedula: '6-706-1850',
    pasaporte: '1-231-456',
    campos: 'John Wick',
    observaciones: 'John Wick',
  };

  submitted = false;
  wizard: any;

  constructor(){}

  ngOnInit(){}




  onSubmit(){}

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