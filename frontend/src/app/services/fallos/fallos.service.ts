import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FallosService {
  private apiUrl = 'http://localhost:8080/fallos';
  public getFallos=async(idRec: any)=> {
    const response=await firstValueFrom(this.http.get(this.apiUrl+"/find/fallos/"+idRec))
    return response;
  }
  constructor(private http:HttpClient) { }
}
