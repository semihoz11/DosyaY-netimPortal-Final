import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Dosya } from 'src/app/models/dosya';
import { ApiService } from 'src/app/services/api.service';
import { DersDialogComponent } from '../ders-dialog/ders-dialog.component';

@Component({
  selector: 'app-dosya-dialog',
  templateUrl: './dosya-dialog.component.html',
  styleUrls: ['./dosya-dialog.component.css']
})
export class DosyaDialogComponent implements OnInit {
  dialogBaslik: string;
  islem: string;
  frm: FormGroup;
  yeniKayit : Dosya;
  constructor(
    public apiService : ApiService,
    public matDialog : MatDialog,
    public frmBuild : FormBuilder,
    public dialogRef : MatDialogRef<DosyaDialogComponent>,
    @Inject (MAT_DIALOG_DATA) public data : any
  ) {
    this.islem = data.islem;
    this.yeniKayit = data.kayit;
    if (this.islem == "ekle") {

      this.dialogBaslik = "Dosya Ekle";
    }
    if (this.islem == "duzenle") {

      this.dialogBaslik = "Dosya Düzenle";
    }
    this.frm = this.FormOlustur();
   }

  ngOnInit() {
  }

  FormOlustur(){
    return this.frmBuild.group({
      
      dosyaAdi:[this.yeniKayit.dosyaAdi],
      //dosyaFoto:[this.yeniKayit.dosyaFoto],
      
      
    }); 
  }

}
