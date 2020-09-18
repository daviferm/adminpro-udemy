import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { ModalImgService } from './modal-img.service';
import { FileUploadService } from '../../services/file-upload.service';


@Component({
  selector: 'app-modal-img',
  templateUrl: './modal-img.component.html',
  animations: [
    trigger('openClosed', [
      state('open', style({
        display: 'block'
      })),
      state('closed', style({
        display: 'none'
      })),
      transition('closed <=> open', [
        animate('0s')
      ]),
    ]),
  ]
})
export class ModalImgComponent implements OnInit {

  imagenSubir: File;
  imagenTem: any = null;

  constructor( public modalImgService: ModalImgService,
               public fileUploadService: FileUploadService ) {
   }

  ngOnInit(): void {
  }

  ocultalModalImg( event ): void {
    if ( event.target.id === 'exampleModal' ) {
      this.modalImgService.cerrarModal();
    }
  }

  cerrarModal(): void {
    this.modalImgService.cerrarModal();
    this.imagenTem = null;
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
    this.cerrarModal();
    const uid = this.modalImgService.id;
    const tipo = this.modalImgService.tipo;

    this.fileUploadService.actualizarFoto( this.imagenSubir, tipo, uid )
        .then( data => {
          if ( data.ok ) {
            Swal.fire({
              title: 'Guardada',
              text: 'Imagen actualizada!',
              icon: 'success',
              timer: 3000
            });
            this.modalImgService.nuevaImagen.emit({img: data.nombreImg, id: uid});
          } else {
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
        });
  }

}
