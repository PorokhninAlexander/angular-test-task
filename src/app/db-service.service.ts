import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

export interface Person {
  id?: number,
  firstName: string,
  lastName: string
}

@Injectable({
  providedIn: 'root'
})
export class DbServiceService {
  url = 'http://localhost:3000/Persons';

  constructor(private http: HttpClient) {
  }

  getPersons(){
      return this.http.get<Person[]>(this.url);
   }

   editPerson(person){
     return this.http.put<Person[]>(
       this.url + '/' + person.id,
       {firstName : person.firstName, lastName: person.lastName}
       );
   }

   addPerson(person){
      return this.http.post<Person>(this.url, person);
   }

   deletePerson(id){
    return this.http.delete(this.url + '/' + id);
   }
}
