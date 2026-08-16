import { EnvConfig } from '../utils/types';

export const environment: EnvConfig = {
  PRODUCTION: false,
  SERVER_LINK: 'http://localhost:8080',

  map: {
    ASSET_FILE: 'playok.png',
    GRID_OFFSET: {
      x: 119.5,
      y: 50,
    },
    CELL_OFFSET: {
      x: 61.5,
      y: 55.5,
    },
    WITHIN_INTERSECTION_RANGE: 20,
  },
  pieces: {
    ASSET_PATH: 'playok',
  },
};
