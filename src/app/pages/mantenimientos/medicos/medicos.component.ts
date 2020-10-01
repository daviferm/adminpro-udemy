import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

import { MedicoModel } from '../../../models/medico.model';

import { MedicoService } from '../../../services/medico.service';
import { ModalImgService } from '../../../components/modal-img/modal-img.service';
import { BusquedasService } from '../../../services/busquedas.service';
import { HospitalService } from '../../../services/hospital.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit, OnDestroy {

  medicos: MedicoModel[];
  spinner = true;
  private ImgSubs: Subscription;

   constructor( public medicoService: MedicoService,
                private modalImgService: ModalImgService,
                public buscarService: BusquedasService,
                public hospitalService: HospitalService,
                private router: Router ) { }

  ngOnInit(): void {
    this.cargarMedicos();
    this.hospitalService.obtenerHospitales().subscribe();

    this.ImgSubs = this.modalImgService.nuevaImagen.subscribe( resp => {
      if ( resp ) {
        const idx = this.medicos.findIndex( hospital => hospital._id === resp.id );
        this.medicos[idx].img = resp.img;
      }
    } );
  }
  ngOnDestroy(): void {
    this.ImgSubs.unsubscribe();
  }
  abrirModalImg( medico: MedicoModel ): void {
    this.modalImgService.abrirModal( 'medicos', medico._id, medico.img );
  }

  cargarMedicos(): any {
    this.spinner = true;
    this.medicoService.obtenerMedicos()
      .subscribe( medicos => {
        this.medicos = medicos;
        this.spinner = false;
      } );
  }
  eliminarMedico( medico: MedicoModel ): void {
    console.log(medico);
    Swal.fire({
      title: 'Estás seguro?',
      html: `<p>Se eliminará <strong>${medico.nombre}</strong> de la base de datos.</p>`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrar médico!',
      cancelButtonText: 'Cancelar'
    }).then( (result) => {
      if ( result.isConfirmed ) {
        console.log('Eliminar médico');
        this.medicoService.eliminarMedico( medico._id )
          .subscribe( resp => {
            Swal.fire({
              title: 'Borrado',
              html: '<p>Médico <strong>' + resp.medico.nombre + '</strong> eliminado correctamente..</p>',
              icon: 'success',
              timer: 3000
            });
            this.cargarMedicos();
          } );
      }
    } );
  }
  editarMedico( id: string ): void {
    // this.router.navigate(['dashboard', 'medico', id]);
    this.router.navigateByUrl('dashboard/medico/' + id);
  }

  buscar( termino: string ): void {
    if ( termino.length === 0 ) {
      this.cargarMedicos();
    } else {
      this.buscarService.buscarPorTipo( 'medicos', termino )
        .subscribe( (medicos: MedicoModel[]) => {
          this.medicos = medicos;
        } );
    }
  }

}
