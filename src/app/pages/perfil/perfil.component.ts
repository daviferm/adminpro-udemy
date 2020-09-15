import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { UsuarioModel } from '../../models/usuario.model';

import { UsuarioService } from '../../services/usuario.service';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  public usuario: UsuarioModel;
  public perfilForm: FormGroup;
  imagenSubir: File;
  imagenTem: any = null;


  constructor( private usuarioService: UsuarioService,
               private fb: FormBuilder,
               private fileUploadService: FileUploadService ) {
    this.usuario = usuarioService.usuario;
   }

  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      nombre: [this.usuario.nombre, Validators.required],
      email: [this.usuario.email, [Validators.required, Validators.email]],
    });
  }

  actualizarPerfil(): void {

    this.usuarioService.actualizarPerfil( this.perfilForm.value )
      .subscribe( () => {
        console.log(this.perfilForm);
        const { nombre, email } = this.perfilForm.value;
        this.usuario.nombre = nombre;
        this.usuario.email = email;
        Swal.fire({
          title: 'Guardado',
          html: `<p>Perfil de <strong> ${this.usuario.nombre} </strong> actualizado.</p>`,
          icon: 'success',
          timer: 3000
        });
      }, (err) => {
        Swal.fire({
          title: 'ok',
          text: err.error.msg,
          icon: 'error',
          timer: 3000
        });
        console.log(err.error.msg);
      } );
  }


  seleccionarImagen(file: File): void {
    this.imagenSubir = file;

    if ( !file ) {
      return this.imagenTem = null;
    }

    const reader = new FileReader();
    reader.readAsDataURL( file );

    reader.onloadend = () => {
      this.imagenTem = reader.result;
    };
  }

  subirImagen(): void {
    this.fileUploadService.actualizarFoto( this.imagenSubir, 'usuarios', this.usuario.uid )
        .then( data => {
          console.log(data);
          if ( data.ok ) {
            this.usuario.img = data.nombreImg;
            Swal.fire({
              title: 'Guardada',
              text: 'Imagen actualizada!',
              icon: 'success',
              timer: 3000
            });
          } else {
            console.log(data);
            Swal.fire({
              title: 'Error',
              text: data.msg,
              icon: 'error',
              timer: 3000
            });
          }
        } )
        .catch((err) => {
          console.log(err);
          Swal.fire({
            title: 'Error',
            text: 'No se pudo subir la imagen!',
            icon: 'error',
            timer: 3000
          });
        })

  }

}
