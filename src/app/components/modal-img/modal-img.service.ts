import { Injectable, EventEmitter, Output } from '@angular/core';
import { environment } from '../../../environments/environment';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class ModalImgService {

  // tslint:disable-next-line: variable-name
  private _ocultarModal = true;
  public tipo: string;
  public id: string;
  public img: string;

  @Output() nuevaImagen: EventEmitter<{img: string, id: string}> = new EventEmitter();

  get ocultarModal(): boolean {
    return this._ocultarModal;
  }

  abrirModal(
      tipo: 'usuarios'|'medicos'|'hospitales',
      id: string,
      img: string = 'no-img'
     ): void {

    this.tipo = tipo;
    this.id = id;

    if ( img.includes('http') ) {
      this.img = img;
    } else {
      this.img = `${base_url}/upload/${tipo}/${img}`;
    }
    this._ocultarModal = false;
  }


  cerrarModal(): void {
    this._ocultarModal = true;
  }

  constructor() { }


}
