import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { PersonComponent } from './person/person.component';
import { WindowAddComponent } from './modals/window-add/window-add.component';
import { WindowEditComponent } from './modals/window-edit/window-edit.component';
import { WindowDeleteComponent } from './modals/window-delete/window-delete.component';
import { NotificationComponent } from './notification/notification.component';

@NgModule({
  declarations: [
    AppComponent,
    PersonComponent,
    WindowAddComponent,
    WindowEditComponent,
    WindowDeleteComponent,
    NotificationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
