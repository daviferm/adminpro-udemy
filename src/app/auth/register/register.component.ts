import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../login/login.component.css']
})
export class RegisterComponent {

  public formsSubmitted = false;

  public registerForm = this.fb.group({
    nombre: ['David', [Validators.required, Validators.minLength(2)]],
    email: ['david_ferm@hotmail.com', [Validators.required, Validators.email]],
    password: ['123456', Validators.required],
    password2: ['123456', Validators.required],
    terminos: [true, Validators.required]
  }, {
    validators: this.passwordIguales('password', 'password2')
  });

  constructor( private fb: FormBuilder,
               private usuarioService: UsuarioService,
               private router: Router ) { }

  crearUsuario(): any {
    this.formsSubmitted = true;

    if ( this.registerForm.valid ) {
      console.log('Posteando formulario..');

      this.usuarioService.crearUsuario(this.registerForm.value)
          .subscribe( (resp: any) => {
            console.log('Usuario creado');
            Swal.fire({
              title: 'ok!',
              html: `<p>Usuario <strong>${resp.usuario.email}</strong> creado.</p>`,
              icon: 'success',
              timer: 2000,
              confirmButtonText: 'OK'
            });
            this.router.navigateByUrl('/dashboard');
            console.log(resp);
          }, (err) => {
            // Si sucede un error
            console.warn(err.error.msg);
            Swal.fire({
              title: 'Error!',
              text: err.error.msg,
              icon: 'error',
              confirmButtonText: 'OK'
            });
          } );

    } else {
      console.log('Formulario no correcto..');

    }

  }

  campoNoValido( campo: string ): boolean{

   if ( this.registerForm.get(campo).invalid && this.formsSubmitted ) {
     return true;
   } else {
     return false;
   }
  }

  noIguales(): boolean {

    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('password2').value;

    if ( (pass1 !== pass2) && this.formsSubmitted ) {
      return true;
    } else {
      return false;
    }
  }
  passwordIguales(pass1Name: string, pass2Name: string): any{

    return ( formGroup: FormGroup ) => {

      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      if ( pass1Control.value === pass2Control.value ) {
        pass2Control.setErrors(null);
      } else {
        pass2Control.setErrors({ noEsIgual: true });
      }
    }
  }
}
