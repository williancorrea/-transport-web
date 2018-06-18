import {Injectable} from '@angular/core';
import {Bank} from '../core/model/bank';
import {AuthHttp} from 'angular2-jwt';
import {environment} from '../../environments/environment';
import {TypeRelationshipFilters} from '../core/model/typeRelationshipFilters';

@Injectable()
export class TypeRelationshipService {

   apiUrl: string;

   constructor(private http: AuthHttp) {
      this.apiUrl = `${environment.apiUrl}/types-of-relationships`;
   }

   /**
    * List all records according to the filters passed by parameters
    *
    * @param filter
    * @param {BankFilters} typeRelationshipFilters
    * @returns {Promise<any>}
    */
   findAll(filter: any, typeRelationshipFilters: TypeRelationshipFilters): Promise<any> {
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
      if (typeRelationshipFilters.code && typeRelationshipFilters.code.length > 0) {
         config.params['code'] = typeRelationshipFilters.code;
      }
      if (typeRelationshipFilters.name && typeRelationshipFilters.name.length > 0) {
         config.params['name'] = typeRelationshipFilters.name;
      }
      if (typeRelationshipFilters.description && typeRelationshipFilters.description.length > 0) {
         config.params['description'] = typeRelationshipFilters.description;
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
    * @param  obj
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
