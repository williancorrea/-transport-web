import {Component} from '@angular/core';

@Component({
   selector: 'app-footer',
   template: `
      <div class="footer clearfix">
         <img src="assets/layout/images/logo.png"/>
         <span>{{"empresa.razao_social" | translate}}</span>
         <a href="https://github.com/primefaces/primeng"><i class="fa fa-github"></i></a>
         <a href="https://www.facebook.com/groups/primefaces"><i class="fa fa-facebook"></i></a>
         <a href="https://twitter.com/prime_ng"><i class="fa fa-twitter"></i></a>
      </div>
   `
})
export class AppRodapeComponent {

}
