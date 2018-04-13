import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { RoutingModule } from './routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { InMemoryDataService } from './services/in-memory-data.service';
import { SqlSnippetsComponent } from './sql-snippets/sql-snippets.component';
import { TabsComponent } from './tabs/tabs.component';
import {
  MatAutocompleteModule,
  MatButtonModule, MatCardModule, MatCheckboxModule, MatDialogModule, MatIconModule, MatInputModule, MatListModule,
  MatMenuModule,
  MatSelectModule,
  MatSidenavModule,
  MatSlideToggleModule, MatTableModule, MatTabsModule,
  MatToolbarModule
} from '@angular/material';
import {CoreService} from './services/core.service';
import {WebSocketService} from './services/websocket.service';
import {HttpClientModule} from '@angular/common/http';
import {ScalaSnippetsComponent} from "./scala-snippets/scala-snippets.component";
import {DiscoverComponent} from './discover/discover.component';
import {TableBasicExample} from './table-basic/table-basic-example';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DiscoverComponent,
    TableBasicExample,
    SqlSnippetsComponent,
    ScalaSnippetsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RoutingModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatTabsModule,
    MatToolbarModule,
    MatTableModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [CoreService, WebSocketService],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule { }
