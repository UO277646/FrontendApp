import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  deleteProyect=async(arg0: any)=> {
    const response=await firstValueFrom(this.http.delete(this.apiUrl+"/delete/"+arg0))
    return response;
  }

  constructor(private http:HttpClient) { }
  
  private apiUrl = 'http://localhost:8080/proyectos';  // Cambia esto a la URL correcta si es diferente

  

  public getProjects=async(email:string,nombre:string)=> {
    const response=await firstValueFrom(this.http.get(this.apiUrl+"/find/proyectos/"+email+"/"+nombre))
    return response;
  }

  public createProject=async(nombreParam:any)=> {
    
    const response=await firstValueFrom(this.http.post(this.apiUrl+"/create",nombreParam))
    return response;
  }

  public getDetecciones=async(idProyecto:any)=> {
    const response=await firstValueFrom(this.http.get(this.apiUrl+"/find/detecciones/"+idProyecto))
    return response;
  }
  public getRestricciones=async(idProyecto:any)=> {
    const response=await firstValueFrom(this.http.get(this.apiUrl+"/find/restricciones/"+idProyecto))
    return response;
  }
  
}