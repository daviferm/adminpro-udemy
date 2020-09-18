import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

import { BuscarUsuarios } from '../interfaces/cargar-usuarios.intergace';
import { UsuarioModel } from '../models/usuario.model';

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

  private tranformarUsuarios( resultados: any[] ): UsuarioModel[]{
    return resultados.map( user => new UsuarioModel(
      user.nombre, user.email, '', user.img, user.google, user.role, user.uid ) );
  }

  buscarPorTipo(tipo: 'usuarios'|'medicos'|'hospitales', termino: string): any {

    const url = `${base_url}/todo/coleccion/${tipo}/${termino}`;

    return this.http.get<BuscarUsuarios[]>( url, this.headers)
      .pipe(
        map( (resp: any) => {
          switch ( tipo ) {
             case 'usuarios':
                return this.tranformarUsuarios( resp.resultado );

             case 'hospitales':

               break;
             case 'medicos':

               break;
             default:

               break;
          }
        } )
      );

  }
}
