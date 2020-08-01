import { Component } from '@angular/core';


@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent {

  progreso1 = 50;
  progreso2 = 80;

  get getPorcentaje1(): string {
    return `${this.progreso1}%`;
  }
  get getPorcentaje2(): string {
    return `${this.progreso2}%`;
  }


}
