import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Person} from '../../db-service.service';

@Component({
  selector: 'app-window-delete',
  templateUrl: './window-delete.component.html',
  styleUrls: ['./window-delete.component.scss']
})
export class WindowDeleteComponent implements OnInit {
  @Input() person: Person;
  @Output() isClose = new EventEmitter();
  @Output() deletedPersonId = new EventEmitter();

  firstName = '';
  lastName = '';

  constructor() { }

  ngOnInit(): void {
    this.firstName = this.person.firstName;
    this.lastName = this.person.lastName;
  }

  onClose(): void {
    this.isClose.emit(false);
  }

  onDeletePerson(): void {
    this.deletedPersonId.emit(this.person.id);
  }

}
