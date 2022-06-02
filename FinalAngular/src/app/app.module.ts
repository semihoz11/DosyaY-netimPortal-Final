import { KayitOlDialogComponent } from './components/dialogs/kayitOl-dialog/kayitOl-dialog.component';
import { LoginComponent } from './components/login/login.component';
import { DosyaDersListeleComponent } from './components/dosyaDersListele/dosyaDersListele.component';
import { OgrSecDialogComponent } from './components/dialogs/ogrSec-Dialog/ogrSec-Dialog.component';
import { OgrlisteleComponent } from './components/ogrlistele/ogrlistele.component';
import { VideoDialogComponent } from './components/dialogs/video-dialog/video-dialog.component';
import { DosyaDialogComponent } from './components/dialogs/dosya-dialog/dosya-dialog.component';
import { DosyaComponent } from './components/dosya/dosya.component';

import { DersDialogComponent } from './components/dialogs/ders-dialog/ders-dialog.component';
import { OgretmenDialogComponent } from './components/dialogs/ogretmen-dialog/ogretmen-dialog.component';
import { DerslisteleComponent } from './components/derslistele/derslistele.component';
import { OgrenciDialogComponent } from './components/dialogs/ogrenci-dialog/ogrenci-dialog.component';
import { OgretmenComponent } from './components/ogretmen/ogretmen.component';
import { OgrenciComponent } from './components/ogrenci/ogrenci.component';
import { DersComponent } from './components/ders/ders.component';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { ConfirmDialogComponent } from './components/dialogs/confirm-dialog/confirm-dialog.component';
import { MyAlertService } from './services/myAlert.service';
import { AlertDialogComponent } from './components/dialogs/alert-dialog/alert-dialog.component';
import { MaterialModule } from './material.module';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainNavComponent,
    DersComponent,
    OgrenciComponent,
    OgretmenComponent,
    DerslisteleComponent,
    DosyaComponent,
    OgrlisteleComponent,
    LoginComponent,
    // Dialog
    AlertDialogComponent,
    ConfirmDialogComponent,
    OgrenciDialogComponent,
    OgretmenDialogComponent,
    DersDialogComponent,
    DosyaDialogComponent,
    VideoDialogComponent,
    OgrSecDialogComponent,
    DosyaDersListeleComponent,
    KayitOlDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule
     
  ],
  entryComponents:[
    AlertDialogComponent,
    ConfirmDialogComponent,
    OgrenciDialogComponent,
    OgretmenDialogComponent,
    DersDialogComponent,
    DosyaDialogComponent,
    VideoDialogComponent,
    OgrSecDialogComponent,
    KayitOlDialogComponent
  ],
  providers: [MyAlertService,LoginComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
