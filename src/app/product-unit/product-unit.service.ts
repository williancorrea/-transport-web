import {Injectable} from '@angular/core';
import {BankFilters} from '../core/model/bankFilters';
import {Bank} from '../core/model/bank';
import {AuthHttp} from 'angular2-jwt';
import {environment} from '../../environments/environment';
import {ProductUnitFilters} from '../core/model/productUnitFilters';

@Injectable()
export class ProductUnitService {

   apiUrl: string;

   constructor(private http: AuthHttp) {
      this.apiUrl = `${environment.apiUrl}/product-units`;
   }

   /**
    * List all records according to the filters passed by parameters
    *
    * @param filter
    * @param {BankFilters} productUnitFilters
    * @returns {Promise<any>}
    */
   findAll(filter: any, productUnitFilters: ProductUnitFilters): Promise<any> {
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
      if (productUnitFilters.name && productUnitFilters.name.length > 0) {
         config.params['name'] = productUnitFilters.name;
      }
      if (productUnitFilters.initials && productUnitFilters.initials.length > 0) {
         config.params['initials'] = productUnitFilters.initials;
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
    * @returns {Promise<any>}
    */
   findOne(key): Promise<any> {
      return this.http.get(`${this.apiUrl}/${key}`)
         .toPromise()
         .then(response => {
            return response.json();
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
    * @param {Bank} obj
    * @returns {Promise<any>}
    */
   save(obj: Bank): Promise<any> {
      const clone = JSON.parse(JSON.stringify(obj));
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
   update(obj: Bank): Promise<Bank> {
      const key = obj.key;

      const clone = JSON.parse(JSON.stringify(obj));
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
