import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeteccionService {
  private apiUrl = 'http://localhost:8080/detecciones';  // Cambia esto a la URL correcta si es diferente

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
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
