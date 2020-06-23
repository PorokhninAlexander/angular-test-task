import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Person} from '../../db-service.service';

@Component({
  selector: 'app-window-add',
  templateUrl: './window-add.component.html',
  styleUrls: ['./window-add.component.scss']
})
export class WindowAddComponent implements OnInit {
  @Output() isClose = new EventEmitter<boolean>();
  @Output() newPerson = new EventEmitter<Person>();
  @Output() notificationText = new EventEmitter<string>();

  firstName: string;
  lastName: string;

  constructor() { }

  ngOnInit(): void {
    this.firstName = '';
    this.lastName = '';
  }

  onClose(): void {
    this.isClose.emit(false);
  }

  onAddPerson(): void {
    if (!this.firstName.trim()) {
      this.notificationText.emit('Введите имя');
      return;
    }
    if (!this.lastName.trim()) {
      this.notificationText.emit('Введите фамилию');
      return;
    }

    this.newPerson.emit({
      firstName: this.firstName.trim(),
      lastName: this.lastName.trim()
    });
  }
}
