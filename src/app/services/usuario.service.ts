import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { CargarUsuarios } from '../interfaces/cargar-usuarios.interface';

import { environment } from '../../environments/environment.prod';
import { tap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { UsuarioModel } from '../models/usuario.model';


const base_url = environment.base_url;
declare const gapi: any;


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2: any;
  public usuario: UsuarioModel;
  public menuSidebar: any;

  constructor( private http: HttpClient,
               private router: Router,
               private ngZone: NgZone ) {

    this.googleInit();
  }

  get role(): 'ADMIN_ROLE' | 'USER_ROLE' {
    return this.usuario.role;
  }
  get token(): string {
    return localStorage.getItem('x-token') || '';
  }
  get uid(): string {
    return this.usuario.uid || '';
  }
  get headers(): any {
    return {
      headers: {
        'x-token': this.token
      }
    };
  }
  guardarLocalStorage(token: string, menu: any): void {
    localStorage.setItem('x-token', token);
    localStorage.setItem('menu', JSON.stringify( menu ));
  }

  googleInit(): any {

    return new Promise( resolve => {
      console.log('Google init');
      gapi.load('auth2', () => {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init({
          client_id: '619575270603-88o1clesoss81o422h999b69ontb7t2g.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });
        resolve();

      });

    } );

  }

  logOut(): void {
    localStorage.removeItem('x-token');
    localStorage.removeItem('menu');

    this.auth2.signOut().then( () => {
      this.ngZone.run( () => {
        this.router.navigateByUrl('/login');
        console.log('User signed out.');
      } );
    });
  }

  validarToken(): Observable<boolean> {

    return this.http.get(`${base_url}/login/renew`, this.headers )
      .pipe(
        map( (resp: any) => {
          const { nombre, email, img = '', google, role, uid } = resp.usuario;
          this.usuario = new UsuarioModel( nombre, email, '', img, google, role, uid, );
          this.guardarLocalStorage( resp.token, resp.menu );
          return true;
        } ),
        catchError( error => of(false) )
      );
  }

  crearUsuario( formData: RegisterForm ): any {

    console.log('Creando usuario');
    return this.http.post(`${base_url}/usuarios`, formData)
            .pipe(
              tap( (resp: any) => {
                this.guardarLocalStorage( resp.token, resp.menu );
              } ),
              catchError( err => err )
            );
  }
  actualizarPerfil( data: {nombre: string, email: string, role: string} ): any {

    data = {
      ...data,
      role: this.usuario.role
    }

    return this.http.put(`${base_url}/usuarios/${this.uid}`, data, this.headers);
  }

  obtenerUsuarios( desde: number = 0 ): any {

    return this.http.get<CargarUsuarios>( `${base_url}/usuarios?desde=${desde}`, this.headers)
      .pipe(
        map( (resp: any) => {

          const usuarios = resp.usuarios.map( user => new UsuarioModel( 
                user.nombre, user.email, '', user.img, user.google, user.role, user.uid ) );
          return {
            total: resp.total,
            usuarios
          };
        } )
      );
  }

  borrarUsuario( id: string ): any {


    const url = `${base_url}/usuarios/${id}`;
    return this.http.delete( url, this.headers );
  }

  loginUsuario( formData: LoginForm ): any {

    console.log('Login usuario!');
    return this.http.post(`${base_url}/login`, formData)
          .pipe(
            tap( (resp: any) => {
              this.guardarLocalStorage( resp.token, resp.menu );
            } )
          );
  }

  loginGoogle( token: string ): any {
    return this.http.post( `${base_url}/login/google`, { token } )
            .pipe(
              tap( (resp: any) => {
                this.guardarLocalStorage( resp.token, resp.menu );
              } )
            );
  }

  cambiarRoleUsuario( usuario: UsuarioModel ): any {

    return this.http.put(`${base_url}/usuarios/${usuario.uid}`, usuario, this.headers);
  }

}
