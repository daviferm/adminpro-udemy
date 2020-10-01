import { NgModule } from '@angular/core';
import { ImgTipoPipe } from './img-tipo.pipe';

@NgModule({
  declarations: [
    ImgTipoPipe
  ],
  exports: [
    ImgTipoPipe
  ]
})
export class PipesModule { }
