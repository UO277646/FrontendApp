import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestriccionService {
  public  deleteRestriccion=async(arg0: any) =>{
    const response=await firstValueFrom(this.http.delete(this.apiUrl+"/delete/"+arg0))
    return response;
  }

  constructor(private http:HttpClient) { }
  private apiUrl = 'http://localhost:8080/restricciones';  // Cambia esto a la URL correcta si es diferente
  public createRestriccion=async(dto:any)=> {
    
    const response=await firstValueFrom(this.http.post(this.apiUrl+"/create",dto))
    return response;
  }
  public editRestriccion=async(idRestriccion:any,dto:any)=> {
    
    const response=await firstValueFrom(this.http.put(this.apiUrl+"/update/"+idRestriccion,dto))
    return response;
  }
}
