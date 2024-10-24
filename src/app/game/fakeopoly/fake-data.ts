export interface BaseTileInfo {
  id: number;
  name: string;
}

export enum TileType {
  Regular = 'Regular',
  Special = 'Special',
  Corner = 'Corner',
}

export interface TileRegularInfo extends BaseTileInfo {
  type: TileType.Regular;
  regularData: {
    // color also indicates the group
    color: string;
    houseCost: number;
    hotelCost: number;
    mortgageCost: number;
    rents: number[];
  };
}

export enum SpecialType {
  Station = 'Station',
  Company = 'Company',
  Probability = 'Probability',
  Chance = 'Chance',
  Tax = 'Tax',
}

export interface TileSpecialInfo extends BaseTileInfo {
  type: TileType.Special;
  specialData: {
    imageUrl: string;
    width: number;
    height: number;
  };
}

export interface TileStationInfo extends TileSpecialInfo {
  specialType: SpecialType.Station;
  stationData: {
    mortgageCost: number;
    rents: number[];
  };
}

export interface TileCompanyInfo extends TileSpecialInfo {
  specialType: SpecialType.Company;
  companyData: {
    mortgageCost: number;
    rentsMultiplier: number[];
  };
}

export interface TileProbabilityInfo extends TileSpecialInfo {
  specialType: SpecialType.Probability;
}

export interface TileChanceInfo extends TileSpecialInfo {
  specialType: SpecialType.Chance;
}

export interface TileTaxInfo extends TileSpecialInfo {
  specialType: SpecialType.Tax;
  taxData: {
    tax: number;
  };
}

export interface TileCornerInfo extends BaseTileInfo {
  type: TileType.Corner;
  cornerData: {
    imageUrl: string;
  };
}

export type TileInfo =
  | TileRegularInfo
  | TileStationInfo
  | TileCompanyInfo
  | TileProbabilityInfo
  | TileChanceInfo
  | TileTaxInfo
  | TileCornerInfo;

