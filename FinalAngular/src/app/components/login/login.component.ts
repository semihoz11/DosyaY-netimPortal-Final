import { KayitOlDialogComponent } from './../dialogs/kayitOl-dialog/kayitOl-dialog.component';
import { Ogrenci } from 'src/app/models/ogrenci';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/services/api.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Sonuc } from 'src/app/models/Sonuc';
import { MyAlertService } from 'src/app/services/myAlert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  ogrenciler : any;
  dialogRef: MatDialogRef<KayitOlDialogComponent>;
  secOgrenci : any;
  b : boolean = true; 
  uyeUrl : string =""; 
  kulUyeAdi : string = "semih";
  kulUyeSifre : string = "123";
  
  
  constructor(
    public apiServis: ApiService,
    public matDialog:MatDialog,
    public alert : MyAlertService
  ) { }

  ngOnInit() {

    
  }


  OgrenciListele(){
    this.apiServis.OgrenciListe().subscribe((d: Ogrenci[]) => {
      this.ogrenciler = d;
      
      
    });
  }

  UyeKontrol(ogrKulAdi:string,ogrKulSifre:string){
    
    if (this.kulUyeAdi==ogrKulAdi && this.kulUyeSifre==ogrKulSifre) {

      this.uyeUrl = "'/ders'";
      console.log(this.uyeUrl); 
      return  this.b = false;
        
    }else{

      
      return this.b = true
      
    }

    //[routerLink]="['/'+uyeUrl]"


  }



  Ekle(){

    var yeniKayit: Ogrenci = new Ogrenci();
    this.dialogRef = this.matDialog.open(KayitOlDialogComponent,{
      width:'400px',
      data: {
        kayit: yeniKayit,
        islem: 'ekle'
      }
    });

      

    this.dialogRef.afterClosed().subscribe(d=>{
      if (d) {
        
      this.secOgrenci = d; 
       this.apiServis.OgrenciEkle(d).subscribe((s: Sonuc) => {
         this.alert.AlertUygula(s);
         if (s.islem) {

           
          
         }
       })
     }
    });

  }
}
