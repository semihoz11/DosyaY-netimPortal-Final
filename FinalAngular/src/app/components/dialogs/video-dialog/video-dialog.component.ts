
import { ApiService } from 'src/app/services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { Video } from 'src/app/models/video';
import { Dosya } from 'src/app/models/dosya';


@Component({
  selector: 'app-video-dialog',
  templateUrl: './video-dialog.component.html',
  styleUrls: ['./video-dialog.component.css']
})
export class VideoDialogComponent implements OnInit {
  secilenVideo : any;
  dersFoto : Video = new Video();
  secDosya : Dosya;
   
  constructor(
    public videoDialogRef: MatDialogRef<VideoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data : any,
    public apiServis : ApiService
  ) { 
    this.secDosya = data;
  }

  ngOnInit() {
  }


  VideoSec(a : any){

    var videoolar = a.target.files;
    var videoo = videoolar[0];

    var fr= new FileReader();
    fr.onloadend=()=>{
      this.secilenVideo=fr.result;
      this.dersFoto.fotoData = fr.result.toString();
      this.dersFoto.fotoUzanti = videoo.type;
    };
    fr.readAsDataURL(videoo);
  }

}
