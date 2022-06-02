using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AngularVize.ViewModel
{
    public class KayitModel
    {
        public string kayitId { get; set; }
        public string kayitDersId { get; set; }
        public string  kayitOgrId { get; set; }
        public string kayitOgrtId { get; set; }

        public OgrenciModel ogrBilgi { get; set; }
        public OgretmenModel ogrtBilgi { get; set; }
        public DersModel dersBilgi { get; set; }
    }
}