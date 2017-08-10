// this file isn't transplanted, so must use common js and es5

// register babel to tanspile before our tests
require('babel-register')();

//disable webpack features that mocah doesn't understand
require.extensions['.css'] = function() {};
