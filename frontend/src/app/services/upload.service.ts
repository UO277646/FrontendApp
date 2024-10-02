import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http:HttpClient) { }
  
  private apiUrl = 'http://localhost:8080/detect';  // Cambia esto a la URL correcta si es diferente

  

  public getDetectionResults=async(foto:any)=> {
    const response=await firstValueFrom(this.http.post(this.apiUrl,foto));
    return response;
  }
  
}
