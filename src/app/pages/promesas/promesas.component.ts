import { Component, OnInit, resolveForwardRef } from '@angular/core';
import { Subscriber } from 'rxjs';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html'
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    // const promesa = new Promise( ( resolve, recject ) => {

    //   if ( false ) {

    //     resolve('Hola Mundo!');
    //   } else {
    //     recject('Algo salió mal!!');
    //   }

    // } );

    // promesa
    //     .then( (mensaje) => {
    //       console.log(mensaje);
    //     } )
    //     .catch( error => console.log(error));


    // console.log('Fin Init!!');

    this.getUsuarios().then( usuarios => {
      console.log(usuarios);
    } )
  }

  getUsuarios(): any {

    return new Promise( ( resolve ) => {

      fetch('https://reqres.in/api/users?page=2')
          .then( resp => resp.json() )
          .then( body => resolve(body.data) )
    });


  }

}
