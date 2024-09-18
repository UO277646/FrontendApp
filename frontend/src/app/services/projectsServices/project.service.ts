import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http:HttpClient) { }
  
  private apiUrl = 'http://localhost:8080/project/find/all';  // Cambia esto a la URL correcta si es diferente

  

  public getProjects=async()=> {
    const response=await firstValueFrom(this.http.get(this.apiUrl))
    return response;
  }
  
}