export enum GameState {
  Blank = '',
  Probe = 'probe',
  Lost = 'lost',
  Flag = 'flag',
  Won = 'won'
}

export enum CellState {
  Empty = '',
  Found = 'found',
  Flag = 'flag',
  Mine = 'mine'
}

export const backgroundMap: Record<CellState | number, string> = {
  [CellState.Empty]: '#dfdfdf',
  0: '#ffffff',
  1: '#dfffff',
  2: '#dfffdf',
  3: '#ffdfdf',
  4: '#ffffdf',
  5: '#dfdfff',
  6: '#ffdfff',
  7: '#dfdfdf',
  8: '#dfdfdf',
  [CellState.Mine]: '#ff0000',
  [CellState.Flag]: '#ffdfdf',
  [CellState.Found]: '#00ff99'
};

export const colorMap: Record<CellState.Empty | number, string> = {
  [CellState.Empty]: '#dfdfdf',
  0: '#ffffff',
  1: '#00aaaa',
  2: '#00aa00',
  3: '#aa0000',
  4: '#aaaa00',
  5: '#0000aa',
  6: '#aa00aa',
  7: '#555555',
  8: '#555555'
};

const assets = '/media/minesweeper';

export const imageMap: Record<
  CellState.Mine | CellState.Flag | CellState.Found,
  { src: string; alt: string }
> = {
  [CellState.Mine]: { src: assets + '/mine.png', alt: 'a mine' },
  [CellState.Flag]: { src: assets + '/flag.png', alt: 'a flag' },
  [CellState.Found]: {
    src: assets + '/mine.png',
    alt: 'a flagged mine'
  }
};
