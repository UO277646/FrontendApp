import { Component, Injectable, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { UploadService } from '../services/upload.service';
import { DeteccionService } from '../services/detecciones/deteccion.service';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.css'
})

export class FileUploadComponent{
  async deleteDeteccion(id: number) {
    await this.detectionService.deleteDeteccion(id);
    this.detectionResults.objetos = this.detectionResults.objetos.filter((item: { idDeteccion: number; }) => item.idDeteccion !== id);
    
  }
  detectionResults: any = [];
  foto:any;
  imgSrc:any;
  message!: string;
  imagePath: any;
  url!: string | ArrayBuffer | null;
  proyectoId: any=[]

  constructor(private uploadService: UploadService,private detectionService:DeteccionService,private route: ActivatedRoute) { }
  
  onFileSelected(event: any): void {
    const files = event.target.files;
    if (files.length === 0)
        return;

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
        this.message = "Only images are supported.";
        return;
    }

    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
        this.url = reader.result; 
    }
    this.foto = event.target.files[0];
    console.log(this.foto);
  }
  onUpload=async()=>{
    this.detectionResults=[];
    const formData: FormData = new FormData();
    this.proyectoId=this.route.snapshot.paramMap.get('id');
    console.log(this.foto.name);
    formData.append('image', this.foto, this.foto.name);
    formData.append("proyectId",this.proyectoId);
    console.log(this.proyectoId);
    const r:ObjetoImagenResponse= await this.uploadService.getDetectionResults(formData);
    if(r){
      const file = this.foto;
      const reader = new FileReader();
      
      reader.onload = (e: any) => {

        this.imgSrc = e.target.result;
        //console.log(this.imgSrc);
      };
      reader.readAsDataURL(file);
      this.detectionResults= r;
      this.url='data:image/png;base64,'+r.image;
      console.log(this.detectionResults);
    }else{
      console.log("Error al cargar los datos");
    }
  }
}
export interface DetectionResult {
  x: number;
  y: number;
  weight: number;
  height: number;
  confidence: number;
  label: string;
}

export interface ObjetoImagenResponse {
  objetos: DetectionResult[];
  image: string;  // Asumiendo que la imagen será una cadena base64
}
