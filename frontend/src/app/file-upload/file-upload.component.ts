import { Component, Injectable, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { UploadService } from '../services/upload.service';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.css'
})

export class FileUploadComponent{
  detectionResults: any = [];
  foto:any;
  imgSrc:any;
  constructor(private uploadService: UploadService) { }
  
  onFileSelected(event: any): void {
    this.foto = event.target.files[0];
    if (this.foto ) {
      // Aquí podrías agregar lógica para manejar la imagen subida
      console.log('Archivo seleccionado:', this.foto );

      // Puedes agregar lógica para enviar la imagen a un backend si es necesario
    }
  }
  onUpload=async()=>{
    const formData: FormData = new FormData();
    formData.append('image', this.foto, this.foto.name);
    const r= await this.uploadService.getDetectionResults(formData);
    if(r){
      const file = this.foto;
      const reader = new FileReader();
      
      reader.onload = (e: any) => {

        this.imgSrc = e.target.result;
        //console.log(this.imgSrc);
      };
      reader.readAsDataURL(file);
      this.detectionResults= r;
      console.log(this.detectionResults);
    }else{
      console.log("Error al cargar los datos");
    }
  }
}

