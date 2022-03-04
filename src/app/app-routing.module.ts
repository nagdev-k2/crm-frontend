import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoaderComponent } from './components/loader/loader.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  // {path:'',component: EntryComponent},
  {path:'',component: LoginComponent},
  {path:'dashboard', component: DashboardComponent},
  {path:'loader', component: LoaderComponent},
  {path:'dashboard/:type', component: DashboardComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
