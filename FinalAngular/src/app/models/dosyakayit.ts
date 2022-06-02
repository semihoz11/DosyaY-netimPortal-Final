import { Ogrenci } from './ogrenci';
import { Ders } from './ders';
import { Dosya } from "./dosya";

export class DosyaKayit{
    dkId : string;
    dkDersId : string;
    dkDosyaId : string;
    dosyaBilgi : Dosya;
    dersBilgi : Ders;
    ogrBilgi: Ogrenci;
}