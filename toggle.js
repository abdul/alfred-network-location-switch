'use strict';
const isSelected = require('./src/utils').IsConnected;
const select = require('./src/utils').Select;

const location = process.argv.slice(-1)[0];

const toggleLocation = name => {
  select(name)
};

toggleLocation(location);