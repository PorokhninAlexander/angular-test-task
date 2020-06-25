import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { PersonsComponent } from './persons.component';
import { ModalWindowComponent } from '../modals/modal-window/modal-window.component';
import { NotificationComponent } from '../notification/notification.component';
import { RefDirective } from './ref.directive';
import {DbServiceService} from '../db-service.service';

@NgModule({
  declarations: [
    ModalWindowComponent,
    NotificationComponent,
    RefDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [DbServiceService],
  entryComponents: [ModalWindowComponent],
  exports: [
    RefDirective,
    NotificationComponent
  ],
  bootstrap: [PersonsComponent]
})
export class PersonsModule { }
