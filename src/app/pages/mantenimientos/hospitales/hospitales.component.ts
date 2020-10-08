import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

import { HospitalModel } from '../../../models/hospital.model';

import { HospitalService } from '../../../services/hospital.service';
import { ModalImgService } from '../../../components/modal-img/modal-img.service';
import { BusquedasService } from '../../../services/busquedas.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit, OnDestroy {

  public hospitales: HospitalModel[] = [];
  public spinner = false;
  public total: number;
  public desde = 0;
  private ImgSubs: Subscription;
  constructor( public hospitalService: HospitalService,
               public modalImgService: ModalImgService,
               private busquedaService: BusquedasService ) { }

  ngOnInit(): void {
    this.cargarHospitales();

    this.ImgSubs = this.modalImgService.nuevaImagen.subscribe( resp => {
      if ( resp ) {
        const idx = this.hospitales.findIndex( hospital => hospital._id === resp.id );
        this.hospitales[idx].img = resp.img;
      }
    } );
  }
  ngOnDestroy(): void {
    this.ImgSubs.unsubscribe();
  }

  cargarHospitales( desde: number = 0 ): void {
    this.spinner = true;
    this.hospitalService.obtenerHospitales( desde )
      .subscribe( ({total, hospitales}) => {
        this.hospitales = hospitales;
        this.total = total;
        this.spinner = false;
      } );

  }

  cambiarPagina( valor: number ): void {

    this.desde += valor;

    if ( this.desde < 0 ) {
      this.desde = 0;
    } else if ( this.desde >= this.total ) {
      this.desde -= valor;
    }
    this.cargarHospitales( this.desde );
  }

  guardarCambios( hospital: HospitalModel ): void {
    this.hospitalService.actualizarHospital( hospital._id, hospital.nombre )
      .subscribe( resp => {
        Swal.fire({
          title: 'Actualizado',
          html: '<p>Hospital <strong>' + resp.hospital.nombre + '</strong> actualizado correctamente..</p>',
          icon: 'success',
          timer: 3000
        });
      } );
  }
  eliminarHospital( hospital: HospitalModel ): void {
    this.hospitalService.eliminarHospital( hospital._id )
      .subscribe( resp => {
        Swal.fire({
          title: 'Borrado',
          html: '<p>Hospital <strong>' + resp.hospital.nombre + '</strong> eliminado correctamente..</p>',
          icon: 'success',
          timer: 3000
        });
        this.cargarHospitales();
      } );
  }

  async abrirSweetAler(): Promise<any> {
    const { value = '' } = await Swal.fire<string>({
      input: 'text',
      title: 'Crear hospital',
      text: 'Ingrese el nombre del hospital',
      inputPlaceholder: 'Nombre del hospital...',
      showCancelButton: true,
      confirmButtonText: 'OK!',
      cancelButtonText: 'Cancelar'
    });
    if (value.trim().length > 0) {
      this.hospitalService.crearHospital( value )
        .subscribe( resp => this.cargarHospitales() );
    }
  }

  abrirModalImg( hospital: HospitalModel ): void {
    this.modalImgService.abrirModal( 'hospitales', hospital._id, hospital.img );
  }

  buscarHospitales( termino: string ): void {
    if ( termino.length <= 0 ) {
      this.cargarHospitales();
    } else {
      this.busquedaService.buscarPorTipo( 'hospitales', termino )
        .subscribe( (hospitales: any) => {
          this.hospitales = hospitales;
        } );
    }
  }


}
