import {Component, OnInit} from '@angular/core';

export interface Person {
  id:number,
  firstName:string,
  lastName:string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit{
  title = 'angular-test-task';

  isEditWindow = false;
  isAddWindow = false;

  ngOnInit(): void {
  }

  onShowEditPerson(val){
    this.isEditWindow = true;
  }

  onShowAddPerson(){
    this.isAddWindow = true;
  }

  closeWindows(){
    this.isEditWindow = false;
    this.isAddWindow = false;
  }
}


