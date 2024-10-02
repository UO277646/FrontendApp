import { Component, Injectable, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { UploadService } from '../services/upload.service';
import { ActivatedRoute } from '@angular/router';

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
  message!: string;
  imagePath: any;
  url!: string | ArrayBuffer | null;
  proyectoId: any=[]

  constructor(private uploadService: UploadService,private route: ActivatedRoute) { }
  
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
  }
  onUpload=async()=>{
    const formData: FormData = new FormData();
    this.proyectoId=this.route.snapshot.paramMap.get('id');
    formData.append('image', this.foto, this.foto.name);
    formData.append("proyectId",this.proyectoId);
    console.log(this.proyectoId);
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

