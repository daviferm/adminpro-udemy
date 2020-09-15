import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { UsuarioModel } from '../models/usuario.model';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor() { }

  async actualizarFoto(
    archivo: File,
    tipo: 'usuarios'|'medicos'|'hospitales',
    id: string
  ) {

    try {

      const url = `${ base_url }/upload/${ tipo }/${ id }`;
      const formData = new FormData();
      formData.append('imagen', archivo);

      const resp = await fetch(url, {
        method: 'PUT',
        headers: {
          'x-token': localStorage.getItem('x-token')
        },
        body: formData
      });

      const data = await resp.json();
      console.log(data);
      if (data.ok ) {
        return data;
      } else {
        return data;
      }

    } catch (error) {
      console.log(error);
      return false;
    }

  }
}
