import { Pipe, PipeTransform } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Pipe({
  name: 'imgTipo'
})
export class ImgTipoPipe implements PipeTransform {

  private url: string;
  constructor( private http: HttpClient ) {}

  transform(img: string, tipo: string): any {

    const regTipo = tipo;
    if ( img && img.startsWith('http') ) {
      return img;
    }

    switch (regTipo) {
      case 'usuarios':
        this.url = `${base_url}/upload/usuarios/${img}`;
        break;
      case 'hospitales':
        this.url = `${base_url}/upload/hospitales/${img}`;
        break;
      case 'medicos':
        this.url = `${base_url}/upload/medicos/${img}`;
        break;
      default:
        this.url = null;
    }

    return this.url;

  }

}
