import {Component, OnInit} from '@angular/core';

@Component({
   template: `
      <body class="exception-body">
         <div class="exception-panel">
            <img src="../../assets/layout/images/icon-error.png"/>

            <!-- TODO: internacionalizar os textos-->
            <h1>Erro</h1>
            <p>Um erro ocorreu, tente novamente mais tarde.</p>
            <button type="button" pButton  routerLink="/"
                    label="{{'commons.dashboard' | translate}}"
                    style="padding:5px;"
                    class="ui-button green-btn ui-widget ui-state-default ui-corner-all">
            </button>
         </div>
      </body>
   `,
})
export class ErroComponent implements OnInit {

   constructor() {
   }

   ngOnInit() {
   }

}
