import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import KTWizard from '../../../assets/js/components/wizard';
import { KTUtil } from '../../../assets/js/components/util';



@Component({
  selector: 'app-f-calculo-impuesto',
  templateUrl: './f-calculo-impuesto.component.html',
  styleUrls: ['./f-calculo-impuesto.component.scss']
})
export class FCalculoImpuestoComponent implements OnInit, AfterViewInit, OnDestroy {


  //@ViewChild('wizard', { static: true }) el: ElementRef;

  model: any = {
   
  
    nombreProyecto: 'Finca los Tucanes',
    montoc: '$1213,456.70',
  
  };
  submitted = false;
  wizard: any;

  constructor() {}

  ngOnInit() {
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


