import { Component, OnInit, Renderer2 } from '@angular/core';
import { SettingsService } from '../services/settings.service';

// tslint:disable-next-line: typedef
declare function customInitFunctions();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {


  constructor( private settingsServices: SettingsService ) { }

  ngOnInit(): void {
      customInitFunctions();
  }

}
