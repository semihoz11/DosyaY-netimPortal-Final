using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AngularVize.ViewModel
{
    public class DosyaKayitModel
    {
        public string dkId { get; set; }
        public string dkDersId { get; set; }
        public string dkDosyaId { get; set; }

        public DosyaModel dosyaBilgi { get; set; }

        public DersModel dersBilgi { get; set; }
        public OgrenciModel ogrBilgi { get; set; }


    }
}