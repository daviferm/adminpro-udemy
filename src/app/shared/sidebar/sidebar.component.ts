import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  menuItems: any[];

  constructor( private sidebarService: SidebarService,
               private usuarioService: UsuarioService ) {
    this.menuItems = this.sidebarService.menu;
   }

  ngOnInit(): void {
  }

  logOut(): void {
    console.log('LogOut');
    this.usuarioService.logOut();
  }

}
