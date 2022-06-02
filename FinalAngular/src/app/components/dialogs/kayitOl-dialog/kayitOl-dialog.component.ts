import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Ogrenci } from 'src/app/models/ogrenci';
import { ApiService } from 'src/app/services/api.service';
import { OgrenciDialogComponent } from '../ogrenci-dialog/ogrenci-dialog.component';

@Component({
  selector: 'app-kayitOl-dialog',
  templateUrl: './kayitOl-dialog.component.html',
  styleUrls: ['./kayitOl-dialog.component.css']
})
export class KayitOlDialogComponent implements OnInit {
  dialogBaslik: string;
  islem: string;
  frm: FormGroup;
  yeniKayit : Ogrenci;
  constructor(
    public apiService : ApiService,
    public matDialog : MatDialog,
    public frmBuild : FormBuilder,
    public dialogRef : MatDialogRef<OgrenciDialogComponent>,
    @Inject (MAT_DIALOG_DATA) public data : any
  ) { 
    this.islem = data.islem;
    this.yeniKayit = data.kayit;
    if (this.islem == "ekle") {

      this.dialogBaslik = "Yeni Kullanıcı";
    }
    if (this.islem == "duzenle") {

      this.dialogBaslik = "Öğrenci Düzenle";
    }
    this.frm = this.FormOlustur();
  }

  ngOnInit() {
  }

  FormOlustur(){

    return this.frmBuild.group({
      ogrNo:[this.yeniKayit.ogrNo],
      ogrAdsoyad:[this.yeniKayit.ogrAdsoyad],
      ogrYas:[this.yeniKayit.ogrYas],
      ogrKulAdi:[this.yeniKayit.ogrKulAdi],
      ogrKulSifre:[this.yeniKayit.ogrKulSifre],
      ogrKulYetki:[this.yeniKayit.ogrKulYetki],
    });
  }

}