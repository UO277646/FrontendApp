import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {
  
  private apiUrl = 'http://localhost:8080/auth'; 
  constructor(private http:HttpClient) { 
     // Cambia esto a la URL correcta si es diferente

  }
  public validateUser=async(projectId: any, email: any)=>{
    const response=await firstValueFrom(this.http.get(this.apiUrl+"/check/"+projectId+"/"+email))
    return response;
  }
  public validateToken = async (token: string): Promise<any> => {
    const tokenRequest = { token: token }; // Crear un objeto con el token
    const response = await firstValueFrom(
      this.http.post(`${this.apiUrl}/verify`, tokenRequest)
    );
    return response;
  }
}
