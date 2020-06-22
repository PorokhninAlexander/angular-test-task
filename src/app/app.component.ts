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
  personsArr: Person[];
  editPerson: Person;

  constructor(private dbServices: DbServiceService) {
  }

  ngOnInit(): void {
    this.dbServices.getPersons().subscribe(response => this.personsArr = response);
  }


  onShowEditPerson(value){
    this.isEditWindow = true;
    this.editPerson = value;
  }

  onShowAddPerson(){
    this.isAddWindow = true;

  }

  closeWindows(): void {
    this.isEditWindow = false;
    this.isAddWindow = false;
  }

  onEditPerson(person: Person): void {
    this.dbServices.editPerson(person).subscribe();
    this.closeWindows();
  }

  onAddPerson(newPerson: Person): void {
    this.dbServices.addPerson(newPerson).subscribe(response => this.personsArr.push(response));
    this.closeWindows();
  }

  onDeletePerson(id: number): void {
    this.dbServices.deletePerson(id)
      .subscribe(response => this.personsArr = this.personsArr.filter(person => person.id !== id));
  }
}


