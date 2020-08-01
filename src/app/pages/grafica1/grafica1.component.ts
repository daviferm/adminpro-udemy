import { Component } from '@angular/core';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component  {

  // Gráfica 1
  public labels1 = ['Deportes', 'Moda verano', 'Moda invierno'];
  public data1 = [ [350, 200, 130] ];
  public chartType1 = 'doughnut';
  // Gráfica 2
  public labels2 = ['Deportes', 'Moda verano', 'Moda invierno'];
  public data2 = [ [300, 400, 130] ];
  public chartType2 = 'polarArea';

  // Gráfica 3
  public labels3 = ['Deportes', 'Moda verano', 'Moda invierno'];
  public data3 = [ [300, 200, 130] ];
  public chartType3 = 'bar';

  // Gráfica 4
  public labels4 = ['Deportes', 'Moda verano', 'Moda invierno'];
  public data4 = [ [150, 190, 330] ];
  public chartType4 = 'pie';


  // "line" | "bar" | "horizontalBar" | "radar" | "doughnut" | "polarArea" | "bubble" | "pie" | "scatter"
}
