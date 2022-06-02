

import { OgrSecDialogComponent } from './../dialogs/ogrSec-Dialog/ogrSec-Dialog.component';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { Sonuc } from 'src/app/models/Sonuc';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Kayit } from './../../models/kayit';
import { Ders } from 'src/app/models/ders';
import { ApiService } from 'src/app/services/api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Ogrenci } from 'src/app/models/ogrenci';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { Ogretmen } from 'src/app/models/ogretmen';

@Component({
  selector: 'app-ogrlistele',
  templateUrl: './ogrlistele.component.html',
  styleUrls: ['./ogrlistele.component.css']
})
export class OgrlisteleComponent implements OnInit {
  dersId : string;
  ogretmenler:Ogretmen[];
  ogrenciler : Ogrenci[];
  ogrtId : string = "";
  ogrId : string = "";
  secDers : Ders;
  kayitlar : Kayit[];
  displayedColumns = ['ogrNo','ogrAdsoyad','ogrYas','islemler'];
  dataSource : any
  confirmDialogRef : MatDialogRef<ConfirmDialogComponent>;
  dialogRef : MatDialogRef<OgrSecDialogComponent>
  constructor(
    public apiServis : ApiService,
    public route : ActivatedRoute,
    public matDialog: MatDialog,
    public alert : MyAlertService
    
  ) { }

  ngOnInit() {
    this.route.params.subscribe(p => {
      this.dersId = p.dersId;
      this.DersById();
      this.KayitListele();
      this.OgretmenListele();
      this.OgrenciListele();
    })
  }

  DersById(){
    this.apiServis.DersById(this.dersId).subscribe((d: Ders)=>{
      this.secDers = d;
    });
  }

  KayitListele(){
    this.apiServis.DersOgrenciListe(this.dersId).subscribe((d: Kayit[]) => {
      this.kayitlar = d;
      this.dataSource = new MatTableDataSource(this.kayitlar);
      
    });
  }

  OgretmenListele(){
    this.apiServis.OgretmenListe().subscribe((d: Ogretmen[]) => {
      this.ogretmenler = d;
      
   });
  
   }

  OgretmenSec(ogrtId : string){

    this.ogrtId = ogrtId;
    console.log(this.ogrtId);
  
  
   }

   OgrenciListele(){
    this.apiServis.OgrenciListe().subscribe((d: Ogrenci[]) => {
      this.ogrenciler = d;
      
   });
  
   }

   OgrenciSec(ogrId : string){
    this.ogrId = ogrId;
    console.log(ogrId);
   }


   Kaydet(){
  
    if (this.ogrId == "" && this.ogrtId == "") {
       
       var s: Sonuc = new Sonuc();
       s.islem = false;
       s.mesaj = "Boş Seçim Yapmayınız";
       this.alert.AlertUygula(s);
 
    } 
    else{
      var kayit : Kayit = new Kayit();
      kayit.kayitDersId = this.dersId;
      kayit.kayitOgrId = this.ogrId;
      kayit.kayitOgrtId = this.ogrtId;
      
 
 
      this.apiServis.KayitEkle(kayit).subscribe((s:Sonuc) => {
        this.alert.AlertUygula(s);
        if (s.islem) {
          this.KayitListele();
        }
      });
       
    }
  }



  Sil(kayit : Kayit){

    this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent),{
      with: '500px'
    };
    this.confirmDialogRef.componentInstance.dialogMesaj= kayit.ogrBilgi.ogrAdsoyad + " isimli Öğrenci Dersten Çıkarılacaktır Onaylıyo musunuz?"
    this.confirmDialogRef.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.KayitSil(kayit.kayitId).subscribe((s:Sonuc) => {
          this.alert.AlertUygula(s)
          if (s.islem) {
            this.KayitListele();
          }
        });
      }
    })
  }

 


}
