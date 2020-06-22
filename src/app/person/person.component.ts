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
  @Output() deleteId = new EventEmitter();

  photo = 'https://st2.depositphotos.com/1104517/11967/v/950/depositphotos_119675554-stock-illustration-male-avatar-profile-picture-vector.jpg';

  showBtns = false;
  constructor() {
  }

  ngOnInit(): void {
  }

  onShowBtn() {
    this.showBtns = true;
  }

  onHideBtn(){
    this.showBtns = false;
  }

  getEditPerson(){
    this.editPerson.emit(this.person);
  }

  getIdPerson(){
    this.deleteId.emit(this.person.id)
  }
}
