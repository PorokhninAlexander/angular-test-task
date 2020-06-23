import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
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
  url = 'http://localhost:3001/Persons';

  constructor(private http: HttpClient) {
  }

  getPersons(): Observable<Person[]> {
    return this.http.get<Person[]>(this.url);
  }

  editPerson(person: Person): Observable<Person> {
    return this.http.put<Person>(
      this.url + '/' + person.id,
      {firstName : person.firstName, lastName: person.lastName}
      );
  }

  addPerson(person: Person): Observable<Person> {
    return this.http.post<Person>(this.url, person);
  }

  deletePerson(id: number): Observable<Person> {return this.http.delete<Person>(this.url + '/' + id );
  }

  errorHandler(error: HttpErrorResponse): string{
    switch (error.status) {
      case 400:
        return 'Неверный запрос';

      case 404:
        return 'Сущность не найдена в системе';

      case 500:
        return 'Серверная ошибка';

      default:
        return 'Неизвестная ошибка';
    }
  }
}
