
// tslint:disable-next-line: class-name
interface _HospitalUser {
    nombre: string;
    id: string;
    img?: string;
}


export class HospitalModel {

    constructor(
        public nombre: string,
        // tslint:disable-next-line: variable-name
        public _id?: string,
        public usuario?: _HospitalUser,
        public img?: string,
    ) {}

}