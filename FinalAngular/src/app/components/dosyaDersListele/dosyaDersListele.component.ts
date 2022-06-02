import { Ders } from './../../models/ders';
import { DosyaKayit } from './../../models/dosyakayit';
import { Kayit } from './../../models/kayit';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { Sonuc } from 'src/app/models/Sonuc';

@Component({
  selector: 'app-dosyaDersListele',
  templateUrl: './dosyaDersListele.component.html',
  styleUrls: ['./dosyaDersListele.component.css']
})
export class DosyaDersListeleComponent implements OnInit {
  kayitlar : DosyaKayit[];
  dersId : string = "";
  displayedColumns = ['dersAdi','dosyaAdi','dosyaFoto','islemler'];
  dataSource: any;
  confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
  constructor(
    public apiServis : ApiService,
    public alert : MyAlertService,
    public route : ActivatedRoute,
    public matDialog:MatDialog
  ) { }

  ngOnInit() {
    this.route.params.subscribe(p => {
      if (p) {
        this.dersId = p.dersId;
        this.DosyaDersListele(this.dersId);
     
        
        
      }
    });
  }

  DosyaDersListele(dersId:string){
    this.apiServis.DosyaKayitListele(dersId).subscribe((d: DosyaKayit[]) => {
      this.kayitlar = d;
      this.dataSource = new MatTableDataSource(this.kayitlar);
   });
 }





 Sil(kayit:DosyaKayit){

  this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent);
    this.confirmDialogRef.componentInstance.dialogMesaj = kayit.dosyaBilgi.dosyaAdi + " İsimli Dosya Dersten Silinecektir Onaylıyor musunuz?"
    this.confirmDialogRef.afterClosed().subscribe(d=> {
      
      if (d) {
        this.apiServis.DosyaKayitSil(kayit.dkId).subscribe((s:Sonuc)=>{
          if (s.islem) {
            this.DosyaDersListele(this.dersId);
          }

        })
        
      }
     
    })



 }

}
