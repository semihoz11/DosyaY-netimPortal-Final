﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace AngularVize.Models
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class DB01Entities : DbContext
    {
        public DB01Entities()
            : base("name=DB01Entities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<TDersler> TDersler { get; set; }
        public virtual DbSet<TDosyaKayit> TDosyaKayit { get; set; }
        public virtual DbSet<TDosyalar> TDosyalar { get; set; }
        public virtual DbSet<TKayit> TKayit { get; set; }
        public virtual DbSet<TKullanici> TKullanici { get; set; }
        public virtual DbSet<TOgrenci> TOgrenci { get; set; }
        public virtual DbSet<TOgretmen> TOgretmen { get; set; }
    }
}