export const fakeTiles: TileInfo[] = [
  {
    id: 0,
    name: 'Start',
    type: TileType.Corner,
    cornerData: {
      imageUrl: 'http://localhost:4200/assets/corner.png',
    },
  },
  {
    id: 1,
    name: 'Corso Vercelli',
    type: TileType.Regular,
    regularData: {
      color: '#603d2e',
      houseCost: 50,
      hotelCost: 50,
      mortgageCost: 30,
      rents: [2, 10, 30, 90, 160, 250],
    },
  },
  {
    id: 2,
    name: "Probabilita'",
    type: TileType.Special,
    specialType: SpecialType.Probability,
    specialData: {
      imageUrl: 'http://localhost:4200/assets/test.png',
      width: 64,
      height: 64,
    },
  },
  {
    id: 3,
    name: 'Corso Venezia',
    type: TileType.Regular,
    regularData: {
      color: '#603d2e',
      houseCost: 50,
      hotelCost: 50,
      mortgageCost: 30,
      rents: [4, 20, 60, 180, 320, 450],
    },
  },
  {
    id: 4,
    name: 'Tassa Patrimoniale',
    type: TileType.Special,
    specialType: SpecialType.Tax,
    specialData: {
      imageUrl: 'http://localhost:4200/assets/test.png',
      width: 64,
      height: 64,
    },
    taxData: {
      tax: 200,
    },
  },
  {
    id: 5,
    name: 'Stazione Lingotto',
    type: TileType.Special,
    specialType: SpecialType.Station,
    specialData: {
      imageUrl: 'http://localhost:4200/assets/test.png',
      width: 64,
      height: 64,
    },
    stationData: {
      mortgageCost: 100,
      rents: [25, 50, 100, 200],
    },
  },
  {
    id: 6,
    name: 'Corso Luigi Settembrini',
    type: TileType.Regular,
    regularData: {
      color: '#d6e6f4',
      houseCost: 50,
      hotelCost: 50,
      mortgageCost: 50,
      rents: [6, 30, 90, 270, 400, 550],
    },
  },
  {
    id: 7,
    name: 'Imprevisti',
    type: TileType.Special,
    specialType: SpecialType.Chance,
    specialData: {
      imageUrl: 'http://localhost:4200/assets/test.png',
      width: 64,
      height: 64,
    },
  },
  {
    id: 8,
    name: 'Corso Orbassano',
    type: TileType.Regular,
    regularData: {
      color: '#d6e6f4',
      houseCost: 50,
      hotelCost: 50,
      mortgageCost: 50,
      rents: [6, 30, 90, 270, 400, 550],
    },
  },
  {
    id: 9,
    name: 'Corso Cosenza',
    type: TileType.Regular,
    regularData: {
      color: '#d6e6f4',
      houseCost: 50,
      hotelCost: 50,
      mortgageCost: 60,
      rents: [8, 40, 100, 300, 450, 600],
    },
  },
  {
    id: 10,
    name: 'Transito/Prigione',
    type: TileType.Corner,
    cornerData: {
      imageUrl: 'http://localhost:4200/assets/corner.png',
    },
  },
  {
    id: 11,
    name: 'Via Zino Zini',
    type: TileType.Regular,
    regularData: {
      color: '#db2f88',
      houseCost: 100,
      hotelCost: 100,
      mortgageCost: 70,
      rents: [10, 50, 150, 450, 625, 750],
    },
  },
  {
    id: 12,
    name: "Societa' Elettrica",
    type: TileType.Special,
    specialType: SpecialType.Company,
    specialData: {
      imageUrl: 'http://localhost:4200/assets/test.png',
      width: 64,
      height: 64,
    },
    companyData: {
      mortgageCost: 75,
      rentsMultiplier: [4, 10],
    },
  },
  {
    id: 13,
    name: 'Via Nizza',
    type: TileType.Regular,
    regularData: {
      color: '#db2f88',
      houseCost: 100,
      hotelCost: 100,
      mortgageCost: 70,
      rents: [10, 50, 150, 450, 625, 750],
    },
  },
  {
    id: 14,
    name: 'Corso Moncalieri',
    type: TileType.Regular,
    regularData: {
      color: '#db2f88',
      houseCost: 100,
      hotelCost: 100,
      mortgageCost: 80,
      rents: [12, 60, 180, 500, 700, 900],
    },
  },
  {
    id: 15,
    name: 'Stazione Sito',
    type: TileType.Special,
    specialType: SpecialType.Station,
    specialData: {
      imageUrl: 'http://localhost:4200/assets/test.png',
      width: 64,
      height: 64,
    },
    stationData: {
      mortgageCost: 100,
      rents: [25, 50, 100, 200],
    },
  },
  {
    id: 16,
    name: 'Corso Grosseto',
    type: TileType.Regular,
    regularData: {
      color: '#f09100',
      houseCost: 100,
      hotelCost: 100,
      mortgageCost: 90,
      rents: [14, 70, 200, 550, 750, 950],
    },
  },
  {
    id: 17,
    name: "Probabilita'",
    type: TileType.Special,
    specialType: SpecialType.Probability,
    specialData: {
      imageUrl: 'http://localhost:4200/assets/test.png',
      width: 64,
      height: 64,
    },
  },
  {
    id: 18,
    name: 'Corso Potenza',
    type: TileType.Regular,
    regularData: {
      color: '#f09100',
      houseCost: 100,
      hotelCost: 100,
      mortgageCost: 90,
      rents: [14, 70, 200, 550, 750, 950],
    },
  },
  {
    id: 19,
    name: 'Piazza Giuseppe Manno',
    type: TileType.Regular,
    regularData: {
      color: '#f09100',
      houseCost: 100,
      hotelCost: 100,
      mortgageCost: 100,
      rents: [16, 80, 220, 600, 800, 1000],
    },
  },
  {
    id: 20,
    name: 'Parcheggio Gratuito',
    type: TileType.Corner,
    cornerData: {
      imageUrl: 'http://localhost:4200/assets/corner.png',
    },
  },
  {
    id: 21,
    name: 'Via Cernaia',
    type: TileType.Regular,
    regularData: {
      color: '#e8001e',
      houseCost: 150,
      hotelCost: 150,
      mortgageCost: 110,
      rents: [18, 90, 250, 700, 875, 1050],
    },
  },
  {
    id: 22,
    name: 'Imprevisti',
    type: TileType.Special,
    specialType: SpecialType.Chance,
    specialData: {
      imageUrl: 'http://localhost:4200/assets/test.png',
      width: 64,
      height: 64,
    },
  },
  {
    id: 23,
    name: 'Corso Galileo Ferraris',
    type: TileType.Regular,
    regularData: {
      color: '#e8001e',
      houseCost: 150,
      hotelCost: 150,
      mortgageCost: 110,
      rents: [18, 90, 250, 700, 875, 1050],
    },
  },
  {
    id: 24,
    name: 'Corso Vittorio Emanuele II',
    type: TileType.Regular,
    regularData: {
      color: '#e8001e',
      houseCost: 150,
      hotelCost: 150,
      mortgageCost: 120,
      rents: [20, 100, 300, 750, 925, 1100],
    },
  },
  {
    id: 25,
    name: 'Stazione Porta Nuova',
    type: TileType.Special,
    specialType: SpecialType.Station,
    specialData: {
      imageUrl: 'http://localhost:4200/assets/test.png',
      width: 64,
      height: 64,
    },
    stationData: {
      mortgageCost: 100,
      rents: [25, 50, 100, 200],
    },
  },
  {
    id: 26,
    name: 'Corso Stati Uniti',
    type: TileType.Regular,
    regularData: {
      color: '#fde002',
      houseCost: 150,
      hotelCost: 150,
      mortgageCost: 130,
      rents: [22, 110, 330, 800, 975, 1150],
    },
  },
  {
    id: 27,
    name: 'Corso Traiano',
    type: TileType.Regular,
    regularData: {
      color: '#fde002',
      houseCost: 150,
      hotelCost: 150,
      mortgageCost: 130,
      rents: [22, 110, 330, 800, 975, 1150],
    },
  },
  {
    id: 28,
    name: "Societa' Acqua Potabile",
    type: TileType.Special,
    specialType: SpecialType.Company,
    specialData: {
      imageUrl: 'http://localhost:4200/assets/test.png',
      width: 64,
      height: 64,
    },
    companyData: {
      mortgageCost: 75,
      rentsMultiplier: [4, 10],
    },
  },
  {
    id: 29,
    name: 'Piazza Castello',
    type: TileType.Regular,
    regularData: {
      color: '#fde002',
      houseCost: 150,
      hotelCost: 150,
      mortgageCost: 140,
      rents: [24, 120, 360, 850, 1025, 1200],
    },
  },
  {
    id: 30,
    name: 'In Prigione',
    type: TileType.Corner,
    cornerData: {
      imageUrl: 'http://localhost:4200/assets/corner.png',
    },
  },
  {
    id: 31,
    name: 'Via Roma',
    type: TileType.Regular,
    regularData: {
      color: '#00b94a',
      houseCost: 200,
      hotelCost: 200,
      mortgageCost: 150,
      rents: [26, 130, 390, 900, 1100, 1275],
    },
  },
  {
    id: 32,
    name: 'Corso Siracusa',
    type: TileType.Regular,
    regularData: {
      color: '#00b94a',
      houseCost: 200,
      hotelCost: 200,
      mortgageCost: 150,
      rents: [26, 130, 390, 900, 1100, 1275],
    },
  },
  {
    id: 33,
    name: "Probabilita'",
    type: TileType.Special,
    specialType: SpecialType.Probability,
    specialData: {
      imageUrl: 'http://localhost:4200/assets/test.png',
      width: 64,
      height: 64,
    },
  },
  {
    id: 34,
    name: 'Via Guido Reni',
    type: TileType.Regular,
    regularData: {
      color: '#00b94a',
      houseCost: 200,
      hotelCost: 200,
      mortgageCost: 160,
      rents: [28, 150, 450, 1000, 1200, 1400],
    },
  },
  {
    id: 35,
    name: 'Stazione Porta Susa',
    type: TileType.Special,
    specialType: SpecialType.Station,
    specialData: {
      imageUrl: 'http://localhost:4200/assets/test.png',
      width: 64,
      height: 64,
    },
    stationData: {
      mortgageCost: 100,
      rents: [25, 50, 100, 200],
    },
  },
  {
    id: 36,
    name: 'Imprevisti',
    type: TileType.Special,
    specialType: SpecialType.Chance,
    specialData: {
      imageUrl: 'http://localhost:4200/assets/test.png',
      width: 64,
      height: 64,
    },
  },
  {
    id: 37,
    name: 'Corso Principe Oddone',
    type: TileType.Regular,
    regularData: {
      color: '#006cc6',
      houseCost: 200,
      hotelCost: 200,
      mortgageCost: 175,
      rents: [35, 175, 500, 1100, 1300, 1500],
    },
  },
  {
    id: 38,
    name: 'Tassa Di Lusso',
    type: TileType.Special,
    specialType: SpecialType.Tax,
    specialData: {
      imageUrl: 'http://localhost:4200/assets/test.png',
      width: 64,
      height: 64,
    },
    taxData: {
      tax: 350,
    },
  },
  {
    id: 39,
    name: 'Parco San Vito',
    type: TileType.Regular,
    regularData: {
      color: '#006cc6',
      houseCost: 200,
      hotelCost: 200,
      mortgageCost: 200,
      rents: [50, 200, 600, 1400, 1700, 2000],
    },
  },
];

export interface PlayerPinInfo {
  name: string;
  imageUrl: string;
}

export const fakePlayerPins: PlayerPinInfo[] = [
  {
    name: 'demo',
    imageUrl: 'http://localhost:4200/assets/player.png',
  },
];
