export type Position = {
  x: number;
  y: number;
};

export type EnvConfig = {
  PRODUCTION: boolean;
  SERVER_LINK: string;

  map: {
    ASSET_FILE: string;
    GRID_OFFSET: Position;
    CELL_OFFSET: Position;
  };
  pieces: {
    ASSET_PATH: string;
  };
};

export type Nine<T> = [T, T, T, T, T, T, T, T, T];
export type Ten<T> = [T, T, T, T, T, T, T, T, T, T];
