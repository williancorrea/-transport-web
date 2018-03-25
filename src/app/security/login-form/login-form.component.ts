import {Router} from '@angular/router';
import {Component, OnInit} from '@angular/core';

import {ErrorHandlerService} from './../../core/error-handler.service';
import {AuthService} from './../auth.service';
import {TranslateService} from 'ng2-translate';

@Component({
   selector: 'app-login-form',
   templateUrl: './login-form.component.html',
   styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

   email: string;
   password: string;

   constructor(private auth: AuthService,
               private errorHandler: ErrorHandlerService,
               private router: Router,
               private translate: TranslateService) {
   }

   ngOnInit() {
      this.translate.get('bank').subscribe(s => {
      });
   }

   login() {
      this.auth.login(this.email, this.password)
         .then(() => {
            this.router.navigate(['/banks']);
         })
         .catch(erro => {
            this.errorHandler.handle(erro);
            this.password = '';
         });
   }

}
