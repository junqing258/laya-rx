const workboxBuild = require('workbox-build');

// NOTE: This should be run *AFTER* all your assets are built
const buildSW = () => {
  // This will return a Promise
  return workboxBuild.generateSW({
    globDirectory: 'bin',
    globPatterns: [
      '**\/*.{png,json,js,css}',
    ],
    swDest: 'bin/sw.js',
  });
}

buildSW();