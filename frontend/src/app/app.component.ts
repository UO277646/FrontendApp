import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import {FileUploadComponent} from "./file-upload/file-upload.component";
import {HeaderComponent} from "./header/header.component";
// file-upload.module.ts (o en el módulo principal de tu aplicación si file-upload no tiene un módulo propio)
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app.routes';
import { filter } from 'rxjs';
import { ModalBorrarComponent } from "./modal-borrar/modal-borrar.component";



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FileUploadComponent, HeaderComponent, AppRoutingModule, ModalBorrarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-17-app';
  showHeader = true;
  
  constructor(private router: Router) {
    // Detecta cambios de ruta
    
  }
   ngOnInit(){
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      if(this.router.url=="/"){
        this.showHeader = false;
      }else{
        this.showHeader = true;
      }
    });
   }
   
}
