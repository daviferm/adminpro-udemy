import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { environment } from '../../environments/environment.prod';
import { tap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { UsuarioModel } from '../models/usuario.model';

const base_url = environment.base_url;
declare const gapi: any;


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2: any;
  public usuario: UsuarioModel;

  constructor( private http: HttpClient,
               private router: Router,
               private ngZone: NgZone ) {

    this.googleInit();
  }

  get token(): string {
    return localStorage.getItem('x-token') || '';
  }
  get uid(): string {
    return this.usuario.uid || '';
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

    this.auth2.signOut().then( () => {
      this.ngZone.run( () => {
        this.router.navigateByUrl('/login');
        console.log('User signed out.');
      } );
    });
  }

  validarToken(): Observable<boolean> {

    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map( (resp: any) => {
        const { nombre, email, img = '', google, role, uid } = resp.usuario;
        this.usuario = new UsuarioModel( nombre, email, '', img, google, role, uid, );
        console.log(this.usuario);
        localStorage.setItem('x-token', resp.token);
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
                localStorage.setItem('x-token', resp.token);
              } )
            );
  }
  actualizarPerfil( data: {nombre: string, email: string, role: string} ): any {

    data = {
      ...data,
      role: this.usuario.role
    }

    return this.http.put(`${base_url}/usuarios/${this.uid}`, data, {
      headers: {
        'x-token': this.token
      }
    });
  }

  loginUsuario( formData: LoginForm ): any {

    console.log('Login usuario!');
    return this.http.post(`${base_url}/login`, formData)
          .pipe(
            tap( (resp: any) => {
              localStorage.setItem('x-token', resp.token);
            } )
          );
  }

  loginGoogle( token: string ): any {
    return this.http.post( `${base_url}/login/google`, { token } )
            .pipe(
              tap( (resp: any) => {
                localStorage.setItem('x-token', resp.token);
              } )
            );
  }


 
}