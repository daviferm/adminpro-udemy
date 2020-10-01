import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { CarcaHospitales } from '../interfaces/carga-hospitales.interface';
import { HospitalModel } from '../models/hospital.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  public hospitales: HospitalModel[];

  constructor( private http: HttpClient ) {}


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

  obtenerHospitales( desde: number = 0 ): any {

    return this.http.get<CarcaHospitales>( `${base_url}/hospitales?desde=${desde}`, this.headers)
      .pipe(
        map( (resp: any) => {
          this.hospitales = resp.hospitales;
          return {
            total: resp.conteo,
            hospitales: resp.hospitales
          };
        })
      );
  }
  obtenerHospitalPorId( id: string ): any {

    return this.http.get( `${base_url}/hospitales/${id}`, this.headers )
      .pipe(
        map( (resp: any) => resp.hospital )
      );

  }
  crearHospital( nombre: string ): any {

    const url = `${base_url}/hospitales`;
    return this.http.post( url, { nombre }, this.headers)
      .pipe(
        map( (resp: any) => resp)
      );
  }
  actualizarHospital( id: string, nombre: string ): any {

    const url = `${base_url}/hospitales/${id}`;
    return this.http.put( url, { nombre }, this.headers)
      .pipe(
        map( (resp: any) => resp)
      );
  }
  eliminarHospital( id: string ): any {

    const url = `${base_url}/hospitales/${id}`;
    return this.http.delete( url, this.headers)
      .pipe(
        map( (resp: any) => {
          console.log(resp);
          return resp;
        })
      );
  }
}
