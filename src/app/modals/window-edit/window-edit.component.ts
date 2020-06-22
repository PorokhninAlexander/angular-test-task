import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Person} from '../../db-service.service';

@Component({
  selector: 'app-window-edit',
  templateUrl: './window-edit.component.html',
  styleUrls: ['./window-edit.component.scss']
})
export class WindowEditComponent implements OnInit {
  @Input() person: Person;
  @Output() isClose = new EventEmitter();
  @Output() editPerson = new EventEmitter();

  firstName = '';
  lastName = '';


  constructor() { }

  ngOnInit(): void {
    this.firstName = this.person.firstName;
    this.lastName = this.person.lastName;
  }

  closeWindow(): void {
    this.isClose.emit(false);
  }

  onEditPerson(): void {
    if (!this.firstName.trim()) { return; }
    if (!this.lastName.trim()) { return; }

    this.person.firstName = this.firstName;
    this.person.lastName = this.lastName;
    this.editPerson.emit(this.person);
  }
}
