import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {
  
  private apiUrl = 'https://764c-156-35-95-17.ngrok-free.app/auth'; 
  constructor(private http:HttpClient) { 
     // Cambia esto a la URL correcta si es diferente

  }
  public validateUser=async(projectId: any, email: any)=>{
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
    });
    const response=await firstValueFrom(this.http.get(this.apiUrl+"/check/"+projectId+"/"+email,{ headers }))
    return response;
  }
  public validateToken = async (token: string): Promise<any> => {
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
    });
    const tokenRequest = { token: token }; // Crear un objeto con el token
    const response = await firstValueFrom(
      this.http.post(`${this.apiUrl}/verify`, tokenRequest,{ headers })
    );
    return response;
  }
}
