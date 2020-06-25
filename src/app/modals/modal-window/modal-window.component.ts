import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Person} from '../../db-service.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-window-add',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.scss']
})

export class ModalWindowComponent implements OnInit {
  @Input() title: string;
  @Input() buttonText: string;
  @Input() person: Person;
  @Input() type: string;

  @Output() isClose = new EventEmitter<boolean>();
  @Output() outPerson = new EventEmitter<Person>();
  @Output() notificationText = new EventEmitter<string>();

  firstName: string;
  lastName: string;
  form: FormGroup;
  isDisable = false;

  constructor() { }

  ngOnInit(): void {
    this.form = new FormGroup({
      firstName: new FormControl(this.person.firstName.trim(), Validators.required),
      lastName: new FormControl(this.person.lastName.trim(), Validators.required)
    });
  }

  onDisable(){
    this.isDisable = true;
  }

  onEnable(){
    this.isDisable = false;
  }

  onClose(): void {
    this.isClose.emit(false);
  }

  onAddPerson(): void {
    this.outPerson.emit({
      firstName: this.form.value.firstName.trim(),
      lastName: this.form.value.lastName.trim()
    });
  }

  onEditPerson(): void {
    if (this.person.lastName === this.form.value.lastName.trim() && this.person.firstName === this.form.value.firstName.trim()) {
      this.notificationText.emit('Измненений нет');
      return;
    }
    const editPerson: Person = {
      id: this.person.id,
      firstName: this.form.value.firstName.trim(),
      lastName: this.form.value.lastName.trim()
    };
    this.outPerson.emit(editPerson);
  }

  onDeletePerson(): void {
    this.outPerson.emit(this.person);
  }

  continue() {
    if (this.type === 'add'){
      this.onAddPerson();
    } else if (this.type === 'edit'){
      this.onEditPerson();
    } else if (this.type === 'delete'){
      this.onDeletePerson();
    }
  }
}
