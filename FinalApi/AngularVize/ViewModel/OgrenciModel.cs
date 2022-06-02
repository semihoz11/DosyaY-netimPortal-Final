using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AngularVize.ViewModel
{
    public class OgrenciModel
    {
        public string ogrId { get; set; }
        public string ogrNo { get; set; }
        public string ogrAdsoyad { get; set; }
        public int ogrYas { get; set; }

        public string ogrKulAdi { get; set; }
        public string ogrKulYetki { get; set; }
        public string ogrKulSifre { get; set; }
    }
}