import {Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {Response} from '@angular/http';

import {NotAuthenticatedError} from './../security/transport-http';
import {ToastyService} from 'ng2-toasty';
import {TranslateService} from 'ng2-translate';

@Injectable()
export class ErrorHandlerService {

   constructor(private toasty: ToastyService,
               private router: Router,
               private translate: TranslateService) {
   }

   handle(errorResponse: any) {
      let msg: string;
      // console.log('DEU ZICA', errorResponse);

      this.translate.get('errors').subscribe(s => {
         if (typeof errorResponse === 'string') {
            msg = errorResponse;

         } else if (errorResponse instanceof NotAuthenticatedError) {
            msg = s['session_expired'];
            this.router.navigate(['/login']);

         } else if (errorResponse instanceof Response
            && errorResponse.status >= 400 && errorResponse.status <= 499) {
            let errors;
            msg = s['processing_request'];

            if (errorResponse.status === 403) {
               msg = s['access_denied'];
               this.router.navigate(['/access-denied']);
            }

            try {
               errors = errorResponse.json();

               msg = errors[0].userMessage;
            } catch (e) {
            }

            console.error('An error has occurred', errorResponse);
         } else {
            msg = s['service_error'];
            console.error('An error has occurred', errorResponse);
         }

         this.toasty.error(msg);
      });
   }

}
