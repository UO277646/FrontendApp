import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeteccionService {
  constructor(private http:HttpClient) { }
  private apiUrl = 'http://localhost:8080/detecciones';  // Cambia esto a la URL correcta si es diferente
  

  public getDeteccionesDia=async(proyecto:any,dia:any)=> {
    
    const response=await firstValueFrom(this.http.get(this.apiUrl+"/get/"+proyecto+"/"+dia))
    return response;
  }
  
}
