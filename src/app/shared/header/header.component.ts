import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { UsuarioModel } from '../../models/usuario.model';
import { BusquedasService } from '../../services/busquedas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {

  public usuario: UsuarioModel;

  constructor( public usuarioService: UsuarioService,
               public busquedaService: BusquedasService,
               private router: Router ) {
    this.usuario = this.usuarioService.usuario;
  }


  logOut(): void {
    this.usuarioService.logOut();
  }

  buscar( termino: string ): any {
    console.log(termino);
    if ( termino.length === 0 ) {
      return;
    }
    this.router.navigateByUrl(`/dashboard/busquedas/${termino}`);
  }
}
