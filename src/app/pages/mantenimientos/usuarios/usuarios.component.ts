import { Component, OnInit, OnDestroy } from '@angular/core';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

import { UsuarioModel } from '../../../models/usuario.model';

import { UsuarioService } from '../../../services/usuario.service';
import { BusquedasService } from '../../../services/busquedas.service';
import { ModalImgService } from '../../../components/modal-img/modal-img.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit, OnDestroy {

  public combiarImgSubs: Subscription;
  public totalUsuarios: number;
  public usuarios: UsuarioModel[] = [];
  cargando = true;
  desde = 0;

  constructor( private usuarioService: UsuarioService,
               private busquedaService: BusquedasService,
               private modalImgService: ModalImgService ) {}


  ngOnDestroy(): void {
  this.combiarImgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarUsuarios( 0 );

    this.combiarImgSubs = this.modalImgService.nuevaImagen.subscribe( resp => {
      if ( resp ) {
        const idxUser = this.usuarios.findIndex( user => user.uid === resp.id );
        this.usuarios[idxUser].img = resp.img;
      }
    } );
  }

  cargarUsuarios( desde: number = 0 ): any {

    this.cargando = true;

    this.usuarioService.obtenerUsuarios( this.desde )
      .subscribe( ({total, usuarios}) => {
        this.totalUsuarios = total;
        if ( this.totalUsuarios !== 0 ) {
          this.usuarios = usuarios;
        }
        this.cargando = false;
      } );
  }

  cambiarPagina( valor: number ): void {

    this.desde += valor;

    if ( this.desde < 0 ) {
      this.desde = 0;
    } else if ( this.desde >= this.totalUsuarios ) {
      this.desde -= valor;
    }
    this.cargarUsuarios();
  }

  buscarUsuarios( termino: any ): any {

    if ( termino.length <= 0 ) {
      this.cargarUsuarios();
    } else {
      this.busquedaService.buscarPorTipo( 'usuarios', termino )
        .subscribe( (usuarios: UsuarioModel[]) => {
          this.usuarios = usuarios;
        } );
    }
  }

  eliminarUsuario( usuario: UsuarioModel ): any {

    if ( this.usuarioService.uid === usuario.uid ) {
      return Swal.fire('Error!', 'No puedes eliminar tu perfil!', 'error');
    }
    Swal.fire({
      title: 'Estás seguro?',
      html: `<p>Se eliminará el usuario <strong>${usuario.nombre}</strong>!</p>`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar usuario!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.borrarUsuario( usuario.uid )
          .subscribe( resp => {
            Swal.fire({
              title: 'Eliminado!',
              html: `<p><strong>${usuario.nombre}</strong> fué eliminado correctamente!</p>`,
              icon: 'success',
              timer: 3000
            });
            this.cargarUsuarios();
          } );
      }
    });
  }

  cambiarRole( usuario: UsuarioModel ): void {
    this.usuarioService.cambiarRoleUsuario( usuario )
      .subscribe( resp => {
      }, err => {
        Swal.fire('Error!', 'No se pudo actualizar el Role!', 'error');
      } );
  }

  abrirModalImg( usuario: UsuarioModel ): void {
    this.modalImgService.abrirModal( 'usuarios', usuario.uid, usuario.img );
  }

}
