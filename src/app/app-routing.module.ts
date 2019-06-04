import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LogBookComponent } from './components/log-book/log-book.component';
import { CaluculatorComponent } from './components/caluculator/caluculator.component';

const routes: Routes = [
  { path: 'home',
  component: HomeComponent,
    children: [
      { path: 'calc', component: CaluculatorComponent },
      { path: 'log', component: LogBookComponent },
      { path: '**', redirectTo: 'calc' },
    ]
  },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

