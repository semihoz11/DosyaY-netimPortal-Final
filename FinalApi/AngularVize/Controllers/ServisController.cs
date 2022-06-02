using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using AngularVize.Models;
using AngularVize.ViewModel;
using System.IO;
using System.Drawing;

namespace AngularVize.Controllers
{
    public class ServisController : ApiController
    {
        DB01Entities db = new DB01Entities();
        SonucModel sonuc = new SonucModel();

        #region Dersler



        [HttpGet]
        [Route("api/dersliste")]
        public List<DersModel> DersListe()
        {
            List<DersModel> liste = db.TDersler.Select(x => new DersModel()
            {

                dersId = x.dersId,
                dersAdi = x.dersAdi,
                dersKodu = x.dersKodu,
                dersKredi = x.dersKredi
               


            }).ToList();

          
            

            return liste;
        }

        [HttpGet]
        [Route("api/dersbyid/{dersId}")]
        public DersModel DersById(string dersId)
        {
            DersModel kayit = db.TDersler.Where(s => s.dersId == dersId).Select(x => new DersModel()
            {

                dersId = x.dersId,
                dersAdi = x.dersAdi,
                dersKodu = x.dersKodu,
                dersKredi = x.dersKredi

            }).FirstOrDefault();
            return kayit;
        }

        [HttpPost]
        [Route("api/dersekle")]
        public SonucModel DersEkle(DersModel model)
        {
            if (db.TDersler.Count(s => s.dersKodu == model.dersKodu) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen Ders Kodu Sisteme Kayıtlıdır";
                return sonuc;
            }

            TDersler yeni = new TDersler();
            yeni.dersId = Guid.NewGuid().ToString();
            yeni.dersAdi = model.dersAdi;
            yeni.dersKodu = model.dersKodu;
            yeni.dersKredi = model.dersKredi;
            db.TDersler.Add(yeni);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Ders Eklendi";

            return sonuc;
        }

        [HttpPut]
        [Route("api/dersduzenle")]
        public SonucModel DersDuzenle(DersModel model)
        {
            TDersler kayit = db.TDersler.Where(s => s.dersId == model.dersId).SingleOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı";
                return sonuc;
            }
            
            kayit.dersAdi = model.dersAdi;
            kayit.dersKodu = model.dersKodu;
            kayit.dersKredi = model.dersKredi;
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Ders Düzenlendi";

            return sonuc;
        }

        [HttpDelete]
        [Route("api/derssil/{dersId}")]
        public SonucModel DersSil(string dersId)
        {
            TDersler kayit = db.TDersler.Where(s => s.dersId == dersId).FirstOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı";
                return sonuc;
            }

            if (db.TKayit.Count(s => s.kayitDersId == dersId) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Derse Kayıtlı Öğremci Bulunduğu İçin Ders Silinemez";
                return sonuc;
            }

            db.TDersler.Remove(kayit);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Ders Silindi";

