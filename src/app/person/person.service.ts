import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {PersonFilters} from '../core/model/personFilters';
import {AuthHttp} from 'angular2-jwt';

@Injectable()
export class PersonService {

   apiUrl: string;

   constructor(private http: AuthHttp) {
      this.apiUrl = `${environment.apiUrl}/persons`;
   }

   /**
    * List all records according to the filters passed by parameters
    *
    * @param filter
    * @param {BankFilters} personFilters
    * @returns {Promise<any>}
    */
   findAll(filter: any, personFilters: PersonFilters): Promise<any> {
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

      if (personFilters.name && personFilters.name.length > 0) {
         config.params['name'] = personFilters.name;
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
    * @param obj
    * @returns {Promise<any>}
    */
   save(obj): Promise<any> {
      delete obj['key'];
      delete obj['properties'];

      return this.http.post(this.apiUrl,
         JSON.stringify(obj))
         .toPromise()
         .then(response => {
            return response.json();
         });
   }

   /**
    * Updates the registry
    *
    * @param {Person} obj
    * @returns {Promise<any>}
    */
   update(obj): Promise<any> {
      const key = obj.key;

      delete obj['key'];
      delete obj['properties'];

      return this.http.put(`${this.apiUrl}/${key}`,
         JSON.stringify(obj))
         .toPromise()
         .then(response => {
            return response.json();
         });
   }
}
