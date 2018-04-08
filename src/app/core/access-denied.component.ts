import {Component, OnInit} from '@angular/core';

@Component({
   template: `
      <div class="exception-body">
         <div class="exception-panel">
            <img src="../../assets/layout/images/icon-access.png"/>

            <h1>{{'commons.page.access_denied' | translate}}</h1>
            <p>{{'commons.page.access_denied_description' | translate}}</p>
            <button type="button" pButton  routerLink="/"
                    label="{{'commons.dashboard' | translate}}"
                    style="padding:5px;"
                    class="ui-button green-btn ui-widget ui-state-default ui-corner-all error-page-btn">
            </button>
         </div>
      </div>
   `,
})
export class AccessDeniedComponent implements OnInit {

   constructor() {
   }

   ngOnInit() {
   }

}
