import {Component} from '@angular/core';
import {AppComponent} from './app.component';

@Component({
   selector: 'app-sidebar',
   templateUrl: './app.menu-lateral.component.html'
})
export class AppMenuLateralComponent {

   constructor(public app: AppComponent) {
   }

}
