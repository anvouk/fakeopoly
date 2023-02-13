export interface BaseTileInfo {
  id: number;
  name: string;
}

export interface TileRegularInfo extends BaseTileInfo {
  type: 'regular';
  regularData: {
    // color also indicates the group
    color: string;
  };
}

export interface TileSpecialInfo extends BaseTileInfo {
  type: 'special';
  specialData: {
    imageUrl: string;
    width: number;
    height: number;
  };
}

export interface TileCornerInfo extends BaseTileInfo {
  type: 'corner';
  cornerData: {
    imageUrl: string;
  };
}

export type TileInfo = TileRegularInfo | TileSpecialInfo | TileCornerInfo;

export const fakeTiles: TileInfo[] = [
  {
    id: 0,
    name: 'START',
    type: 'corner',
    cornerData: {
      imageUrl: 'http://localhost:4200/assets/corner.png',
    },
  },
  {
    id: 1,
    name: 'Parco Della Vittoria',
    type: 'regular',
    regularData: {
      color: '#b700ac',
    },
  },
  {
    id: 2,
    name: 'Viale Dei Giardini',
    type: 'regular',
    regularData: {
      color: '#b700ac',
    },
  },
  {
    id: 3,
    name: 'Tassa Di Lusso',
    type: 'special',
    specialData: {
      imageUrl: 'http://localhost:4200/assets/test.png',
      width: 64,
      height: 64,
    },
  },
  {
    id: 4,
    name: 'Largo Colombo',
    type: 'regular',
    regularData: {
      color: '#e5791e',
    },
  },
  {
    id: 5,
    name: 'Vicolo Corto',
    type: 'regular',
    regularData: {
      color: '#b700ac',
    },
  },
  {
    id: 6,
    name: 'Imprevis-\nti',
    type: 'special',
    specialData: {
      imageUrl: 'http://localhost:4200/assets/test.png',
      width: 64,
      height: 64,
    },
  },
  {
    id: 7,
    name: 'Stazione',
    type: 'special',
    specialData: {
      imageUrl: 'http://localhost:4200/assets/test.png',
      width: 64,
      height: 64,
    },
  },
  {
    id: 8,
    name: 'Corso Magella-\nno',
    type: 'regular',
    regularData: {
      color: '#e5791e',
    },
  },
  {
    id: 9,
    name: 'Largo Augusto',
    type: 'regular',
    regularData: {
      color: '#e5791e',
    },
  },
  {
    id: 10,
    name: 'PRISON',
    type: 'corner',
    cornerData: {
      imageUrl: 'http://localhost:4200/assets/corner.png',
    },
  },
  {
    id: 11,
    name: 'Parco Della Vittoria',
    type: 'regular',
    regularData: {
      color: '#b700ac',
    },
  },
  {
    id: 12,
    name: 'Viale Dei Giardini',
    type: 'regular',
    regularData: {
      color: '#b700ac',
    },
  },
  {
    id: 13,
    name: 'Tassa Di Lusso',
    type: 'special',
    specialData: {
      imageUrl: 'http://localhost:4200/assets/test.png',
      width: 64,
      height: 64,
    },
  },
  {
    id: 14,
    name: 'Largo Colombo',
    type: 'regular',
    regularData: {
      color: '#e5791e',
    },
  },
  {
    id: 15,
    name: 'Vicolo Corto',
    type: 'regular',
    regularData: {
      color: '#b700ac',
    },
  },
  {
    id: 16,
    name: 'Imprevis-\nti',
    type: 'special',
    specialData: {
      imageUrl: 'http://localhost:4200/assets/test.png',
      width: 64,
      height: 64,
    },
  },
  {
    id: 17,
    name: 'Stazione',
    type: 'special',
    specialData: {
      imageUrl: 'http://localhost:4200/assets/test.png',
      width: 64,
      height: 64,
    },
  },
  {
    id: 18,
    name: 'Corso Magella-\nno',
    type: 'regular',
    regularData: {
      color: '#000000',
    },
  },
  {
    id: 19,
    name: 'Largo Augusto',
    type: 'regular',
    regularData: {
      color: '#e5791e',
    },
  },
  {
    id: 20,
    name: 'PARKING',
    type: 'corner',
    cornerData: {
      imageUrl: 'http://localhost:4200/assets/corner.png',
    },
  },
  {
    id: 21,
    name: 'Parco Della Vittoria',
    type: 'regular',
    regularData: {
      color: '#b700ac',
    },
  },
  {
    id: 22,
    name: 'Viale Dei Giardini',
    type: 'regular',
    regularData: {
      color: '#b700ac',
    },
  },
  {
    id: 23,
    name: 'Tassa Di Lusso',
    type: 'special',
    specialData: {
      imageUrl: 'http://localhost:4200/assets/test.png',
      width: 64,
      height: 64,
    },
  },
  {
    id: 24,
    name: 'Largo Colombo',
    type: 'regular',
    regularData: {
      color: '#e5791e',
    },
  },
  {
    id: 25,
    name: 'Vicolo Corto',
    type: 'regular',
    regularData: {
      color: '#b700ac',
    },
  },
  {
    id: 26,
    name: 'Imprevis-\nti',
    type: 'special',
    specialData: {
      imageUrl: 'http://localhost:4200/assets/test.png',
      width: 64,
      height: 64,
    },
  },
  {
    id: 27,
    name: 'Stazione',
    type: 'special',
    specialData: {
      imageUrl: 'http://localhost:4200/assets/test.png',
      width: 64,
      height: 64,
    },
  },
  {
    id: 28,
    name: 'Corso Magella-\nno',
    type: 'regular',
    regularData: {
      color: '#e5791e',
    },
  },
  {
    id: 29,
    name: 'Largo Augusto',
    type: 'regular',
    regularData: {
      color: '#e5791e',
    },
  },
  {
    id: 30,
    name: 'GO TO PRISON',
    type: 'corner',
    cornerData: {
      imageUrl: 'http://localhost:4200/assets/corner.png',
    },
  },
  {
    id: 31,
    name: 'Parco Della Vittoria',
    type: 'regular',
    regularData: {
      color: '#b700ac',
    },
  },
  {
    id: 32,
    name: 'Viale Dei Giardini',
    type: 'regular',
    regularData: {
      color: '#b700ac',
    },
  },
  {
    id: 33,
    name: 'Tassa Di Lusso',
    type: 'special',
    specialData: {
      imageUrl: 'http://localhost:4200/assets/test.png',
      width: 64,
      height: 64,
    },
  },
  {
    id: 34,
    name: 'Largo Colombo',
    type: 'regular',
    regularData: {
      color: '#e5791e',
    },
  },
  {
    id: 35,
    name: 'Vicolo Corto',
    type: 'regular',
    regularData: {
      color: '#b700ac',
    },
  },
  {
    id: 36,
    name: 'Imprevis-\nti',
    type: 'special',
    specialData: {
      imageUrl: 'http://localhost:4200/assets/test.png',
      width: 64,
      height: 64,
    },
  },
  {
    id: 37,
    name: 'Stazione',
    type: 'special',
    specialData: {
      imageUrl: 'http://localhost:4200/assets/test.png',
      width: 64,
      height: 64,
    },
  },
  {
    id: 38,
    name: 'Corso Magella-\nno',
    type: 'regular',
    regularData: {
      color: '#e5791e',
    },
  },
  {
    id: 39,
    name: 'Largo Augusto',
    type: 'regular',
    regularData: {
      color: '#e5791e',
    },
  },
];
