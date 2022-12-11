export interface TileInfo {
  id: number,
  name: string,
  // color also indicates the group
  color: string,
}

export const fakeTiles: TileInfo[] = [
  {
    id: 0,
    name: 'Parco Della Vittoria',
    color: '#b700ac',
  },
  {
    id: 1,
    name: 'Viale Dei Giardini',
    color: '#b700ac',
  },
  {
    id: 2,
    name: 'Largo Colombo',
    color: '#e5791e',
  },
  {
    id: 3,
    name: 'Vicolo Corto',
    color: '#b700ac',
  },
];
