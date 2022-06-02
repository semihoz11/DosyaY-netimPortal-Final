import { Ogretmen } from './ogretmen';
import { Ders } from './ders';
import { Ogrenci } from './ogrenci';
export class Kayit{
    kayitId : string;
    kayitDersId : string;
    kayitOgrId : string;
    kayitOgrtId : string;
    dersBilgi : Ders;
    ogrBilgi : Ogrenci;
    ogrtBilgi : Ogretmen;
}