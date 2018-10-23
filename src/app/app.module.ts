import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import {DataTableModule} from "angular2-datatable";
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { RequestService } from './request.service';
import { AppService } from './app.service';
import { DataService } from './data.service';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    DataTableModule,
    AngularFontAwesomeModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
  ],
  providers: [
    RequestService,
    AppService,
    DataService,
    BsModalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
