import { ConfirmDialogComponent } from './../dialogs/confirm-dialog/confirm-dialog.component';
import { Sonuc } from 'src/app/models/Sonuc';
import { Ders } from './../../models/ders';
import { DersDialogComponent } from './../dialogs/ders-dialog/ders-dialog.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Ogretmen } from 'src/app/models/ogretmen';

import { OgretmenDialogComponent } from '../dialogs/ogretmen-dialog/ogretmen-dialog.component';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-ders',
  templateUrl: './ders.component.html',
  styleUrls: ['./ders.component.css']
})
export class DersComponent implements OnInit {
  //[x: string]: any;
  dataSource : any;
  displayedColumns = ['dersKodu','dersAdi','dersKredi','islemler'];
  dersler : Ders[];
  dialogRef: MatDialogRef<DersDialogComponent>;
  confirmDialogRef : MatDialogRef<ConfirmDialogComponent>;
  
  constructor(
    public apiServis: ApiService,
    public matDialog:MatDialog,
    public alert : MyAlertService
  ) { }

  ngOnInit() {
    this.DersListele();
  }

  DersListele(){
    this.apiServis.DersListe().subscribe((d: Ders[]) => {
      this.dersler = d;
      this.dataSource = new MatTableDataSource(this.dersler);
      
    });
  }

  Ekle(){
    var yeniKayit: Ders = new Ders();
    this.dialogRef = this.matDialog.open(DersDialogComponent,{
      width:'400px',
      data: {
        kayit: yeniKayit,
        islem: 'ekle'
      }
    });

      

    this.dialogRef.afterClosed().subscribe(d=>{
      if (d) {
        
      
       this.apiServis.DersEkle(d).subscribe((s: Sonuc) => {
         this.alert.AlertUygula(s);
         if (s.islem) {

           this.DersListele();
          
         }
       })
     }
    });

  }

  Duzenle(kayit: Ders){

    
    this.dialogRef = this.matDialog.open(DersDialogComponent,{
      width:'400px',
      data: {
        kayit: kayit,
        islem: 'duzenle'
      }
    });

    this.dialogRef.afterClosed().subscribe(d=>{

      if (d) {
        
     
       
       
       kayit.dersKodu = d.dersKodu;
       kayit.dersAdi = d.dersAdi;
       kayit.dersKredi= d.dersKredi;

       

       this.apiServis.DersDuzenle(kayit).subscribe((s: Sonuc) => {
         this.alert.AlertUygula(s);
       });
      } 
    });

  }

  Sil( kayit : Ders){

   this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent,{
     width:'500px'
   })
    this.confirmDialogRef.componentInstance.dialogMesaj=kayit.dersAdi + "isimli ders silinecektir onaylıyor musunuz?"

    this.confirmDialogRef.afterClosed().subscribe(d=>{
      if (d) {
        this.apiServis.DersSil(kayit.dersId).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.DersListele();
          }
        });
      }
    });

  }


}
