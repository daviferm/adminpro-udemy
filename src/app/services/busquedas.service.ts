import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

import { UsuarioModel } from '../models/usuario.model';
import { HospitalModel } from '../models/hospital.model';
import { MedicoModel } from '../models/medico.model';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  constructor( private http: HttpClient ) { }

  get token(): string {
    return localStorage.getItem('x-token');
  }
  get headers(): any {
    return {
      headers: {
        'x-token': this.token
      }
    };
  }

  private transformarUsuarios( resultados: any[] ): UsuarioModel[]{
    return resultados.map( user => new UsuarioModel(
      user.nombre, user.email, '', user.img, user.google, user.role, user.uid ) );
  }
  private transformarHospitales( resultados: any[] ): HospitalModel[]{
    return resultados;
  }
  private transformarMedicos( resultados: any[] ): MedicoModel[]{
    return resultados;
  }


  buscarPorTipo(tipo: 'usuarios'|'medicos'|'hospitales', termino: string): any {

    const url = `${base_url}/todo/coleccion/${tipo}/${termino}`;

    return this.http.get<any[]>( url, this.headers)
      .pipe(
        map( (resp: any) => {
          let respuesta;
          switch ( tipo ) {
             case 'usuarios':
                return this.transformarUsuarios( resp.resultado );
             case 'hospitales':
                return this.transformarHospitales( resp.resultado );
             case 'medicos':
                return this.transformarMedicos( resp.resultado );
             default:
                respuesta = null;
                break;
          }
        } )
      );
  }

  busquedaGlobal( termino: string ): any {
    const url = `${base_url}/todo/${termino}`;

    return this.http.get( url, this.headers );
  }
}