            return sonuc;

        }

        #endregion

        #region Ogrenci

        [HttpGet]
        [Route("api/ogrenciliste")]

        public List<OgrenciModel> OgrenciListe()
        {
            List<OgrenciModel> liste = db.TOgrenci.Select(x => new OgrenciModel()
            {

                ogrId = x.ogrId,
                ogrAdsoyad = x.ogrAdsoyad,
                ogrNo = x.ogrNo,
                ogrYas = x.ogrYas,
                ogrKulAdi = x.ogrKulAdi,
                ogrKulSifre = x.ogrKulSifre,
                ogrKulYetki = x.ogrKulYetki


            }).ToList();
            return liste;
        }

        [HttpGet]
        [Route("api/ogrencibyid/{ogrId}")]

        public OgrenciModel OgrenciById(string ogrId)
        {
            OgrenciModel kayit = db.TOgrenci.Where(s => s.ogrId == ogrId).Select(x => new OgrenciModel()
            {

                ogrId = x.ogrId,
                ogrAdsoyad = x.ogrAdsoyad,
                ogrNo = x.ogrNo,
                ogrYas = x.ogrYas,
                ogrKulAdi = x.ogrKulAdi,
                ogrKulSifre = x.ogrKulSifre,
                ogrKulYetki = x.ogrKulYetki


            }).SingleOrDefault();
            return kayit;

        }

        [HttpPost]
        [Route("api/ogrenciekle")]

        public SonucModel OgrenciEkle(OgrenciModel model)
        {
            if (db.TOgrenci.Count(s => s.ogrNo == model.ogrNo) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen Öğrenci No Kayıtlıdır";
            }

            TOgrenci yeni = new TOgrenci();
            yeni.ogrId = Guid.NewGuid().ToString();
            yeni.ogrNo = model.ogrNo;
            yeni.ogrAdsoyad = model.ogrAdsoyad;
            yeni.ogrYas = model.ogrYas;
            yeni.ogrKulAdi = model.ogrKulAdi;
            yeni.ogrKulSifre = model.ogrKulSifre;
            yeni.ogrKulYetki = model.ogrKulYetki;
            db.TOgrenci.Add(yeni);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Öğrenci Eklendi";

            return sonuc;


        }

        [HttpPut]
        [Route("api/ogrenciduzenle")]

        public SonucModel OgrenciDuzenle(OgrenciModel model)
        {
            TOgrenci kayit = db.TOgrenci.Where(s => s.ogrId == model.ogrId).SingleOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Öğrenci Bulunamadı";
                return sonuc;
            }

            kayit.ogrNo = model.ogrNo;
            kayit.ogrAdsoyad = model.ogrAdsoyad;
            kayit.ogrYas = model.ogrYas;
            kayit.ogrKulAdi = model.ogrKulAdi;
            kayit.ogrKulSifre = model.ogrKulSifre;
            kayit.ogrKulYetki = model.ogrKulYetki;
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Öğrenci Düzenlendi";

            return sonuc;

        }


        [HttpDelete]
        [Route("api/ogrencisil/{ogrId}")]

        public SonucModel OgrenciSil(string ogrId)
        {
            TOgrenci kayit = db.TOgrenci.Where(s => s.ogrId == ogrId).SingleOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Öğrenci Bulunamadı";
                return sonuc;
            }

            if (db.TKayit.Count(s => s.kayitOgrId == ogrId) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Öğrencinin Üzerine Ders Kayıtlı Olduğu için Öğrenci Silinemez ";
                return sonuc;
            }

            db.TOgrenci.Remove(kayit);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Öğrenci Silindi";

            return sonuc;
        }



        #endregion

        #region Ogretmen

        [HttpGet]
        [Route("api/ogretmenlistele")]
        public List<OgretmenModel> OgretmenListe()
        {

            List<OgretmenModel> liste = db.TOgretmen.Select(x => new OgretmenModel()
            {

                ogrtId = x.ogrtId,
                ogrtAdsoyad = x.ogrtAdsoyad



            }).ToList();
            return liste;
        }

        [HttpGet]
        [Route("api/ogretmenbyid/{ogrtId}")]

        public OgretmenModel OgretmenById(string ogrtId)
        {
            OgretmenModel kayit = db.TOgretmen.Where(s => s.ogrtId == ogrtId).Select(x => new OgretmenModel()
            {

                ogrtId = x.ogrtId,
                ogrtAdsoyad = x.ogrtAdsoyad


            }).SingleOrDefault();
            return kayit;

        }

        [HttpPost]
        [Route("api/ogretmenekle")]

        public SonucModel OgretmenEkle(OgretmenModel model)
        {

            TOgretmen yeni = new TOgretmen();
            yeni.ogrtId = Guid.NewGuid().ToString();
            yeni.ogrtAdsoyad = model.ogrtAdsoyad;
            db.TOgretmen.Add(yeni);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Öğretmen Eklendi";

            return sonuc;


        }


        [HttpPut]
        [Route("api/ogretmenduzenle")]

        public SonucModel OgretmenDuzenle(OgretmenModel model)
        {
            TOgretmen kayit = db.TOgretmen.Where(s => s.ogrtId == model.ogrtId).SingleOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Ogretmen Bulunamadı";
                return sonuc;
            }

            kayit.ogrtAdsoyad = model.ogrtAdsoyad;
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Ogretmen Düzenlendi";

            return sonuc;

        }


        [HttpDelete]
        [Route("api/ogretmensil/{ogrId}")]

        public SonucModel OgretmenSil(string ogrtId)
        {
            TOgretmen kayit = db.TOgretmen.Where(s => s.ogrtId == ogrtId).SingleOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Ogretmen Bulunamadı";
                return sonuc;
            }

            if (db.TKayit.Count(s => s.kayitOgrtId == ogrtId) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Ogretmenin Üzerine Ders Kayıtlı Olduğu için Öğrenci Silinemez ";
                return sonuc;
            }

            db.TOgretmen.Remove(kayit);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Ogretmen Silindi";

            return sonuc;
        }


        #endregion

        #region Kayıt

        [HttpGet]
        [Route("api/ogrencidersliste/{ogrId}")]

        public List<KayitModel> OgrenciDersListe(string ogrId)
        {
            List<KayitModel> liste = db.TKayit.Where(s => s.kayitOgrId == ogrId).Select(x => new KayitModel()
            {
                kayitId = x.kayitId,
                kayitDersId = x.kayitDersId,
                kayitOgrId = x.kayitOgrId,
                kayitOgrtId = x.kayitOgrtId

            }).ToList();

            foreach (var kayit in liste)
            {
                kayit.ogrBilgi = OgrenciById(kayit.kayitOgrId);
                kayit.dersBilgi = DersById(kayit.kayitDersId);
                kayit.ogrtBilgi = OgretmenById(kayit.kayitOgrtId);
            }

            return liste;
        }


        [HttpGet]
        [Route("api/dersogrenciliste/{dersId}")]

        public List<KayitModel> DersOgrenciListe(string dersId)
        {
            List<KayitModel> liste = db.TKayit.Where(s => s.kayitDersId == dersId).Select(x => new KayitModel()
            {
                kayitId = x.kayitId,
                kayitDersId = x.kayitDersId,
                kayitOgrId = x.kayitOgrId,
                kayitOgrtId = x.kayitOgrtId

            }).ToList();

            foreach (var kayit in liste)
            {
                kayit.ogrBilgi = OgrenciById(kayit.kayitOgrId);
                kayit.dersBilgi = DersById(kayit.kayitDersId);
                kayit.ogrtBilgi = OgretmenById(kayit.kayitOgrtId);
            }

            return liste;
        }

        [HttpPost]
        [Route("api/kayitekle")]

        public SonucModel KayitEkle(KayitModel model)
        {
            if (db.TKayit.Count(s => s.kayitDersId == model.kayitDersId && s.kayitOgrId == model.kayitOgrId) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "İlgili Öğrenci Derse Önceden Kayıtlıdır!";
                return sonuc;
            }

            TKayit yeni = new TKayit();
            yeni.kayitId = Guid.NewGuid().ToString();
            yeni.kayitOgrId = model.kayitOgrId;
            yeni.kayitDersId = model.kayitDersId;
            yeni.kayitOgrtId = model.kayitOgrtId;
            db.TKayit.Add(yeni);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Ders Kaydı Eklendi";
            return sonuc;



        }


        [HttpDelete]
        [Route("api/kayitsil/{kayitId}")]
        public SonucModel KayitSil(string kayitId)
        {
            TKayit kayit = db.TKayit.Where(s => s.kayitId == kayitId).SingleOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı!";
                return sonuc;
            }
            db.TKayit.Remove(kayit);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Ders Kaydı Silindi";
            return sonuc;
        }

        #endregion

        #region Dosya

        [HttpGet]
        [Route("api/dosyalistele")]
        public List<DosyaModel> DosyaListe()
        {

            List<DosyaModel> liste = db.TDosyalar.Select(x => new DosyaModel()
            {

                dosyaId = x.dosyaId,
                dosyaAdi = x.dosyaAdi,
                dosyaFoto = x.dosyaFoto
              



            }).ToList();
            return liste;
        }

        [HttpGet]
        [Route("api/dosyabyid/{dosyaId}")]

        public DosyaModel DosyaById(string dosyaId)
        {
            DosyaModel kayit = db.TDosyalar.Where(s => s.dosyaId == dosyaId).Select(x => new DosyaModel()
            {

                dosyaId = x.dosyaId,
                dosyaAdi = x.dosyaAdi,
                dosyaFoto = x.dosyaFoto


            }).SingleOrDefault();
            return kayit;

        }

        [HttpPost]
        [Route("api/dosyaekle")]

        public SonucModel DosyaEkle(DosyaModel model)
        {

            TDosyalar yeni = new TDosyalar();
            yeni.dosyaId = Guid.NewGuid().ToString();
            yeni.dosyaAdi = model.dosyaAdi;
           // yeni.dosyaFoto = model.dosyaFoto;
            db.TDosyalar.Add(yeni);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Dosya Eklendi";

            return sonuc;


        }

        [HttpPut]
        [Route("api/dosyaduzenle")]

        public SonucModel DosyaDuzenle(DosyaModel model)
        {
            TDosyalar kayit = db.TDosyalar.Where(s => s.dosyaId == model.dosyaId).SingleOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Dosya Bulunamadı";
                return sonuc;
            }

            kayit.dosyaAdi = model.dosyaAdi;
           // kayit.dosyaFoto = model.dosyaFoto;
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Dosya Düzenlendi";

            return sonuc;

        }


        [HttpDelete]
        [Route("api/dosyasil/{dosyaId}")]

        public SonucModel DosyaSil(string dosyaId)
        {
            TDosyalar kayit = db.TDosyalar.Where(s => s.dosyaId == dosyaId).SingleOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Dosya Bulunamadı";
                return sonuc;
            }

            //if (db.tdosyakayit.count(s => s.dkdosyaıd == dosyaıd) > 0)
            //{
            //    sonuc.islem = false;
            //    sonuc.mesaj = "dosyanın üzerine ders kayıtlı olduğu için dosya silinemez ";
            //    return sonuc;
            //}

            db.TDosyalar.Remove(kayit);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Dosya Silindi";

            return sonuc;
        }
         
        #region DosyaFotoEkleme
        [HttpPost]
        [Route("api/dosyafotoekle")]
        public SonucModel OgrFotoGuncelle(DosyaFotoModel model)
        {
            TDosyalar drs = db.TDosyalar.Where(s => s.dosyaId == model.dosyaId).SingleOrDefault();
            if (drs == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunmadı!";
                return sonuc;
            }
            if (drs.dosyaFoto != "test.jpg")
            {
                string yol = System.Web.Hosting.HostingEnvironment.MapPath("~/Dosyalar/" + drs.dosyaFoto);
                if (File.Exists(yol))
                {
                    File.Delete(yol);
                }
            }


           
            string data = model.fotoData;
            string base64 = data.Substring(data.IndexOf(',') + 1);
            base64 = base64.Trim('\0');
            byte[] imgbytes = Convert.FromBase64String(base64);
            string dosyaAdi = drs.dosyaId + model.fotoUzanti.Replace("image/", ".");
            using (var ms = new MemoryStream(imgbytes, 0, imgbytes.Length))
            {
                Image img = Image.FromStream(ms, true);
                img.Save(System.Web.Hosting.HostingEnvironment.MapPath("~/Dosyalar/" + dosyaAdi));
            }
            drs.dosyaFoto = dosyaAdi;
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Fotoğraf Eklendi";
            return sonuc;
        }
        #endregion



        #endregion

        #region DosyaKayıt


        [HttpGet]
        [Route("api/dosyadersliste/{dersId}")]

        public List<DosyaKayitModel> DosyaDersListe(string dersId)
        {
            List<DosyaKayitModel> liste = db.TDosyaKayit.Where(s => s.dkDersId == dersId).Select(x => new DosyaKayitModel()
            {
                dkId = x.dkId,
                dkDersId = x.dkDersId,
                dkDosyaId = x.dkDosyaId

            }).ToList();

            foreach (var kayit in liste)
            {
                
                kayit.dersBilgi = DersById(kayit.dkDersId);
                kayit.dosyaBilgi = DosyaById(kayit.dkDosyaId);
                
            }

            return liste;
        }

        [HttpPost]
        [Route("api/dosyakayitekle")]

        public SonucModel DosyaKayitEkle(DosyaKayitModel model)
        {
            if (db.TDosyaKayit.Count(s => s.dkId == model.dkId && s.dkDersId == model.dkDersId && s.dkDosyaId == model.dkDosyaId) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "İlgili Dosya Derse Önceden Kayıtlıdır!";
                return sonuc;
            }

            TDosyaKayit yeni = new TDosyaKayit();
            yeni.dkId = Guid.NewGuid().ToString();
            yeni.dkDersId = model.dkDersId;
            yeni.dkDosyaId = model.dkDosyaId;
            db.TDosyaKayit.Add(yeni);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Derse Dosya Eklendi";
            return sonuc;

        }

        [HttpDelete]
        [Route("api/dosyakayitsil/{kayitId}")]
        public SonucModel DosyaKayitSil(string dkId)
        {
            TDosyaKayit kayit = db.TDosyaKayit.Where(s => s.dkId == dkId).SingleOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı!";
                return sonuc;
            }
            db.TDosyaKayit.Remove(kayit);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Dosya Dersten Silindi";
            return sonuc;
        }

        #endregion

        #region Uye





        #endregion

    }


}
