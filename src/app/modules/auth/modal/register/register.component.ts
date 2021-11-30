import { Component, OnInit } from '@angular/core';
import { AuthHTTPService } from '../../../auth/_services/auth-http/auth-http.service';
import { Router, UrlTree } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
  private hash:string;
  private urlTree:UrlTree;

  constructor(private authHTTPService:AuthHTTPService, 
              private router:Router){}

  ngOnInit(){}

  updateCorrecto(){
    this.urlTree = this.router.parseUrl(this.router.url);
    this.hash = this.urlTree.queryParams.hash;
    
    const data = 
    { "hash": this.hash, }

    this.authHTTPService.updateCorrecto(data).subscribe(resp=>{
      console.log('Respuesta',resp)
      this.router.navigate(['/auth/login']);
    })
  }
}