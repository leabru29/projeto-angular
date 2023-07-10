import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_VIACEP } from 'src/environments/environment';
import { IEndereco } from '../contracts/IEndereco';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {

  constructor(private http: HttpClient) { }

  getDadosEndereco(cep: any){
    return this.http.get<IEndereco[]>(`${API_VIACEP}${cep}/json/`).toPromise();
  }
}
