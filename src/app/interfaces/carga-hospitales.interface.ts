import { HospitalModel } from '../models/hospital.model';


export interface CarcaHospitales {
    ok: boolean;
    total: number;
    hospitales: HospitalModel[];
};