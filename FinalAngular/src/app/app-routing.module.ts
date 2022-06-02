import { LoginComponent } from './components/login/login.component';
import { DosyaDersListeleComponent } from './components/dosyaDersListele/dosyaDersListele.component';
import { OgrlisteleComponent } from './components/ogrlistele/ogrlistele.component';
import { DosyaComponent } from './components/dosya/dosya.component';
import { DerslisteleComponent } from './components/derslistele/derslistele.component';
import { OgretmenComponent } from './components/ogretmen/ogretmen.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DersComponent } from './components/ders/ders.component';
import { OgrenciComponent } from './components/ogrenci/ogrenci.component';

const routes: Routes = [
  {
    path:'',
    component: HomeComponent

  },
  {
    path:'ders',
    component: DersComponent

  },
  {
    path:'ogrenci',
    component: OgrenciComponent
  },
  {
    path:'ogretmen',
    component: OgretmenComponent

  },
  {
    path:'derslistele/:ogrId',
    component: DerslisteleComponent

  },
  
  {
    path:'dosya',
    component: DosyaComponent

  },
  {
    path:'ogrlistele/:dersId',
    component: OgrlisteleComponent

  },
  {
    path:'dosyaderslistele/:dersId',
    component: DosyaDersListeleComponent

  },
  {
    path:'login',
    component: LoginComponent

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
