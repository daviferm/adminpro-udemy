import { UsuarioModel } from '../models/usuario.model';


export interface CargarUsuarios {
  ok: boolean;
  total: number;
  usuarios: UsuarioModel[];
}

export interface BuscarUsuarios {
  ok: boolean;
  coleccion: string;
  resultado: UsuarioModel[];
}
