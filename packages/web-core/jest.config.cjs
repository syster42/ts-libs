const config = require('packages/@syster42/jest-config');
const {compilerOptions} = require('./tsconfig');
config.moduleNameMapper['^@syster42/(.*)$'] = '<rootDir>/../$1';
module.exports = config;
