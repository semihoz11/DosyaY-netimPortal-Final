import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Ogrenci } from 'src/app/models/ogrenci';
import { Ogretmen } from 'src/app/models/ogretmen';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { OgrenciDialogComponent } from '../ogrenci-dialog/ogrenci-dialog.component';

@Component({
  selector: 'app-ogrSec-Dialog',
  templateUrl: './ogrSec-Dialog.component.html',
  styleUrls: ['./ogrSec-Dialog.component.css']
})
export class OgrSecDialogComponent implements OnInit {
  ogrenciler : Ogrenci[];
  ogretmenler : Ogretmen[];
  ogrtId : string = "";
  displayedColumns = ['ogrNo','ogrAdsoyad','ogrYas','islemler'];
  dataSource : any;
  
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  confirmDialogRef : MatDialogRef<ConfirmDialogComponent>;
  MatDialog: any;
  constructor(
    public apiServis: ApiService,
    public matDialog:MatDialog,
    public alert : MyAlertService,
    public dialogRef: MatDialogRef<OgrenciDialogComponent>
  ) { }

  ngOnInit() {
    this.OgretmenListele();
    this.OgrenciListele();
    
  }

  OgrenciListele(){
    this.apiServis.OgrenciListe().subscribe((d: Ogrenci[]) => {
      this.ogrenciler = d;
      this.dataSource = new MatTableDataSource(this.ogrenciler);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  OgretmenListele(){
    this.apiServis.OgretmenListe().subscribe((d: Ogretmen[]) => {
      this.ogretmenler = d;
      
   });
  
   }

  Filtrele(e: any){

    var deger = e.target.value;
    this.dataSource.filter = deger.trim().toLowerCase();
    if (this.dataSource.paginator) {

      this.dataSource.paginator.firstPage();

    }
  }

  OgrenciSec(ogr: Ogrenci,ogrtId :string){
    this.dialogRef.close(ogr);
  }

  OgretmenSec(ogrtId : string){

    this.ogrtId = ogrtId;
  
  
   }

}
