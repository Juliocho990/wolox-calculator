import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { CaluculatorComponent } from './components/caluculator/caluculator.component';
import { DisplayComponent } from './components/display/display.component';
import { KeyboardComponent } from './components/keyboard/keyboard.component';
import { LogBookComponent } from './components/log-book/log-book.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CaluculatorComponent,
    DisplayComponent,
    KeyboardComponent,
    LogBookComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
