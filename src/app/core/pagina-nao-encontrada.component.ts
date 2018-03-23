import {Component, OnInit} from '@angular/core';

@Component({
   template: `
      <div class="exception-body">
         <div class="exception-panel">
            <img src="../../assets/layout/images/icon-404.png"/>

            <h1>{{'commons.page.not_found' | translate}}</h1>
            <p>{{'commons.page.not_found_description' | translate}}</p>
            <a type="button" routerLink="/"
                    class="ui-button green-btn ui-widget ui-state-default ui-corner-all error-page-btn">
               <span class="ui-button-text ui-c" style="padding:5px;">{{'commons.dashboard' | translate}}</span>
            </a>
         </div>
      </div>
   `,
   styles: []
})
export class PaginaNaoEncontradaComponent {

}
