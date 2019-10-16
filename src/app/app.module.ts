import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
// components
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';

import { appRoutes } from './app.routing';

// primeng
import { ContextMenuModule } from 'primeng/contextmenu';
import {DialogModule} from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DisplayComponent } from './display/display.component';
import { DataViewModule } from 'primeng/dataview';
import { DropdownModule } from 'primeng/dropdown';
import { PanelModule } from 'primeng/panel';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import {TableModule} from 'primeng/table';
import { DisplayTableComponent } from './display/display-table/display-table.component';
import { EditorModule } from 'primeng/editor';
import { PaginatorModule } from 'primeng/paginator';
@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    PageNotFoundComponent,
    DisplayComponent,
    DisplayTableComponent,

  ],
  imports: [
    BrowserModule,
    appRoutes,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,

    // primeng
    ContextMenuModule,
    DataViewModule,
    PanelModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    ToastModule,
    TableModule,
    EditorModule,
    PaginatorModule

  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
