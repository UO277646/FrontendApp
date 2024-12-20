import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeteccionService {
  public getImagenDia= async (proyecto: string, dia: string): Promise<string> => {
    const headers = this.getHeaders();
    const url = `${this.apiUrl}/imagen/${proyecto}/${dia}`;
    
    try {
      const response = await firstValueFrom(
        this.http.get(url, { 
          headers, 
          responseType: 'text' 
        })
      );
      return response;
    } catch (error) {
      console.error('Error al obtener la imagen:', error);
      throw error;
    }
  }
  
  private apiUrl = 'https://764c-156-35-95-17.ngrok-free.app/detecciones';  // Cambia esto a la URL correcta si es diferente

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,'ngrok-skip-browser-warning': 'true',
    });
  }
  deleteDeteccion= async(idRec: any)=> {
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
    });
    const response=await firstValueFrom(this.http.delete(this.apiUrl+"/delete/"+idRec,{ headers }))
    return response;
  }
  public getDeteccionesDia = async (proyecto: string, dia: string): Promise<any> => {
    const headers = this.getHeaders();
    const url = `${this.apiUrl}/get/${proyecto}/${dia}`;
    
    try {
      const response = await firstValueFrom(this.http.get(url, { headers }));
      return response;
    } catch (error) {
      console.error('Error al obtener las detecciones:', error);
      throw error;
    }
  }
}
