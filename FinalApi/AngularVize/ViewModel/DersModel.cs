﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AngularVize.ViewModel
{
    public class DersModel
    {
        public string dersId { get; set; }
        public string dersKodu { get; set; }
        public string dersAdi { get; set; }
        public int dersKredi { get; set; }

        public OgretmenModel ogrtBilgi { get; set; }
    }
}