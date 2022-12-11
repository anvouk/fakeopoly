export interface BaseTileInfo {
  id: number,
  name: string,
}

export interface TileRegularInfo extends BaseTileInfo {
  type: 'regular',
  regularData: {
    // color also indicates the group
    color: string,
  }
}

export interface TileSpecialInfo extends BaseTileInfo {
  type: 'special',
  specialData: {
    imageUrl: string
    width: number,
    height: number,
  }
}

export type TileInfo = TileRegularInfo | TileSpecialInfo;

export const fakeTiles: TileInfo[] = [
  {
    id: 0,
    name: 'Parco Della Vittoria',
    type: 'regular',
    regularData: {
      color: '#b700ac',
    }
  },
  {
    id: 1,
    name: 'Viale Dei Giardini',
    type: 'regular',
    regularData: {
      color: '#b700ac',
    }
  },
  {
    id: 2,
    name: 'Tassa Di Lusso',
    type: 'special',
    specialData: {
      imageUrl: 'http://localhost:4200/assets/test.png',
      width: 64,
      height: 64,
    }
  },
  {
    id: 3,
    name: 'Largo Colombo',
    type: 'regular',
    regularData: {
      color: '#e5791e',
    }
  },
  {
    id: 4,
    name: 'Vicolo Corto',
    type: 'regular',
    regularData: {
      color: '#b700ac',
    }
  },
  {
    id: 5,
    name: 'Imprevis-\nti',
    type: 'special',
    specialData: {
      imageUrl: 'http://localhost:4200/assets/test.png',
      width: 64,
      height: 64,
    }
  },
  {
    id: 6,
    name: 'Stazione',
    type: 'special',
    specialData: {
      imageUrl: 'http://localhost:4200/assets/test.png',
      width: 64,
      height: 64,
    }
  },
  {
    id: 7,
    name: 'Corso Magella-\nno',
    type: 'regular',
    regularData: {
      color: '#e5791e',
    }
  },
  {
    id: 8,
    name: 'Largo Augusto',
    type: 'regular',
    regularData: {
      color: '#e5791e',
    }
  },
];
