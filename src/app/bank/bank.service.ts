import {Injectable} from '@angular/core';
import {environment} from './../../environments/environment';
import {AuthHttp} from 'angular2-jwt';
import {Bank} from '../core/model/bank';

@Injectable()
export class BankService {

   apiUrl: string;

   constructor(private http: AuthHttp) {
      this.apiUrl = `${environment.apiUrl}/banks`;
   }

   findAll(filter): Promise<any> {
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
            'globalFilter': filter.globalFilter,
            'size': filter.rows,
            'page': filter.first,
            'sortOrder': filter.sortOrder > 0 ? 'asc' : 'desc',
            'sortField': filter.sortField
         }
      };

      return this.http.get(`${this.apiUrl}`, config)
         .toPromise()
         .then(response => {
            return response.json();
         });
   }

   findOne(key): Promise<Bank> {
      return this.http.get(`${this.apiUrl}/${key}`)
         .toPromise()
         .then(response => {
            return response.json() as Bank;
         });
   }

   delete(key: String): Promise<any> {
      return this.http.delete(`${this.apiUrl}/${key}`)
         .toPromise()
         .then(() => null);
   }

   save(bank: Bank): Promise<Bank> {
      delete bank['properties'];

      return this.http.post(this.apiUrl,
         JSON.stringify(bank))
         .toPromise()
         .then(response => {
            return response.json() as Bank;
         });
   }

   update(bank: Bank): Promise<Bank> {
      const key = bank.key;
      
      delete bank['key'];
      delete bank['properties'];

      return this.http.put(`${this.apiUrl}/${key}`,
         JSON.stringify(bank))
         .toPromise()
         .then(response => {
            return response.json() as Bank;
         });
   }

}
