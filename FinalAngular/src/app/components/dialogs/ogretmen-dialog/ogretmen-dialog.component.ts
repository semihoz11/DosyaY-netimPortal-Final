import { Ogretmen } from './../../../models/ogretmen';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { OgrenciDialogComponent } from '../ogrenci-dialog/ogrenci-dialog.component';

@Component({
  selector: 'app-ogretmen-dialog',
  templateUrl: './ogretmen-dialog.component.html',
  styleUrls: ['./ogretmen-dialog.component.css']
})
export class OgretmenDialogComponent implements OnInit {

  dialogBaslik: string;
  islem: string;
  frm: FormGroup;
  yeniKayit : Ogretmen;
  constructor(
    public apiService : ApiService,
    public matDialog : MatDialog,
    public frmBuild : FormBuilder,
    public dialogRef : MatDialogRef<OgretmenDialogComponent>,
    @Inject (MAT_DIALOG_DATA) public data : any
  ) {
    this.islem = data.islem;
    this.yeniKayit = data.kayit;
    if (this.islem == "ekle") {

      this.dialogBaslik = "Öğretmen Ekle";
    }
    if (this.islem == "duzenle") {

      this.dialogBaslik = "Öğretmen Düzenle";
    }
    this.frm = this.FormOlustur();
   }

  ngOnInit() {
  }

  FormOlustur(){
    return this.frmBuild.group({
      
      ogrtAdsoyad:[this.yeniKayit.ogrtAdsoyad]
      ,
    });
  }
  

}
