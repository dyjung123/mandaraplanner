export interface MyGoal {
  [key: string]: Row,
}

interface Row {
  [key: string]: Column,
}

interface Column {
  goal: string;
}

export interface Coord {
  rowCoord: number | null,
  colCoord: number | null,
}

export interface Settings {
  isOnLocalStorage: boolean,
}
