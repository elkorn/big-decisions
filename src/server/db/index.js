import * as file from './file';
const AVAILABLE_BACKENDS = {
  file
};

let currentDb;

export function initialize(backendName) {
  if(AVAILABLE_BACKENDS.hasOwnProperty(backendName)) {
    currentDb = AVAILABLE_BACKENDS[backendName];
  } else {
    throw new Error(`Database backend ${backendName} does not exist.`);
  }
}

export function get() {
  if(!currentDb) {
    throw new Error('No database initialized.');
  }

  return currentDb;
}
