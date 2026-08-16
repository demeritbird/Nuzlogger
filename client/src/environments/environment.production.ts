import { EnvConfig } from '../utils/types';

export const environment: EnvConfig = {
  PRODUCTION: true,
  SERVER_LINK: '',

  map: {
    ASSET_FILE: '',
    GRID_OFFSET: {
      x: 0,
      y: 0,
    },
    CELL_OFFSET: {
      x: 0,
      y: 0,
    },
    WITHIN_INTERSECTION_RANGE: 0,
  },
  pieces: {
    ASSET_PATH: '',
  },
};
