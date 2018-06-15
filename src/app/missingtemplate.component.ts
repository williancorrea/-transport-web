import {MissingTranslationHandler, MissingTranslationHandlerParams} from 'ng2-translate';

export class MyMissingTranslationHandler implements MissingTranslationHandler {
   handle(params: MissingTranslationHandlerParams) {
      return 'Tradução não disponível para: ' + params.key;
   }
}
