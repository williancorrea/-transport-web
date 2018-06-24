import {Injectable} from '@angular/core';
import {environment} from './../../environments/environment';
import {AuthHttp} from 'angular2-jwt';
import {Bank} from '../core/model/bank';
import {BankFilters} from '../core/model/bankFilters';

@Injectable()
export class BankService {

   apiUrl: string;

   constructor(private http: AuthHttp) {
      this.apiUrl = `${environment.apiUrl}/banks`;
   }

   /**
    * List all records according to the filters passed by parameters
    *
    * @param filter
    * @param {BankFilters} bankFilters
    * @returns {Promise<any>}
    */
   findAll(filter: any, bankFilters: BankFilters): Promise<any> {
      /*
         in a real application, make a remote request to load data using state metadata from event
         event.first = First row offset
         event.rows = Number of rows per page
         event.sortField = Field name to sort with
         event.sortOrder = Sort order as number, 1 for asc and -1 for dec
         filters: FilterMetadata object having field as key and filter value, filter matchMode as value
      */
      const config = {
         params: {
            'size': filter.rows,
            'page': filter.first / filter.rows,
            'sortOrder': filter.sortOrder > 0 ? 'asc' : 'desc',
            'sortField': filter.sortField,
         }
      };
      if (filter.globalFilter && filter.globalFilter.length > 0) {
         config.params['globalFilter'] = filter.globalFilter;
      }
      if (bankFilters.code && bankFilters.code.length > 0) {
         config.params['code'] = bankFilters.code;
      }
      if (bankFilters.name && bankFilters.name.length > 0) {
         config.params['name'] = bankFilters.name;
      }
      if (bankFilters.url && bankFilters.url.length > 0) {
         config.params['url'] = bankFilters.url;
      }

      return this.http.get(`${this.apiUrl}`, config)
         .toPromise()
         .then(response => {
            return response.json();
         });
   }

   /**
    * Search for the record according to the key passed by parameter
    *
    * @param key
    * @returns {Promise<Bank>}
    */
   findOne(key): Promise<Bank> {
      return this.http.get(`${this.apiUrl}/${key}`)
         .toPromise()
         .then(response => {
            return response.json() as Bank;
         });
   }

   /**
    * Delete the record according to the key passed by parameter
    *
    * @param {String} key
    * @returns {Promise<any>}
    */
   delete(key: String): Promise<any> {
      return this.http.delete(`${this.apiUrl}/${key}`)
         .toPromise()
         .then(() => null);
   }

   /**
    * Save the record
    *
    * @param {Bank} bank
    * @returns {Promise<Bank>}
    */
   save(bank: Bank): Promise<Bank> {
      const clone = JSON.parse(JSON.stringify(bank));
      delete clone['key'];
      delete clone['properties'];

      return this.http.post(this.apiUrl,
         JSON.stringify(clone))
         .toPromise()
         .then(response => {
            return response.json() as Bank;
         });
   }

   /**
    * Updates the registry
    *
    * @param {Bank} bank
    * @returns {Promise<Bank>}
    */
   update(bank: Bank): Promise<Bank> {
      const key = bank.key;

      const clone = JSON.parse(JSON.stringify(bank));
      delete clone['key'];
      delete clone['properties'];

      return this.http.put(`${this.apiUrl}/${key}`,
         JSON.stringify(clone))
         .toPromise()
         .then(response => {
            return response.json() as Bank;
         });
   }

}
