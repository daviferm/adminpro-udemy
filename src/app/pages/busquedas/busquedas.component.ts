import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BusquedasService } from '../../services/busquedas.service';
import { UsuarioModel } from '../../models/usuario.model';
import { MedicoModel } from '../../models/medico.model';
import { HospitalModel } from '../../models/hospital.model';

@Component({
  selector: 'app-busquedas',
  templateUrl: './busquedas.component.html',
  styles: [
  ]
})
export class BusquedasComponent implements OnInit {

  public usuarios: UsuarioModel[] = [];
  public medicos: MedicoModel[] = [];
  public hospitales: HospitalModel[] = [];

  constructor( public busquedaService: BusquedasService,
               private activatedRouter: ActivatedRoute ) { }

  ngOnInit(): void {
    this.activatedRouter.params.subscribe( ({ termino }) => {
      this.busquedaGlobal( termino );
    } );
  }

  busquedaGlobal( termino: string ): void {

    this.busquedaService.busquedaGlobal( termino )
    .subscribe( (resp: any) => {
      console.log(resp);
      this.usuarios   = resp.usuarios;
      this.medicos    = resp.medicos;
      this.hospitales = resp.hospitales;
    } );
  }

  abrirMedico( medico: MedicoModel ): void {
    console.log(medico);
  }

}
