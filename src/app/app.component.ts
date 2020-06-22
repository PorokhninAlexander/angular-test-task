import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DbServiceService, Person} from './db-service.service';
import {subscribeOn} from 'rxjs/operators';

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

  closeWindows(){
    this.isEditWindow = false;
    this.isAddWindow = false;
  }

  onEditPerson(person){
    this.dbServices.editPerson(person).subscribe(response => console.log(response));
    this.closeWindows();
  }

  onAddPerson(newPerson) {
    console.log(newPerson);
    this.dbServices.addPerson(newPerson).subscribe(response => this.personsArr.push(response));
    this.closeWindows();
  }

  onDeletePerson(id) {
    this.dbServices.deletePerson(id)
      .subscribe(response => this.personsArr = this.personsArr.filter(person => person.id != id));
  }
}


