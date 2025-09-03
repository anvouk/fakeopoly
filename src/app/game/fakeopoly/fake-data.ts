export interface TileGroup {
  name: string;
  color?: string;
}

export interface BaseTileInfo {
  id: number;
  name: string;
  leftClickable: boolean;
}

export interface OwnableTileInfo {
  buyCost: number;
  group?: TileGroup;
}

export enum TileType {
  Regular = 'Regular',
  Special = 'Special',
  Corner = 'Corner',
}

export interface TileRegularInfo extends BaseTileInfo, OwnableTileInfo {
  type: TileType.Regular;
  regularData: {
    houseCost: number;
    houseImageUrl: string;
    hotelCost: number;
    hotelImageUrl: string;
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

export interface TileStationInfo extends TileSpecialInfo, OwnableTileInfo {
  specialType: SpecialType.Station;
  stationData: {
    mortgageCost: number;
    rents: number[];
  };
}

export interface TileCompanyInfo extends TileSpecialInfo, OwnableTileInfo {
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

export const fakeTileGroups: TileGroup[] = [
  {
    name: 'First group',
    color: '#603d2e',
  },
  {
    name: 'Second group',
    color: '#d6e6f4',
  },
  {
    name: 'Third group',
    color: '#db2f88',
  },
  {
    name: 'Fourth group',
    color: '#f09100',
  },
  {
    name: 'Fifth group',
    color: '#e8001e',
  },
  {
    name: 'Sixth group',
    color: '#fde002',
  },
  {
    name: 'Seventh group',
    color: '#00b94a',
  },
  {
    name: 'Eighth group',
    color: '#006cc6',
  },
  {
    name: 'Stations group',
  },
  {
    name: 'Societies group',
  },
];

export const fakeTiles: TileInfo[] = [
  {
    id: 0,
    name: 'Start',
    leftClickable: false,
    type: TileType.Corner,
    cornerData: {
      imageUrl: 'http://localhost:4200/assets/corner-start.png',
    },
  },
  {
    id: 1,
    name: 'Corso Vercelli',
    leftClickable: true,
    buyCost: 10,
    group: fakeTileGroups.find((x) => x.name === 'First group'),
    type: TileType.Regular,
    regularData: {
      houseCost: 50,
      houseImageUrl: 'http://localhost:4200/assets/house.png',
      hotelCost: 50,
      hotelImageUrl: 'http://localhost:4200/assets/house.png',
      mortgageCost: 30,
      rents: [2, 10, 30, 90, 160, 250],
    },
  },
  {
    id: 2,
    name: "Probabilita'",
    leftClickable: false,
    type: TileType.Special,
    specialType: SpecialType.Probability,
    specialData: {
      imageUrl: 'http://localhost:4200/assets/chest.png',
      width: 64,
      height: 64,
    },
  },
  {
    id: 3,
    name: 'Corso Venezia',
    leftClickable: true,
    buyCost: 10,
    group: fakeTileGroups.find((x) => x.name === 'First group'),
    type: TileType.Regular,
    regularData: {
      houseCost: 50,
      houseImageUrl: 'http://localhost:4200/assets/house.png',
      hotelCost: 50,
      hotelImageUrl: 'http://localhost:4200/assets/house.png',
      mortgageCost: 30,
      rents: [4, 20, 60, 180, 320, 450],
    },
  },
  {
    id: 4,
    name: 'Tassa Patrimoniale',
    leftClickable: false,
    type: TileType.Special,
    specialType: SpecialType.Tax,
    specialData: {
      imageUrl: 'http://localhost:4200/assets/super-tax.png',
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
    leftClickable: true,
    buyCost: 10,
    group: fakeTileGroups.find((x) => x.name === 'Stations group'),
    type: TileType.Special,
    specialType: SpecialType.Station,
    specialData: {
      imageUrl: 'http://localhost:4200/assets/train-station.png',
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
    leftClickable: true,
    buyCost: 10,
    group: fakeTileGroups.find((x) => x.name === 'Second group'),
    type: TileType.Regular,
    regularData: {
      houseCost: 50,
      houseImageUrl: 'http://localhost:4200/assets/house.png',
      hotelCost: 50,
      hotelImageUrl: 'http://localhost:4200/assets/house.png',
      mortgageCost: 50,
      rents: [6, 30, 90, 270, 400, 550],
    },
  },
  {
    id: 7,
    name: 'Imprevisti',
    leftClickable: false,
    type: TileType.Special,
    specialType: SpecialType.Chance,
    specialData: {
      imageUrl: 'http://localhost:4200/assets/chance.png',
      width: 64,
      height: 64,
    },
  },
  {
    id: 8,
    name: 'Corso Orbassano',
    leftClickable: true,
    buyCost: 10,
    group: fakeTileGroups.find((x) => x.name === 'Second group'),
    type: TileType.Regular,
    regularData: {
      houseCost: 50,
      houseImageUrl: 'http://localhost:4200/assets/house.png',
      hotelCost: 50,
      hotelImageUrl: 'http://localhost:4200/assets/house.png',
      mortgageCost: 50,
      rents: [6, 30, 90, 270, 400, 550],
    },
  },
  {
    id: 9,
    name: 'Corso Cosenza',
    leftClickable: true,
    buyCost: 10,
    group: fakeTileGroups.find((x) => x.name === 'Second group'),
    type: TileType.Regular,
    regularData: {
      houseCost: 50,
      houseImageUrl: 'http://localhost:4200/assets/house.png',
      hotelCost: 50,
      hotelImageUrl: 'http://localhost:4200/assets/house.png',
      mortgageCost: 60,
      rents: [8, 40, 100, 300, 450, 600],
    },
  },
  {
    id: 10,
    name: 'Transito/Prigione',
    leftClickable: false,
    type: TileType.Corner,
    cornerData: {
      imageUrl: 'http://localhost:4200/assets/corner-prison.png',
    },
  },
  {
    id: 11,
    name: 'Via Zino Zini',
    leftClickable: true,
    buyCost: 10,
    group: fakeTileGroups.find((x) => x.name === 'Third group'),
    type: TileType.Regular,
    regularData: {
      houseCost: 100,
      houseImageUrl: 'http://localhost:4200/assets/house.png',
      hotelCost: 100,
      hotelImageUrl: 'http://localhost:4200/assets/house.png',
      mortgageCost: 70,
      rents: [10, 50, 150, 450, 625, 750],
    },
  },
  {
    id: 12,
    name: "Societa' Elettrica",
    leftClickable: true,
    buyCost: 10,
    group: fakeTileGroups.find((x) => x.name === 'Societies group'),
    type: TileType.Special,
    specialType: SpecialType.Company,
    specialData: {
      imageUrl: 'http://localhost:4200/assets/society-electricity.png',
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
    leftClickable: true,
    buyCost: 10,
    group: fakeTileGroups.find((x) => x.name === 'Third group'),
    type: TileType.Regular,
    regularData: {
      houseCost: 100,
      houseImageUrl: 'http://localhost:4200/assets/house.png',
      hotelCost: 100,
      hotelImageUrl: 'http://localhost:4200/assets/house.png',
      mortgageCost: 70,
      rents: [10, 50, 150, 450, 625, 750],
    },
  },
  {
    id: 14,
    name: 'Corso Moncalieri',
    leftClickable: true,
    buyCost: 10,
    group: fakeTileGroups.find((x) => x.name === 'Third group'),
    type: TileType.Regular,
    regularData: {
      houseCost: 100,
      houseImageUrl: 'http://localhost:4200/assets/house.png',
      hotelCost: 100,
      hotelImageUrl: 'http://localhost:4200/assets/house.png',
      mortgageCost: 80,
      rents: [12, 60, 180, 500, 700, 900],
    },
  },
  {
    id: 15,
    name: 'Stazione Sito',
    leftClickable: true,
    buyCost: 10,
    group: fakeTileGroups.find((x) => x.name === 'Stations group'),
    type: TileType.Special,
    specialType: SpecialType.Station,
    specialData: {
      imageUrl: 'http://localhost:4200/assets/train-station.png',
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
    leftClickable: true,
    buyCost: 10,
    group: fakeTileGroups.find((x) => x.name === 'Fourth group'),
    type: TileType.Regular,
    regularData: {
      houseCost: 100,
      houseImageUrl: 'http://localhost:4200/assets/house.png',
      hotelCost: 100,
      hotelImageUrl: 'http://localhost:4200/assets/house.png',
      mortgageCost: 90,
      rents: [14, 70, 200, 550, 750, 950],
    },
  },
  {
    id: 17,
    name: "Probabilita'",
    leftClickable: false,
    type: TileType.Special,
    specialType: SpecialType.Probability,
    specialData: {
      imageUrl: 'http://localhost:4200/assets/chest.png',
      width: 64,
      height: 64,
    },
  },
  {
    id: 18,
    name: 'Corso Potenza',
    leftClickable: true,
    buyCost: 10,
    group: fakeTileGroups.find((x) => x.name === 'Fourth group'),
    type: TileType.Regular,
    regularData: {
      houseCost: 100,
      houseImageUrl: 'http://localhost:4200/assets/house.png',
      hotelCost: 100,
      hotelImageUrl: 'http://localhost:4200/assets/house.png',
      mortgageCost: 90,
      rents: [14, 70, 200, 550, 750, 950],
    },
  },
  {
    id: 19,
    name: 'Piazza Giuseppe Manno',
    leftClickable: true,
    buyCost: 10,
    group: fakeTileGroups.find((x) => x.name === 'Fourth group'),
    type: TileType.Regular,
    regularData: {
      houseCost: 100,
      houseImageUrl: 'http://localhost:4200/assets/house.png',
      hotelCost: 100,
      hotelImageUrl: 'http://localhost:4200/assets/house.png',
      mortgageCost: 100,
      rents: [16, 80, 220, 600, 800, 1000],
    },
  },
  {
    id: 20,
    name: 'Parcheggio Gratuito',
    leftClickable: false,
    type: TileType.Corner,
    cornerData: {
      imageUrl: 'http://localhost:4200/assets/corner-parking.png',
    },
  },
  {
    id: 21,
    name: 'Via Cernaia',
    leftClickable: true,
    buyCost: 10,
    group: fakeTileGroups.find((x) => x.name === 'Fifth group'),
    type: TileType.Regular,
    regularData: {
      houseCost: 150,
      houseImageUrl: 'http://localhost:4200/assets/house.png',
      hotelCost: 150,
      hotelImageUrl: 'http://localhost:4200/assets/house.png',
      mortgageCost: 110,
      rents: [18, 90, 250, 700, 875, 1050],
    },
  },
  {
    id: 22,
    name: 'Imprevisti',
    leftClickable: false,
    type: TileType.Special,
    specialType: SpecialType.Chance,
    specialData: {
      imageUrl: 'http://localhost:4200/assets/chance.png',
      width: 64,
      height: 64,
    },
  },
  {
    id: 23,
    name: 'Corso Galileo Ferraris',
    leftClickable: true,
    buyCost: 10,
    group: fakeTileGroups.find((x) => x.name === 'Fifth group'),
    type: TileType.Regular,
    regularData: {
      houseCost: 150,
      houseImageUrl: 'http://localhost:4200/assets/house.png',
      hotelCost: 150,
      hotelImageUrl: 'http://localhost:4200/assets/house.png',
      mortgageCost: 110,
      rents: [18, 90, 250, 700, 875, 1050],
    },
  },
  {
    id: 24,
    name: 'Corso Vittorio Emanuele II',
    leftClickable: true,
    buyCost: 10,
    group: fakeTileGroups.find((x) => x.name === 'Fifth group'),
    type: TileType.Regular,
    regularData: {
      houseCost: 150,
      houseImageUrl: 'http://localhost:4200/assets/house.png',
      hotelCost: 150,
      hotelImageUrl: 'http://localhost:4200/assets/house.png',
      mortgageCost: 120,
      rents: [20, 100, 300, 750, 925, 1100],
    },
  },
  {
    id: 25,
    name: 'Stazione Porta Nuova',
    leftClickable: true,
    buyCost: 10,
    group: fakeTileGroups.find((x) => x.name === 'Stations group'),
    type: TileType.Special,
    specialType: SpecialType.Station,
    specialData: {
      imageUrl: 'http://localhost:4200/assets/train-station.png',
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
    leftClickable: true,
    buyCost: 10,
    group: fakeTileGroups.find((x) => x.name === 'Sixth group'),
    type: TileType.Regular,
    regularData: {
      houseCost: 150,
      houseImageUrl: 'http://localhost:4200/assets/house.png',
      hotelCost: 150,
      hotelImageUrl: 'http://localhost:4200/assets/house.png',
      mortgageCost: 130,
      rents: [22, 110, 330, 800, 975, 1150],
    },
  },
  {
    id: 27,
    name: 'Corso Traiano',
    leftClickable: true,
    buyCost: 10,
    group: fakeTileGroups.find((x) => x.name === 'Sixth group'),
    type: TileType.Regular,
    regularData: {
      houseCost: 150,
      houseImageUrl: 'http://localhost:4200/assets/house.png',
      hotelCost: 150,
      hotelImageUrl: 'http://localhost:4200/assets/house.png',
      mortgageCost: 130,
      rents: [22, 110, 330, 800, 975, 1150],
    },
  },
  {
    id: 28,
    name: "Societa' Acqua Potabile",
    leftClickable: true,
    buyCost: 10,
    group: fakeTileGroups.find((x) => x.name === 'Societies group'),
    type: TileType.Special,
    specialType: SpecialType.Company,
    specialData: {
      imageUrl: 'http://localhost:4200/assets/society-water.png',
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
    leftClickable: true,
    buyCost: 10,
    group: fakeTileGroups.find((x) => x.name === 'Sixth group'),
    type: TileType.Regular,
    regularData: {
      houseCost: 150,
      houseImageUrl: 'http://localhost:4200/assets/house.png',
      hotelCost: 150,
      hotelImageUrl: 'http://localhost:4200/assets/house.png',
      mortgageCost: 140,
      rents: [24, 120, 360, 850, 1025, 1200],
    },
  },
  {
    id: 30,
    name: 'In Prigione',
    leftClickable: false,
    type: TileType.Corner,
    cornerData: {
      imageUrl: 'http://localhost:4200/assets/corner-go-to-jail.png',
    },
  },
  {
    id: 31,
    name: 'Via Roma',
    leftClickable: true,
    buyCost: 10,
    group: fakeTileGroups.find((x) => x.name === 'Seventh group'),
    type: TileType.Regular,
    regularData: {
      houseCost: 200,
      houseImageUrl: 'http://localhost:4200/assets/house.png',
      hotelCost: 200,
      hotelImageUrl: 'http://localhost:4200/assets/house.png',
      mortgageCost: 150,
      rents: [26, 130, 390, 900, 1100, 1275],
    },
  },
  {
    id: 32,
    name: 'Corso Siracusa',
    leftClickable: true,
    buyCost: 10,
    group: fakeTileGroups.find((x) => x.name === 'Seventh group'),
    type: TileType.Regular,
    regularData: {
      houseCost: 200,
      houseImageUrl: 'http://localhost:4200/assets/house.png',
      hotelCost: 200,
      hotelImageUrl: 'http://localhost:4200/assets/house.png',
      mortgageCost: 150,
      rents: [26, 130, 390, 900, 1100, 1275],
    },
  },
  {
    id: 33,
    name: "Probabilita'",
    leftClickable: false,
    type: TileType.Special,
    specialType: SpecialType.Probability,
    specialData: {
      imageUrl: 'http://localhost:4200/assets/chest.png',
      width: 64,
      height: 64,
    },
  },
  {
    id: 34,
    name: 'Via Guido Reni',
    leftClickable: true,
    buyCost: 10,
    group: fakeTileGroups.find((x) => x.name === 'Seventh group'),
    type: TileType.Regular,
    regularData: {
      houseCost: 200,
      houseImageUrl: 'http://localhost:4200/assets/house.png',
      hotelCost: 200,
      hotelImageUrl: 'http://localhost:4200/assets/house.png',
      mortgageCost: 160,
      rents: [28, 150, 450, 1000, 1200, 1400],
    },
  },
  {
    id: 35,
    name: 'Stazione Porta Susa',
    leftClickable: true,
    buyCost: 10,
    group: fakeTileGroups.find((x) => x.name === 'Stations group'),
    type: TileType.Special,
    specialType: SpecialType.Station,
    specialData: {
      imageUrl: 'http://localhost:4200/assets/train-station.png',
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
    leftClickable: false,
    type: TileType.Special,
    specialType: SpecialType.Chance,
    specialData: {
      imageUrl: 'http://localhost:4200/assets/chance.png',
      width: 64,
      height: 64,
    },
  },
  {
    id: 37,
    name: 'Corso Principe Oddone',
    leftClickable: true,
    buyCost: 10,
    group: fakeTileGroups.find((x) => x.name === 'Eighth group'),
    type: TileType.Regular,
    regularData: {
      houseCost: 200,
      houseImageUrl: 'http://localhost:4200/assets/house.png',
      hotelCost: 200,
      hotelImageUrl: 'http://localhost:4200/assets/house.png',
      mortgageCost: 175,
      rents: [35, 175, 500, 1100, 1300, 1500],
    },
  },
  {
    id: 38,
    name: 'Tassa Di Lusso',
    leftClickable: false,
    type: TileType.Special,
    specialType: SpecialType.Tax,
    specialData: {
      imageUrl: 'http://localhost:4200/assets/super-tax.png',
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
    leftClickable: true,
    buyCost: 10,
    group: fakeTileGroups.find((x) => x.name === 'Eighth group'),
    type: TileType.Regular,
    regularData: {
      houseCost: 200,
      houseImageUrl: 'http://localhost:4200/assets/house.png',
      hotelCost: 200,
      hotelImageUrl: 'http://localhost:4200/assets/house.png',
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
    name: 'mole',
    imageUrl: 'http://localhost:4200/assets/player-1.png',
  },
];
