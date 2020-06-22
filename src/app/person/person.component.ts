import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Person} from '../db-service.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {
  @Input() person: Person;
  @Output() editPerson = new EventEmitter();
  @Output() deletePerson = new EventEmitter();

  photo = 'https://image.flaticon.com/icons/svg/848/848043.svg';
  showBtns = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  onShowBtn(): void {
    this.showBtns = true;
  }

  onHideBtn(): void {
    this.showBtns = false;
  }

  getEditPerson(): void {
    this.editPerson.emit(this.person);
  }

  getDeletePerson(): void {
    this.deletePerson.emit(this.person);
  }
}
