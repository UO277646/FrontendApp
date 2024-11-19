import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FallosService {
  
  deleteFallo= async(idRec: any)=> {
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
    });
    const response=await firstValueFrom(this.http.delete(this.apiUrl+"/delete/"+idRec,{ headers }))
    return response;
  }
  private apiUrl = 'https://764c-156-35-95-17.ngrok-free.app/fallos';
  public getFallos=async(idRec: any)=> {
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
    });
    const response=await firstValueFrom(this.http.get(this.apiUrl+"/find/fallos/"+idRec,{ headers }))
    return response;
  }
  constructor(private http:HttpClient) { }
}
