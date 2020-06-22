import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface Person {
  id?: number;
  firstName: string;
  lastName: string;
}

@Injectable({
  providedIn: 'root'
})
export class DbServiceService {
  url = 'http://localhost:3000/Persons';

  constructor(private http: HttpClient) {
  }

  getPersons(): Observable<Person[]> {
      return this.http.get<Person[]>(this.url);
   }

   editPerson(person: Person): Observable<Person[]> {
     return this.http.put<Person[]>(
       this.url + '/' + person.id,
       {firstName : person.firstName, lastName: person.lastName}
       );
   }

   addPerson(person: Person): Observable<Person> {
      return this.http.post<Person>(this.url, person);
   }

   deletePerson(id: number): Observable<Person> {
    return this.http.delete<Person>(this.url + '/' + id);
   }
}
