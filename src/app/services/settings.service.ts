import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  public elemTheme = document.querySelector('#theme');
  themeDefault = 'assets/css/colors/default.css';
  theme: string;


  constructor() {
    console.log('Servicio Settings');
    this.theme = localStorage.getItem('theme') || this.themeDefault;
    this.elemTheme.setAttribute('href', this.theme);
  }

   chageTheme(theme: string): void {

    const url = `assets/css/colors/${theme}.css`;
    this.elemTheme.setAttribute( 'href', url );
    this.elemTheme.classList.add( 'working');
    localStorage.setItem( 'theme', url );
    this.checkCurrentTheme();

   }

   checkCurrentTheme(): void {

    const links = document.querySelectorAll('.selector');

    links.forEach( elem => {

      elem.classList.remove( 'working' );

      const btnTheme = elem.getAttribute('data-theme');
      const btnThemeUrl = `assets/css/colors/${ btnTheme }.css`;
      const currentTheme = this.elemTheme.getAttribute('href');

      if ( btnThemeUrl === currentTheme ) {
        elem.classList.add( 'working' );
      }
    } );
  }
}
