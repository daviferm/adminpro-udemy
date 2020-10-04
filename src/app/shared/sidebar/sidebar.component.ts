import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { UsuarioService } from '../../services/usuario.service';
import { UsuarioModel } from '../../models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  public usuario: UsuarioModel;

  constructor( public sidebarService: SidebarService,
               public usuarioService: UsuarioService ) {
    this.usuario = this.usuarioService.usuario;
  }

  ngOnInit(): void {
  }

  logOut(): void {
    console.log('LogOut');
    this.usuarioService.logOut();
  }

}
