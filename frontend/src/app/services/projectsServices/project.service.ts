import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  public editProject=async(id:any,nombreParam:any)=> {
    console.log(nombreParam)
    const response=await firstValueFrom(this.http.put(this.apiUrl+"/update/"+id,nombreParam))
    return response;
  }
  deleteProyect=async(arg0: any)=> {
    const response=await firstValueFrom(this.http.delete(this.apiUrl+"/delete/"+arg0))
    return response;
  }

  constructor(private http:HttpClient) { }
  
  private apiUrl = 'https://764c-156-35-95-17.ngrok-free.app/proyectos';  // Cambia esto a la URL correcta si es diferente

  

  
  public getProjects = async (email: string, nombre: string) => {
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
    });
  
    const response = await firstValueFrom(
      this.http.get(this.apiUrl+"/find/proyectos/"+email+"/"+nombre, { headers })
    );
  
    return response;
  };
  public createProject=async(nombreParam:any)=> {
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
    });
    const response=await firstValueFrom(this.http.post(this.apiUrl+"/create",nombreParam, { headers }))
    return response;
  }

  public getDetecciones=async(idProyecto:any)=> {
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
    });
    const response=await firstValueFrom(this.http.get(this.apiUrl+"/find/detecciones/"+idProyecto, { headers }))
    return response;
  }
  public getRestricciones=async(idProyecto:any)=> {
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
    });
    const response=await firstValueFrom(this.http.get(this.apiUrl+"/find/restricciones/"+idProyecto, { headers }))
    return response;
  }
  
}