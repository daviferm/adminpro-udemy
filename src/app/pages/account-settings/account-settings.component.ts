import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent implements OnInit {


  constructor( private renderer: Renderer2,
               private settingsServices: SettingsService ) { }

  ngOnInit(): void {
    this.settingsServices.checkCurrentTheme();
  }

  changeTheme(tema: string): void {

    this.settingsServices.chageTheme(tema);
  }

}
