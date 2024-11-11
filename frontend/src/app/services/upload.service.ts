import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { ObjetoImagenResponse } from '../file-upload/file-upload.component';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  getProcedurePDF=async(arg0: any)=> {
    
    const response = await firstValueFrom(
      this.http.get(this.apiPdf + arg0, { responseType: 'arraybuffer' }) // Especifica 'arraybuffer' para manejar binarios
    );
    console.log(response);
    return response;
  }
  

  constructor(private http:HttpClient) { }
  
  private apiUrl = 'http://localhost:8080/detect';  // Cambia esto a la URL correcta si es diferente

  private apiPdf = 'http://localhost:8080/generate/'; 

  public getDetectionResults=async(foto:any)=> {
    const response:ObjetoImagenResponse=await firstValueFrom(this.http.post<ObjetoImagenResponse>(this.apiUrl,foto));
    return response;
  }
  
}

