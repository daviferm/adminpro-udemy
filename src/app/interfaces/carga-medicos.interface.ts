import { MedicoModel } from '../models/medico.model';


export interface CarcaMedicos {
    ok: boolean;
    total: number;
    hospitales: MedicoModel[];
};