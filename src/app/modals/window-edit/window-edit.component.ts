  import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-window-edit',
  templateUrl: './window-edit.component.html',
  styleUrls: ['./window-edit.component.scss']
})
export class WindowEditComponent implements OnInit {
  @Output() isClose = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  closeWindow() {
    this.isClose.emit(false)
  }
}
