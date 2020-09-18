import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { IncrementadorComponent } from './incrementador/incrementador.component';
import { DonaComponent } from './dona/dona.component';

// Gráficas
import { ChartsModule } from 'ng2-charts';
import { ModalImgComponent } from './modal-img/modal-img.component';


@NgModule({
  declarations: [
    IncrementadorComponent,
    DonaComponent,
    ModalImgComponent
  ],
  exports: [
    IncrementadorComponent,
    DonaComponent,
    ModalImgComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule,
    BrowserAnimationsModule
  ]
})
export class ComponetsModule { }
