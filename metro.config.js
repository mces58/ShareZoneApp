const path = require('path');
const { FileStore } = require('metro-cache');

const cacheDirectory = path.join(__dirname, '.cache');

function createCacheStore(directory) {
  return new FileStore({ root: directory });
}

async function getTransformOptions() {
  return {
    transform: {
      experimentalImportSupport: false,
      inlineRequires: true,
    },
  };
}

module.exports = {
  cacheStores: [createCacheStore(cacheDirectory)],
  transformer: {
    getTransformOptions,
  },
};
