import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {
  @Output() editPerson = new EventEmitter();

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
    console.log('resp');
    this.editPerson.emit(true);
  }
}
