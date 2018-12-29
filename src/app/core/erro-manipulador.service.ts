import {Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {Response} from '@angular/http';

import {NotAuthenticatedError} from './../security/transport-http';
import {ToastyService} from 'ng2-toasty';
import {TranslateService} from 'ng2-translate';

@Injectable()
export class ErroManipuladorService {
   labels: any;

   constructor(private toasty: ToastyService,
               private router: Router,
               private translate: TranslateService) {
      this.translate.get('errors').subscribe(s => {
         this.labels = s;
      });
   }

   handle(errorResponse: any): any {
      let mensagemErro: string;

      // TODO: remover log
      console.log('DEU ZICA', errorResponse);
      if (typeof errorResponse === 'string') {
         mensagemErro = errorResponse;

      } else if (errorResponse instanceof NotAuthenticatedError) {
         mensagemErro = this.labels['session_expired'];
         this.router.navigate(['/login']);

      } else if (errorResponse instanceof Response
         && errorResponse.status >= 400 && errorResponse.status <= 499) {
         let errors;
         mensagemErro = this.labels['processing_request'];

         if (errorResponse.status === 403) {
            mensagemErro = this.labels['access_denied'];
            this.router.navigate(['/access-denied']);
         }

         try {
            errors = errorResponse.json();
            mensagemErro = errors[0].userMessage;
         } catch (e) {
         }

         console.error('An error has occurred', errorResponse);
      } else {
         mensagemErro = this.labels['service_error'];
         console.error('An error has occurred', errorResponse);
         this.router.navigate(['/erro']);
      }

      this.toasty.error(mensagemErro);
      return mensagemErro;
   }

}
