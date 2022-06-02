import { ConfirmDialogComponent } from './../dialogs/confirm-dialog/confirm-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MyAlertService } from './../../services/myAlert.service';
import { Component, OnInit } from '@angular/core';
import { Sonuc } from 'src/app/models/Sonuc';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
   confirmDialogRef:MatDialogRef<ConfirmDialogComponent>
  constructor(
    public alert : MyAlertService,
    public MatDialog:MatDialog
  ) { }

  ngOnInit() {
  }

  AlertAc(p:boolean){
    var s:Sonuc = new Sonuc();
    s.islem=p;
    s.mesaj="Test Mesajı"; 
    this.alert.AlertUygula(s);
  }

  ConfirmAc(){
    this.confirmDialogRef = this.MatDialog.open(ConfirmDialogComponent);
    this.confirmDialogRef.componentInstance.dialogMesaj = "Kayıt Silinecektir Onaylıyor musunuz?"
    this.confirmDialogRef.afterClosed().subscribe(d=> {
      console.log(d);
      if (d) {
        // Silme Rutini Çalışacak
        
      }
     
    })

  }
   
}
