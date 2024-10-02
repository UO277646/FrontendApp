import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {FileUploadComponent} from "./file-upload/file-upload.component";
import {HeaderComponent} from "./header/header.component";
// file-upload.module.ts (o en el módulo principal de tu aplicación si file-upload no tiene un módulo propio)
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app.routes';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FileUploadComponent, HeaderComponent,AppRoutingModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-17-app';
}
