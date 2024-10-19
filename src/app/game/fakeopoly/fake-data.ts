export interface BaseTileInfo {
  id: number;
  name: string;
}

export enum TileType {
  Regular = 'Regular',
  Special = 'Special',
}

export interface TileRegularInfo extends BaseTileInfo {
  type: TileType.Regular;
  regularData: {
    // color also indicates the group
    color: string;
    houseCost: number;
    hotelCost: number;
    mortgageCost: number;
    rents: {
      0: number;
      1: number;
      2: number;
      3: number;
      4: number;
      5: number;
    }
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
    rents: {
      1: number;
      2: number;
      3: number;
      4: number;
    }
  };
}

export interface TileCompanyInfo extends TileSpecialInfo {
  specialType: SpecialType.Company;
  companyData: {
    mortgageCost: number;
    rentsMultiplier: {
      1: number;
      2: number;
    }
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
  type: 'corner';
  cornerData: {
    imageUrl: string;
  };
}

export type TileInfo =
  TileRegularInfo
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
    type: 'corner',
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
      rents: {
        0: 2,
        1: 10,
        2: 30,
        3: 90,
        4: 160,
        5: 250,
      },
    },
  },
  {
    id: 2,
    name: 'Probabilita\'',
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
      rents: {
        0: 4,
        1: 20,
        2: 60,
        3: 180,
        4: 320,
        5: 450,
      },
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
      rents: {
        1: 25,
        2: 50,
        3: 100,
        4: 200,
      },
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
      rents: {
        0: 6,
        1: 30,
        2: 90,
        3: 270,
        4: 400,
        5: 550,
      },
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
      rents: {
        0: 6,
        1: 30,
        2: 90,
        3: 270,
        4: 400,
        5: 550,
      },
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
      rents: {
        0: 8,
        1: 40,
        2: 100,
        3: 300,
        4: 450,
        5: 600,
      },
    },
  },
  {
    id: 10,
    name: 'Transito/Prigione',
    type: 'corner',
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
      rents: {
        0: 10,
        1: 50,
        2: 150,
        3: 450,
        4: 625,
        5: 750,
      },
    },
  },
  {
    id: 12,
    name: 'Societa\' Elettrica',
    type: TileType.Special,
    specialType: SpecialType.Company,
    specialData: {
      imageUrl: 'http://localhost:4200/assets/test.png',
      width: 64,
      height: 64,
    },
    companyData: {
      mortgageCost: 75,
      rentsMultiplier: {
        1: 4,
        2: 10,
      },
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
      rents: {
        0: 10,
        1: 50,
        2: 150,
        3: 450,
        4: 625,
        5: 750,
      },
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
      rents: {
        0: 12,
        1: 60,
        2: 180,
        3: 500,
        4: 700,
        5: 900,
      },
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
      rents: {
        1: 25,
        2: 50,
        3: 100,
        4: 200,
      },
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
      rents: {
        0: 14,
        1: 70,
        2: 200,
        3: 550,
        4: 750,
        5: 950,
      },
    },
  },
  {
    id: 17,
    name: 'Probabilita\'',
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
      rents: {
        0: 14,
        1: 70,
        2: 200,
        3: 550,
        4: 750,
        5: 950,
      },
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
      rents: {
        0: 16,
        1: 80,
        2: 220,
        3: 600,
        4: 800,
        5: 1000,
      },
    },
  },
  {
    id: 20,
    name: 'Parcheggio Gratuito',
    type: 'corner',
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
      rents: {
        0: 18,
        1: 90,
        2: 250,
        3: 700,
        4: 875,
        5: 1050,
      },
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
      rents: {
        0: 18,
        1: 90,
        2: 250,
        3: 700,
        4: 875,
        5: 1050,
      },
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
      rents: {
        0: 20,
        1: 100,
        2: 300,
        3: 750,
        4: 925,
        5: 1100,
      },
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
      rents: {
        1: 25,
        2: 50,
        3: 100,
        4: 200,
      },
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
      rents: {
        0: 22,
        1: 110,
        2: 330,
        3: 800,
        4: 975,
        5: 1150,
      },
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
      rents: {
        0: 22,
        1: 110,
        2: 330,
        3: 800,
        4: 975,
        5: 1150,
      },
    },
  },
  {
    id: 28,
    name: 'Societa\' Acqua Potabile',
    type: TileType.Special,
    specialType: SpecialType.Company,
    specialData: {
      imageUrl: 'http://localhost:4200/assets/test.png',
      width: 64,
      height: 64,
    },
    companyData: {
      mortgageCost: 75,
      rentsMultiplier: {
        1: 4,
        2: 10,
      },
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
      rents: {
        0: 24,
        1: 120,
        2: 360,
        3: 850,
        4: 1025,
        5: 1200,
      },
    },
  },
  {
    id: 30,
    name: 'In Prigione',
    type: 'corner',
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
      rents: {
        0: 26,
        1: 130,
        2: 390,
        3: 900,
        4: 1100,
        5: 1275,
      },
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
      rents: {
        0: 26,
        1: 130,
        2: 390,
        3: 900,
        4: 1100,
        5: 1275,
      },
    },
  },
  {
    id: 33,
    name: 'Probabilita\'',
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
      rents: {
        0: 28,
        1: 150,
        2: 450,
        3: 1000,
        4: 1200,
        5: 1400,
      },
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
      rents: {
        1: 25,
        2: 50,
        3: 100,
        4: 200,
      },
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
      rents: {
        0: 35,
        1: 175,
        2: 500,
        3: 1100,
        4: 1300,
        5: 1500,
      },
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
      rents: {
        0: 50,
        1: 200,
        2: 600,
        3: 1400,
        4: 1700,
        5: 2000,
      },
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
