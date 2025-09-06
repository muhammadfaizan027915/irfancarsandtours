import { BrandNames } from "@icat/db";

import * as BrandIcons from "@cardog-icons/react";

export const BrandLibrary: Partial<
  Record<
    BrandNames,
    {
      name: string;
      icon: React.FC<React.SVGProps<SVGSVGElement>>;
    }
  >
> = {
  Acura: { name: "Acura", icon: BrandIcons.AcuraIcon },
  AlfaRomeo: { name: "Alfa Romeo", icon: BrandIcons.AlfaRomeoIcon },
  AstonMartin: { name: "Aston Martin", icon: BrandIcons.AstonMartinIcon },
  Audi: { name: "Audi", icon: BrandIcons.AudiIcon },
  BMW: { name: "BMW", icon: BrandIcons.BMWIcon },
  BYD: { name: "BYD", icon: BrandIcons.BYDIcon },
  Bentley: { name: "Bentley", icon: BrandIcons.BentleyIcon },
  Cadillac: { name: "Cadillac", icon: BrandIcons.CadillacIcon },
  Chevrolet: { name: "Chevrolet", icon: BrandIcons.ChevroletIcon },
  Chrysler: { name: "Chrysler", icon: BrandIcons.ChryslerIcon },
  Dodge: { name: "Dodge", icon: BrandIcons.DodgeIcon },
  Ferrari: { name: "Ferrari", icon: BrandIcons.FerrariIcon },
  Fiat: { name: "Fiat", icon: BrandIcons.FiatIcon },
  Ford: { name: "Ford", icon: BrandIcons.FordIcon },
  GMC: { name: "GMC", icon: BrandIcons.GMCIcon },
  Genesis: { name: "Genesis", icon: BrandIcons.GenesisIcon },
  Honda: { name: "Honda", icon: BrandIcons.HondaIcon },
  Hummer: { name: "Hummer", icon: BrandIcons.HummerIcon },
  Hyundai: { name: "Hyundai", icon: BrandIcons.HyundaiIcon },
  Infiniti: { name: "Infiniti", icon: BrandIcons.InfinitiIcon },
  Jaguar: { name: "Jaguar", icon: BrandIcons.JaguarIcon },
  Jeep: { name: "Jeep", icon: BrandIcons.JeepIcon },
  Kia: { name: "Kia", icon: BrandIcons.KiaIcon },
  Lamborghini: { name: "Lamborghini", icon: BrandIcons.LamborghiniIcon },
  Landrover: { name: "Land Rover", icon: BrandIcons.LandroverIcon },
  Lexus: { name: "Lexus", icon: BrandIcons.LexusIcon },
  Lincoln: { name: "Lincoln", icon: BrandIcons.LincolnIcon },
  Lotus: { name: "Lotus", icon: BrandIcons.LotusIcon },
  Lucid: { name: "Lucid", icon: BrandIcons.LucidIcon },
  MB: { name: "Mercedes-Benz", icon: BrandIcons.MBIcon },
  Maserati: { name: "Maserati", icon: BrandIcons.MaseratiIcon },
  Mazda: { name: "Mazda", icon: BrandIcons.MazdaIcon },
  Mclaren: { name: "McLaren", icon: BrandIcons.MclarenIcon },
  Mini: { name: "Mini", icon: BrandIcons.MiniIcon },
  Mitsubishi: { name: "Mitsubishi", icon: BrandIcons.MitsubishiIcon },
  Nissan: { name: "Nissan", icon: BrandIcons.NissanIcon },
  Polestar: { name: "Polestar", icon: BrandIcons.PolestarIcon },
  Porsche: { name: "Porsche", icon: BrandIcons.PorscheIcon },
  RAM: { name: "RAM", icon: BrandIcons.RAMIcon },
  RollsRoyce: { name: "Rolls-Royce", icon: BrandIcons.RollsRoyceIcon },
  Subaru: { name: "Subaru", icon: BrandIcons.SubaruIcon },
  Tesla: { name: "Tesla", icon: BrandIcons.TeslaIcon },
  Toyota: { name: "Toyota", icon: BrandIcons.ToyotaIcon },
  Vinfast: { name: "VinFast", icon: BrandIcons.VinfastIcon },
  Volkswagen: { name: "Volkswagen", icon: BrandIcons.VolkswagenIcon },
  Volvo: { name: "Volvo", icon: BrandIcons.VolvoIcon },
};
