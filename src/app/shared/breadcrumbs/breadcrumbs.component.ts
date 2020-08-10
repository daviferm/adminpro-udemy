import { Component, OnDestroy } from '@angular/core';
import { Router, ActivationEnd, ActivatedRoute } from '@angular/router';
import { filter, pluck } from 'rxjs/operators';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnDestroy {

  titulo: string;
  public tituloSubs$: Subscription;

  constructor( private router: Router, private route: ActivatedRoute ) {

    // console.log(route.snapshot.children[0].data);

    this.tituloSubs$ = this.getDataRuta()
        .subscribe( ({ titulo }) => {
          this.titulo = titulo;
          document.title = `Adminpro - ${titulo}`;
        } );
   }


   getDataRuta(): Observable<any> {
     return this.router.events
        .pipe(
          filter( event => event instanceof ActivationEnd ),
          filter( (event: ActivationEnd) => event.snapshot.firstChild === null ),
          pluck( 'snapshot', 'data' )
        );

   }

   ngOnDestroy(): void {
     this.tituloSubs$.unsubscribe();
   }

}
