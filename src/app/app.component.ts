import {Component, OnInit} from '@angular/core';
import {DbServiceService, Person} from './db-service.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit{
  title = 'angular-test-task';

  isEditWindow = false;
  isAddWindow = false;
  isDeleteWindow = false;
  isNotification = false;

  personsArr: Person[] = [];
  editPerson: Person;
  deletePerson: Person;

  text: string;
  notificationDelay = 3000;

  constructor(private dbServices: DbServiceService) {
  }

  ngOnInit(): void {
    this.getPersons();
  }

  onShowEditPerson(person: Person){
    this.isEditWindow = true;
    this.editPerson = person;
  }

  onShowAddPerson(){
    this.isAddWindow = true;
  }

  onShowDeletePerson(person: Person){
    this.isDeleteWindow = true;
    this.deletePerson = person;
  }

  closeWindows(): void {
    this.isEditWindow = false;
    this.isAddWindow = false;
    this.isDeleteWindow = false;
  }

  getPersons(): void{
    this.dbServices.getPersons()
      .subscribe(response => { this.personsArr = response; },
        error => { this.onNotify(this.dbServices.errorHandler(error)); });
  }

  onEditPerson(person: Person): void {
    this.dbServices.editPerson(person)
      .subscribe(response => {},
        error => { this.onNotify(this.dbServices.errorHandler(error)); }
        );
    this.closeWindows();
    this.onNotify('Изменения сохранены');
  }

  onAddPerson(newPerson: Person): void {
    this.dbServices.addPerson(newPerson)
      .subscribe(response => { this.personsArr.push(response); },
          error => { this.onNotify(this.dbServices.errorHandler(error)); }
          );
    this.closeWindows();
    this.onNotify('Добавлен новый сотрудник');
  }

  onDeletePerson(id: number): void {
    this.dbServices.deletePerson(id)
      .subscribe(response => { this.personsArr = this.personsArr.filter(person => person.id !== id); },
        error => { this.onNotify(this.dbServices.errorHandler(error)); }
        );
    this.closeWindows();
    this.onNotify('Сотрудник удалён');
  }

  onNotify(text: string, delay: number = 3000): void{
    this.text = text;
    this.isNotification = true;
    setTimeout(() => { this.isNotification = false; }, delay);
  }

}


