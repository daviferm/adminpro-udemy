import { environment } from '../../environments/environment';

const base_url = environment.base_url;
export class UsuarioModel {

    constructor(
        public nombre: string,
        public email: string,
        public password?: string,
        public img?: string,
        public google?: boolean,
        public role?: string,
        public uid?: string,
    ) {}

    get ImagenUrl(): string {

        if ( this.img && this.img.startsWith('http') ) {
            return this.img;
        }

        if ( this.img ) {
            return `${base_url}/upload/usuarios/${this.img}`;
        } else {
            return `${base_url}/upload/usuarios/no-image`;
        }
    };
}