import {Component, OnInit} from '@angular/core';

@Component({
   template: `
      <div class="exception-body">
         <div class="exception-panel">
            <img src="../../assets/layout/images/icon-access.png"/>

            <h1>{{'commons.page.access_denied' | translate}}</h1>
            <p>{{'commons.page.access_denied_description' | translate}}</p>
            <button type="button" onclick="location.href='/';"
                    class="ui-button green-btn ui-widget ui-state-default ui-corner-all error-page-btn">
               <span class="ui-button-text ui-c" style="padding:5px;">{{'commons.dashboard' | translate}}</span>
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
