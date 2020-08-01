import { Component, Input } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent {

  @Input() titulo = 'Sin título';
   // Doughnut
   // tslint:disable-next-line: no-input-rename
   @Input('Labels') doughnutChartLabels: Label[] = [];
   // tslint:disable-next-line: no-input-rename
   @Input('Data') doughnutChartData: MultiDataSet = [];

   // Establece el tipo de Gráfica
   // tslint:disable-next-line: no-input-rename
   @Input('ChartType') doughnutChartType: ChartType = 'doughnut';

   public colors: Color[] = [
     { backgroundColor: ['#004eff', '#ff8c00', '#e40404'] }
   ];

}
