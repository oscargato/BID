import { FTareaInspeccionService } from './f-tarea-inspeccion.service';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import KTWizard from '../../../assets/js/components/wizard';
import { KTUtil } from '../../../assets/js/components/util';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-f-tarea-inspeccion',
  templateUrl: './f-tarea-inspeccion.component.html',
  styleUrls: ['./f-tarea-inspeccion.component.scss']
})
export class FTareaInspeccionComponent implements OnInit, AfterViewInit, OnDestroy {

  public formulario:FormGroup;
  //@ViewChild('wizard', { static: true }) el: ElementRef;

  model: any = {
   
    tareaInspeccion: 'Si',
    observaciones: 'Por favor agregar información',
    nombreProyecto: 'Finca los Tucanes',
    inspeccion: '$1213,456.70',
  
  };
  submitted = false;
  wizard: any;

  constructor(private fTareaInspeccionService:FTareaInspeccionService, 
    private router:Router, private formBuilder:FormBuilder, 
    private activatedRoute:ActivatedRoute) {}

  ngOnInit() {

    this.formulario = this.formBuilder.group({
  		montoTotal:['', Validators.compose([
          Validators.required,
        ]),
      ],  

  		nombreProyecto:['', Validators.compose([
          Validators.required,
        ]),
      ],

      radioInspeccionAprobada:[true, Validators.compose([
        Validators.required
        ]),
      ], 


  		observaciones:['', Validators.compose([
          Validators.required,
        ]),
      ],
      informe:[false, Validators.compose([
        Validators.required
        ]),
      ], 

    });

  }

  /*openDialog3() {
    const dialogRef = this.dialog.open(Modal3Component, {
      height: '350px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }*/

  ngAfterViewInit(): void {}

  onSubmit() {
    this.submitted = true;
  }

  ngOnDestroy() {
    this.wizard = undefined;
  }
  
}


