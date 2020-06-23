import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Person} from '../../db-service.service';

@Component({
  selector: 'app-window-edit',
  templateUrl: './window-edit.component.html',
  styleUrls: ['./window-edit.component.scss']
})
export class WindowEditComponent implements OnInit {
  @Input() person: Person;
  @Output() isClose = new EventEmitter<boolean>();
  @Output() editPerson = new EventEmitter<Person>();
  @Output() notificationText = new EventEmitter<string>();

  firstName: string;
  lastName: string;


  constructor() { }

  ngOnInit(): void {
    this.firstName = this.person.firstName;
    this.lastName = this.person.lastName;
  }

  closeWindow(): void {
    this.isClose.emit(false);
  }

  onEditPerson(): void {
    if (!this.firstName.trim()) {
      this.notificationText.emit('Введите имя');
      return;
    }
    if (!this.lastName.trim()) {
      this.notificationText.emit('Введите фамилию');
      return;
    }
    if (this.person.lastName === this.lastName && this.person.firstName === this.firstName) {
      this.notificationText.emit('Измненений нет');
      return;
    }

    this.person.firstName = this.firstName.trim();
    this.person.lastName = this.lastName.trim();
    this.editPerson.emit(this.person);
  }
}
