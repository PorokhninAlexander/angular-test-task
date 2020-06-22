import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-window-add',
  templateUrl: './window-add.component.html',
  styleUrls: ['./window-add.component.scss']
})
export class WindowAddComponent implements OnInit {
  @Output() isClose = new EventEmitter();
  @Output() newPerson = new EventEmitter();

  firstName = '';
  lastName = '';

  constructor() { }

  ngOnInit(): void {
  }

  onClose(){
    this.isClose.emit(false);
  }

  onAddPerson(){
    this.newPerson.emit({
      firstName: this.firstName,
      lastName: this.lastName
    });
  }
}
