import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public formsSubmitted = false;
  public auth2: any;

  public loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    recuerdame: false
  });

  constructor( private router: Router,
               private fb: FormBuilder,
               private usuarioService: UsuarioService,
               private ngZone: NgZone ) {

    if ( localStorage.getItem('adminpro-email') ) {
      this.loginForm.setValue({
        email: localStorage.getItem('adminpro-email'),
        password: '',
        recuerdame: true
      });
    }
  }

  ngOnInit(): void {
    this.renderButton();
  }


  login(): void {

    this.formsSubmitted = true;

    if ( this.loginForm.valid ) {

      if ( this.loginForm.get('recuerdame').value ) {
        localStorage.setItem('adminpro-email', this.loginForm.get('email').value);
      } else {
        localStorage.removeItem('adminpro-email');
      }

      this.usuarioService.loginUsuario(this.loginForm.value)
        .subscribe( resp => {
          // navegar al dashboard
          this.router.navigateByUrl('/dashboard');
        }, (err) => {
          // Si sucede un error
          console.warn(err);
          Swal.fire({
            title: 'Error!',
            text: err.error.msg,
            icon: 'error',
            confirmButtonText: 'OK'
          });
        } );
    } else {
      console.warn('Formulario no correcto!!');
    }
  }

  renderButton(): void {
    gapi.signin2.render('my-signin2', {
      scope: 'profile email',
      width: 240,
      height: 50,
      longtitle: true,
      theme: 'dark',
    });
    this.startApp();
  }

  async startApp() {

    await this.usuarioService.googleInit();
    this.auth2 = this.usuarioService.auth2;

    this.attachSignin( document.getElementById('my-signin2') );
  }
  attachSignin(element): void {
    this.auth2.attachClickHandler(element, {},
        (googleUser) => {
          const id_token = googleUser.getAuthResponse().id_token;
          this.usuarioService.loginGoogle( id_token )
            .subscribe( resp => {
              // navegar al dashboard
              this.ngZone.run( () => this.router.navigateByUrl('/') );
            } );


        }, (error) => {
          alert(JSON.stringify(error, undefined, 2));
        });
  }


  campoNoValido( campo: string ): boolean{

    if ( this.loginForm.get(campo).invalid && this.formsSubmitted ) {
      return true;
    } else {
      return false;
    }
   }



}
