import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PersonComponent } from './person/person.component';
import { WindowAddComponent } from './modals/window-add/window-add.component';
import { WindowEditComponent } from './modals/window-edit/window-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    PersonComponent,
    WindowAddComponent,
    WindowEditComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
