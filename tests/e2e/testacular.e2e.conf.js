files = [
  ANGULAR_SCENARIO,
  ANGULAR_SCENARIO_ADAPTER,
  'indexScenario.js',
];

// list of files to exclude
exclude = [
  'testacular.e2e.conf.js'
];

urlRoot = '/__testacular/';

autoWatch = true;

browsers = ['Chrome'];

singleRun = true;

proxies = {
  '/': 'http://localhost:3000/'
};
