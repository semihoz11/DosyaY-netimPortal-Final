import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Ogretmen } from './../../models/ogretmen';
import { Sonuc } from 'src/app/models/Sonuc';
import { Ders } from './../../models/ders';

import { Ogrenci } from './../../models/ogrenci';


import { MyAlertService } from './../../services/myAlert.service';
import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Kayit } from './../../models/kayit';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';



@Component({
  selector: 'app-derslistele',
  templateUrl: './derslistele.component.html',
  styleUrls: ['./derslistele.component.css']
})
export class DerslisteleComponent implements OnInit {
 kayitlar : Kayit[];
 dersler : Ders[];
 ogretmenler:Ogretmen[];
 secOgrenci : Ogrenci;
 ogrId : string;
 dersId : string = "";
 ogrtId : string = "";
 displayedColumns = ['dersKodu','dersAdi','dersKredi','ogrtBilgi','islemler'];
 dataSource: any;
 confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
 
 
  constructor(
    public apiServis : ApiService,
    public alert : MyAlertService,
    public route : ActivatedRoute,
    public MatDialog : MatDialog
  ) { }

  ngOnInit() {
    this.route.params.subscribe(p => {
      if (p) {
        this.ogrId = p.ogrId;
        this.OgrenciGetir();
        this.KayitListele();
        this.DersListele();
        this.OgretmenListele();
        
        
        
      }
    });
  }

  OgrenciGetir(){
     this.apiServis.OgrenciById(this.ogrId).subscribe((d: Ogrenci) => {
       this.secOgrenci = d;
    });
  }

  KayitListele(){
    this.apiServis.OgrenciDersListe(this.ogrId).subscribe((d: Kayit[]) => {
      this.kayitlar = d;
      this.dataSource = new MatTableDataSource(this.kayitlar);
   });
 }

 DersListele(){
  this.apiServis.DersListe().subscribe((d: Ders[]) => {
    this.dersler = d;
    
 });

 }

 OgretmenListele(){
  this.apiServis.OgretmenListe().subscribe((d: Ogretmen[]) => {
    this.ogretmenler = d;
    console.log(d);
    
 });

 }

 OgretmenSec(ogrtId : string){

  this.ogrtId = ogrtId;
  console.log(this.ogrtId);


 }

 DersSec(dersId : string){

  this.dersId = dersId;
  console.log(this.dersId);


 }

 Kaydet(){
  
   if (this.dersId == "" && this.ogrtId == "") {
      
      var s: Sonuc = new Sonuc();
      s.islem = false;
      s.mesaj = "Ders Seciniz";
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


 Sil(kayit:Kayit){

  this.confirmDialogRef = this.MatDialog.open(ConfirmDialogComponent);
    this.confirmDialogRef.componentInstance.dialogMesaj = kayit.dersBilgi.dersAdi + " Dersi Silinecektir Onaylıyor musunuz?"
    this.confirmDialogRef.afterClosed().subscribe(d=> {
      
      if (d) {
        this.apiServis.KayitSil(kayit.kayitId).subscribe((s:Sonuc)=>{
          if (s.islem) {
            this.KayitListele();
          }

        })
        
      }
     
    })



 }

  

}
