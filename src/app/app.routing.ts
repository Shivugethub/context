import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DisplayComponent } from './display/display.component';
import { DisplayTableComponent } from './display/display-table/display-table.component';

const routes: Routes = [
  {path: '', component: DisplayComponent},
  {path: 'display' , component: DisplayTableComponent},
  {path: 'home' , component: HomeComponent},
  // {path: '**' , component:  }
];


export const appRoutes = RouterModule.forRoot(routes);
