import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { CarcaMedicos } from '../interfaces/carga-medicos.interface';
import { MedicoModel } from '../models/medico.model';
import { Observable } from 'rxjs';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  constructor( private http: HttpClient ) { }

  get token(): string {
    return localStorage.getItem('x-token') || '';
  }

  get headers(): any {
    return {
      headers: {
        'x-token': this.token
      }
    };
  }

  obtenerMedicos(): any {

    return this.http.get<CarcaMedicos>( `${base_url}/medicos`, this.headers)
      .pipe(
        map( (resp: any) => resp.medicos)
      );
  }
  obtenerMedicoID( id: string ): Observable<any> {

    return this.http.get<any>( `${base_url}/medicos/${id}`, this.headers)
      .pipe(
        map( (resp: any) => resp.medico )
      );

  }
  crearMedico( medico: { nombre: string, hospital: string } ): any {

    const url = `${base_url}/medicos`;
    return this.http.post( url, medico, this.headers)
      .pipe(
        map( (resp: any) => resp.medico)
      );
  }
  actualizarMedico( medico: MedicoModel ): any {

    const url = `${base_url}/medicos/${medico._id}`;
    return this.http.put( url, medico, this.headers)
      .pipe(
        map( (resp: any) => resp.medico)
      );
  }
  eliminarMedico( id: string ): any {

    const url = `${base_url}/medicos/${id}`;
    return this.http.delete( url, this.headers)
      .pipe(
        map( (resp: any) => {
          console.log(resp);
          return resp;
        })
      );
  }
}
