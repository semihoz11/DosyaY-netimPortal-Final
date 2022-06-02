import { DosyaKayit } from './../models/dosyakayit';
import { Video } from './../models/video';
import { Ogretmen } from './../models/ogretmen';
import { Kayit } from './../models/kayit';

import { Ders } from './../models/ders';
import { Ogrenci } from './../models/ogrenci';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dosya } from '../models/dosya';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  kulAdminAdi : string = "admin";
  kulAdminSifre : string = "123";
  kulUyeAdi : string = "semih";
  kulUyeSifre : string = "123";


  apiUrl = "http://localhost:65368/api/";
  siteUrl = "http://localhost:65368/";
  constructor(
    public http  : HttpClient
  )  { }


  //Oğrenci Servisleri Başlangıç

  OgrenciListe(){

    return this.http.get<Ogrenci[]>(this.apiUrl + "ogrenciliste");
  }

  OgrenciById(ogrId: string){
    return this.http.get(this.apiUrl + "ogrencibyid/" + ogrId);

  }

  OgrenciEkle(ogr:Ogrenci){
    return this.http.post(this.apiUrl +"ogrenciekle", ogr);
  }

  OgrenciDuzenle(ogr:Ogrenci){
    return this.http.put(this.apiUrl +"ogrenciduzenle",ogr);
  }

  OgrenciSil(ogrId: string){
    return this.http.delete(this.apiUrl +"ogrencisil/" + ogrId);

  }

  //Oğrenci Servisleri Bitiş


  
  //Oğretmen Servisleri Başlangıç
  OgretmenListe(){

    return this.http.get<Ogretmen[]>(this.apiUrl + "ogretmenlistele");
  }

  OgretmenById(ogrtId: string){
    return this.http.get(this.apiUrl + "ogretmenbyid/" + ogrtId);

  }

  OgretmenEkle(ogrt:Ogretmen){
    return this.http.post(this.apiUrl + "ogretmenekle",ogrt);
  }

  OgretmenDuzenle(ogrt:Ogretmen){
    return this.http.put(this.apiUrl + "ogretmenduzenle",ogrt);
  }

  OgretmenSil(ogrtId: string){
    return this.http.delete(this.apiUrl + "ogretmensil/" + ogrtId);

  }
  

  //Oğretman Servisleri Bitiş


  //Ders Servisleri Başlangıç

  DersListe(){

    return this.http.get<Ders[]>(this.apiUrl + "dersliste");
  }

  DersById(dersId: string){
    return this.http.get<Ders>(this.apiUrl + "dersbyid/" + dersId);

  }

  DersEkle(ders:Ders){
    return this.http.post(this.apiUrl + "dersekle",ders);
  }

  DersDuzenle(ders:Ders){
    return this.http.put(this.apiUrl + "dersduzenle",ders);
  }

  DersSil(dersId: string){
    return this.http.delete(this.apiUrl + "derssil/" + dersId);

  }

  //Ders Servisleri Bitiş
  
  
  //Ders Kayıt Servisleri Başlangıç

  OgrenciDersListe(ogrId: string){

    return this.http.get<Kayit[]>(this.apiUrl + "ogrencidersliste/" + ogrId);
  }

  DersOgrenciListe(dersId: string){

    return this.http.get<Kayit[]>(this.apiUrl + "dersogrenciliste/" + dersId);
  }

  KayitEkle(kayit:Kayit){
    return this.http.post(this.apiUrl + "kayitekle",kayit);
  }

 
  

  KayitSil(kayitId: string){
    return this.http.delete(this.apiUrl + "kayitsil/" + kayitId);
    
  }

  //Ders Kayıt Servisler  Bitiş



  //Dosya Servisleri Başlangıç

  DosyaListe(){

    return this.http.get<Dosya[]>(this.apiUrl + "dosyalistele");
  }

  DosyaById(dosyaId: string){
    return this.http.get(this.apiUrl + "dosyabyid/" + dosyaId);

  }

  DosyaEkle(dosya:Dosya){
    return this.http.post(this.apiUrl + "dosyaekle",dosya);
  }


  DosyaVideoEkle(dosyaId: Video){
    return this.http.post(this.apiUrl + "dosyafotoekle/",dosyaId);
  }

  //dosyaFoto

  
  

  DosyaSil(dosyaId: string){
    return this.http.delete(this.apiUrl + "dosyasil/" + dosyaId);

  }


  //Dosya Servisleri Bitiş



  //Dosya Kayıt Servisleri Başlangıç

  DosyaKayitListele(dkDersId : string){
    return this.http.get<DosyaKayit[]>(this.apiUrl + "dosyadersliste/" + dkDersId);

  }

  DosyaKayitEkle(kayit : DosyaKayit){

    return this.http.post(this.apiUrl + "dosyakayitekle",kayit);

  }

  DosyaKayitSil(dkId: string){
    return this.http.delete(this.apiUrl + "dosyakayitsil/" + dkId);
    
  }


  //Dosya Kayıt Servisleri Bitiş


  //Uye Kontrol Başlangıç


  //Uye Kontrol Bitiş

}
