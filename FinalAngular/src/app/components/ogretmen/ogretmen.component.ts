import { ConfirmDialogComponent } from './../dialogs/confirm-dialog/confirm-dialog.component';
import { Kayit } from './../../models/kayit';
import { OgretmenDialogComponent } from './../dialogs/ogretmen-dialog/ogretmen-dialog.component';
import { Ogretmen } from './../../models/ogretmen';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Ogrenci } from 'src/app/models/ogrenci';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';

import { OgrenciDialogComponent } from '../dialogs/ogrenci-dialog/ogrenci-dialog.component';
import { Sonuc } from 'src/app/models/Sonuc';

@Component({
  selector: 'app-ogretmen',
  templateUrl: './ogretmen.component.html',
  styleUrls: ['./ogretmen.component.css']
})
export class OgretmenComponent implements OnInit {
  [x: string]: any;
  dataSource : any;
  displayedColumns = ['ogrtAdsoyad','islemler'];
  ogretmenler: Ogretmen[];
  dialogRef: MatDialogRef<OgretmenDialogComponent>;
  confirmDialogRef : MatDialogRef<ConfirmDialogComponent>;
  constructor(
    public apiServis: ApiService,
    public matDialog:MatDialog,
    public alert : MyAlertService
  ) { }

  ngOnInit() {
    this.OgretmenListele();
  }

  OgretmenListele(){
    this.apiServis.OgretmenListe().subscribe((d: Ogretmen[]) => {
      this.ogretmenler = d;
      this.dataSource = new MatTableDataSource(this.ogretmenler);
      
    });
  }


  Ekle(){
    var yeniKayit: Ogretmen = new Ogretmen();
    this.dialogRef = this.matDialog.open(OgretmenDialogComponent,{
      width:'400px',
      data: {
        kayit: yeniKayit,
        islem: 'ekle'
      }
    });

      

    this.dialogRef.afterClosed().subscribe(d=>{
      if (d) {
        
      
       this.apiServis.OgretmenEkle(d).subscribe((s: Sonuc) => {
         this.alert.AlertUygula(s);
         if (s.islem) {

           this.OgretmenListele();
          
         }
       })
     }
    });

  }

  Duzenle(kayit: Ogretmen){

    
    this.dialogRef = this.matDialog.open(OgretmenDialogComponent,{
      width:'400px',
      data: {
        kayit: kayit,
        islem: 'duzenle'
      }
    });

    this.dialogRef.afterClosed().subscribe(d=>{

      if (d) {
        
     
       
       kayit.ogrtAdsoyad = d.ogrtAdsoyad;
       

       this.apiServis.OgretmenDuzenle(kayit).subscribe((s: Sonuc) => {
         this.alert.AlertUygula(s);
       });
      } 
    });

  }


  Sil( kayit : Ogretmen){

    this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent,{
      width:'500px'
    })
    this.confirmDialogRef.componentInstance.dialogMesaj=kayit.ogrtAdsoyad + "isimli öğrenci silinecektir onaylıyor musunuz?"

    this.confirmDialogRef.afterClosed().subscribe(d=>{
      if (d) {
        this.apiServis.OgretmenSil(kayit.ogrtId).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.OgretmenListele();
          }
        });
      }
    });

  }

}
