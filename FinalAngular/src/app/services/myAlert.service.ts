import { AlertDialogComponent } from './../components/dialogs/alert-dialog/alert-dialog.component';
import { Sonuc } from './../models/Sonuc';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class MyAlertService {
  alertDialogRef!: MatDialogRef<AlertDialogComponent>;

 constructor(
   public matdialog: MatDialog
 ) { }

 AlertUygula(s: Sonuc){
   var baslik = "";
   if (s.islem) {
     baslik = "İşlem Başarılı";
    
   }
   else{
     baslik = "İşlem Başarısız";
   }

   this.alertDialogRef=this.matdialog.open(AlertDialogComponent);
   this.alertDialogRef.componentInstance.dialogBaslik=baslik;
   this.alertDialogRef.componentInstance.dialogMesaj=s.mesaj;
   this.alertDialogRef.componentInstance.dialogIslem=s.islem;

   this.alertDialogRef.afterClosed().subscribe(d=> {
     this.alertDialogRef =null!;
   })

 }

}
