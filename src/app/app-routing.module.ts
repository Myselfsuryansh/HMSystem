import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientComponent } from './component/dashboard/patient/patient.component';
import { DoctorComponent } from './component/dashboard/doctor/doctor.component';
import { ViewDoctorComponent } from './component/dashboard/doctor/view-doctor/view-doctor.component';
import { AuthguardGuard } from './shared/guard/auth.guard';
import { LoginComponent } from './component/dashboard/auth/login/login.component';

const routes: Routes = [
  {path:'dashboard',children:[
    {path:'',redirectTo:'patient',pathMatch:'full'},
    {path:'patient',component:PatientComponent},
    {path:'doctor',component:DoctorComponent},
    {path:'doctor/:id',component:ViewDoctorComponent}
  ], canActivate:[AuthguardGuard]},
  {path:'login',component:LoginComponent},
  {path:'',redirectTo:'login',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
