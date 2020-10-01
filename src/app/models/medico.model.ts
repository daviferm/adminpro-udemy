import { HospitalModel } from './hospital.model';

interface _Usuario {
    _id: string;
    nombre: string;
    img?: string;
}

export class MedicoModel {
    constructor(
        public  nombre: string,
        public  _id?: string,
        public  img?: string,
        public  hospital?: HospitalModel,
        public  usuario?: _Usuario,
    ) {}
}