import { EnvConfig } from '../utils/types';

export const environment: EnvConfig = {
  PRODUCTION: false,
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
  },
  pieces: {
    ASSET_PATH: '',
  },
};
