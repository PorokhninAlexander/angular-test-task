import {Component, EventEmitter, OnInit, Output} from '@angular/core';
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

  personsArr: Person[];
  editPerson: Person;
  deletePerson: Person;
  text: string;

  constructor(private dbServices: DbServiceService) {
  }

  ngOnInit(): void {
    this.dbServices.getPersons().subscribe(response => this.personsArr = response);
    this.text = 'gkuyvvkc ky guk';
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

  onEditPerson(person: Person): void {
    this.dbServices.editPerson(person).subscribe();
    this.closeWindows();
    this.onNotify('Изменения сохранены');
  }

  onAddPerson(newPerson: Person): void {
    this.dbServices.addPerson(newPerson).subscribe(response => this.personsArr.push(response));
    this.closeWindows();
    this.onNotify('Добавлен новый сотрудник');
  }

  onDeletePerson(id: number): void {
    this.dbServices.deletePerson(id)
      .subscribe(response => this.personsArr = this.personsArr.filter(person => person.id !== id));
    this.closeWindows();
    this.onNotify('Сотрудник удалён');
  }

  onNotify(text: string): void{
    this.text = text;
    this.isNotification = true;
    setTimeout(() => {this.isNotification = false}, 3000);
  }

}


