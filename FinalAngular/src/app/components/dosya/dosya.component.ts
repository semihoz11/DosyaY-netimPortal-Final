import { DosyaKayit } from './../../models/dosyakayit';
import { Kayit } from './../../models/kayit';
import { ConfirmDialogComponent } from './../dialogs/confirm-dialog/confirm-dialog.component';
import { Video } from 'src/app/models/video';
import { VideoDialogComponent } from './../dialogs/video-dialog/video-dialog.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Ders } from 'src/app/models/ders';
import { Dosya } from 'src/app/models/dosya';
import { Sonuc } from 'src/app/models/Sonuc';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';

import { DosyaDialogComponent } from '../dialogs/dosya-dialog/dosya-dialog.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dosya',
  templateUrl: './dosya.component.html',
  styleUrls: ['./dosya.component.css']
})
export class DosyaComponent implements OnInit {
  [x: string]: any;
  kayitlar : DosyaKayit[];
  dataSource : any;
  displayedColumns = ['dosyaAdi','dosyaFoto','islemler'];
  dersler : Ders[];
  dosyalar : Dosya[];
  dkDersId : string = "";
  dkDosyaId : string  = "";
  

  dialogRef: MatDialogRef<DosyaDialogComponent>;
  videoDialogRef: MatDialogRef<VideoDialogComponent>;
  confirmDialogRef : MatDialogRef<ConfirmDialogComponent>;
  dosyaUrl = "http://localhost:65368//Dosyalar/"
  dosyaLink: string;
  constructor(
    public apiServis: ApiService,
    public matDialog:MatDialog,
    public alert : MyAlertService
  ) { }

  ngOnInit() {
    this.DosyaListele();
    this.DersListele();
    //this.DosyaKayitListele();
    
  }

  //DosyaKayitListele(){
    //this.apiServis.DosyaKayitListele(this.dkId).subscribe((d: DosyaKayit[]) => {
      //this.kayitlar = d;
      //this.dataSource = new MatTableDataSource(this.kayitlar);
      
    //});
  //}

  DosyaListele(){
    this.apiServis.DosyaListe().subscribe((d: Dosya[]) => {
      this.dosyalar = d;
      this.dataSource = new MatTableDataSource(this.dosyalar);
      
    });
  }
  DosyaSec(dosyaId : string){

    this.dkDosyaId = dosyaId;
    console.log(this.dkDosyaId);
  
  
   }

  DersListele(){
    this.apiServis.DersListe().subscribe((d: Ders[]) => {
      this.dersler = d;
      
   });
  
   }

   DersSec(dersId : string){

    this.dkDersId = dersId;
    console.log(this.dkDersId);
  
  
   }
   Kaydet(){
  
    if (this.dkDersId == "" && this.dkDosyaId == "") {
       
       var s: Sonuc = new Sonuc();
       s.islem = false;
       s.mesaj = "Boş Seçim Yapmayınız";
       this.alert.AlertUygula(s);
 
    } 
    else{
      var kayit : DosyaKayit = new DosyaKayit();
      kayit.dkDersId = this.dkDersId;
      kayit.dkDosyaId = this.dkDosyaId;
      
      
 
 
      this.apiServis.DosyaKayitEkle(kayit).subscribe((s:Sonuc) => {
        this.alert.AlertUygula(s);
        if (s.islem) {
          //this.DosyaKayitListele();
        }
      });
       
    }
  }


  Ekle(){
    var yeniKayit: Dosya = new Dosya();
    this.dialogRef = this.matDialog.open(DosyaDialogComponent,{
      width:'400px',
      data: {
        kayit: yeniKayit,
        islem: 'ekle'
      }
    });

      

    this.dialogRef.afterClosed().subscribe(d=>{
      if (d) {
        
      
       this.apiServis.DosyaEkle(d).subscribe((s: Sonuc) => {
         this.alert.AlertUygula(s);
         if (s.islem) {

           this.DosyaListele();
          
         }
       })
     }
    });

  }

  Sil( kayit : Dosya){

    this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent,{
      width:'500px'
    })
    this.confirmDialogRef.componentInstance.dialogMesaj=kayit.dosyaAdi + "isimli dosya silinecektir onaylıyor musunuz?"

    this.confirmDialogRef.afterClosed().subscribe(d=>{
      if (d) {
        this.apiServis.DosyaSil(kayit.dosyaId).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.DosyaListele();
          }
        });
      }
    });

  }


  VideoYukle(kayit: Dosya){

    this.videoDialogRef =this.matDialog.open(VideoDialogComponent,{
      width: '400px',
      data : kayit
    });

    this.videoDialogRef.afterClosed().subscribe((d:Video) => {
      if (d) {
        d.dosyaId = kayit.dosyaId
        this.apiServis.DosyaVideoEkle(d).subscribe((s:Sonuc)=>{
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.DosyaListele();
          }

        });
      }
    })

  }





  

}
