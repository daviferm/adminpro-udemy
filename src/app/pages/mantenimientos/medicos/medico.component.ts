import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { MedicoModel } from '../../../models/medico.model';
import { HospitalModel } from '../../../models/hospital.model';

import { HospitalService } from '../../../services/hospital.service';
import { MedicoService } from '../../../services/medico.service';
import { async } from '@angular/core/testing';
import { ModalImgService } from '../../../components/modal-img/modal-img.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {

  public medico: MedicoModel = new MedicoModel('');
  public hospitales: HospitalModel[];
  public hospitalSeleccionado: HospitalModel;
  public medicoSeleccionado: MedicoModel = new MedicoModel('');
  public imgHospital: string;
  public cargando = true;

  public medicoForm: FormGroup;

  constructor( private activatedRouter: ActivatedRoute,
               public hospitalService: HospitalService,
               public medicoService: MedicoService,
               private fb: FormBuilder,
               private modalImgService: ModalImgService,
               private router: Router ) {

   }

  ngOnInit(): void {
    this.cargarHospitales();
    this.activatedRouter.params.subscribe( ({id}) => {
      this.cargarMedico( id );
    } );

    this.medicoForm = this.fb.group({
      nombre: ['', Validators.required],
      hospital: ['', Validators.required]
    });

    this.modalImgService.nuevaImagen.subscribe( resp => {
      this.medicoSeleccionado.img = resp.img;
    } )

  }
  abrirModalImg( medico: MedicoModel ): void {
    this.modalImgService.abrirModal( 'medicos', medico._id, medico.img );
  }

  cargarMedico(id: string): void {
    if ( id === 'nuevo' ) {
      return;
    }
    this.medicoService.obtenerMedicoID(id)
      .subscribe( (medico: any) => {
        if ( !medico ) {
          return this.router.navigateByUrl(`/dashboard/medicos`);
        }
        const { nombre, hospital: { _id } } = medico;
        this.medicoSeleccionado = medico;
        this.medicoForm.setValue({ nombre, hospital: _id });

      } );

  }
  cargarHospitales(): void {
    this.hospitalService.obtenerHospitales()
      .subscribe( ( resp) => {
        this.hospitales = resp.hospitales;
        this.hospitalSeleccionado = this.hospitales.find( (h: any) => h._id === this.medico.hospital );
        this.selectHospital();
      } );
  }

  selectHospital(): void {
    this.medicoForm.get('hospital').valueChanges
    .subscribe( (hospitalId: string) => {
      this.hospitalSeleccionado = this.hospitales.find( (h) => h._id === hospitalId );
      this.medicoSeleccionado.hospital = this.hospitalSeleccionado;
    } );
  }

  guardarMedico(): void {
    const { nombre } = this.medicoForm.value;

    if ( this.medicoSeleccionado ) {
      // Actualizar médico
      const data = {
        ...this.medicoForm.value,
        _id: this.medicoSeleccionado._id
      };
      console.log(data);
      this.medicoService.actualizarMedico( data )
        .subscribe( (medico: MedicoModel) => {
          console.log(medico);
          Swal.fire({
            title: 'Actualizado',
            html: `<p><strong> ${ nombre } </strong> actualizado correctamente!</p>`,
            icon: 'success',
            timer: 3000
          });
        } )
    } else {
      // Crear
      this.medicoService.crearMedico( this.medicoForm.value )
        .subscribe( (medico: MedicoModel) => {
          Swal.fire({
            title: 'Creado',
            html: `<p>Médico <strong> ${ nombre } </strong> guardado correctamente!</p>`,
            icon: 'success',
            timer: 3000
          });
          this.router.navigateByUrl(`/dashboard/medico/${medico._id}`);
        } );
    }

  }

}
