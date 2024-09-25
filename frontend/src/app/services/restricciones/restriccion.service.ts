import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestriccionService {

  constructor(private http:HttpClient) { }
  private apiUrl = 'http://localhost:8080/restricciones';  // Cambia esto a la URL correcta si es diferente
  public createRestriccion=async(dto:any)=> {
    
    const response=await firstValueFrom(this.http.post(this.apiUrl+"/create",dto))
    return response;
  }
}
