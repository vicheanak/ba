"use strict";

/** Map relative paths to URLs. */
const map: any = {
'moment': 'vendor/moment/moment.js',
'@angular2-material': 'vendor/@angular2-material',
'ng2-bootstrap': 'vendor/ng2-bootstrap',
'underscore': 'vendor/underscore/underscore.js',
'ng2-material': 'vendor/ng2-material',
'angular2-localstorage': 'vendor/angular2-localstorage/dist',
'ng2-select': 'vendor/ng2-select',
'ng2-datepicker': 'vendor/ng2-datepicker',
'json2csv': 'vendor/json2csv'
};

const packages: any = {
'moment': {
    format: 'cjs'
},
'ng2-bootstrap': {
    format: 'cjs',
    defaultFormat: 'js',
    main: 'ng-bootstrap.js'
},
'underscore': {
    format: 'cjs'
},
'ng2-material': {
    format: 'cjs',
    defaultFormat: 'js',
    main: 'index.js'
},
'angular2-localstorage': {
    defaultFormat: 'js'
},
'ng2-select': {
    defaultFormat: 'js',
},
'ng2-datepicker': {
    defaultFormat: 'js',
},
'json2csv': {
    defaultFormat: 'js',
},
};
// put the names of any of your Material components here
const materialPkgs:string[] = [
'button-toggle',
'button',
'card',
'checkbox',
'core',
'grid-list',
'icon',
'input',
'list',
'menu',
'progress-bar',
'progress-circle',
'radio',
'sidenav',
'slide-toggle',
'tabs',
'toolbar'
];

materialPkgs.forEach((pkg) => {
    packages[`@angular2-material/${pkg}`] = {main: `${pkg}.js`};
});

////////////////////////////////////////////////////////////////////////////////////////////////
/***********************************************************************************************
 * Everything underneath this line is managed by the CLI.
 **********************************************************************************************/
const barrels: string[] = [
  // Angular specific barrels.
  '@angular/core',
  '@angular/common',
  '@angular/compiler',
  '@angular/forms',
  '@angular/http',
  '@angular/router',
  '@angular/platform-browser',
  '@angular/platform-browser-dynamic',

  // Thirdparty barrels.
  'rxjs',

  // App specific barrels.
  'app',
  'app/shared',
  'app/dashboard',
  'app/login',
  'app/product',
  'app/outlet',
  'app/report',
  'app/sp',
  'app/category',
  'app/star',
  'app/promotion',
  'app/page-not-found',
  'app/container',
  'app/distributor',
  'app/create-sp',
  'app/viewer',
  'app/setting',
  /** @cli-barrel */
];

const cliSystemConfigPackages: any = {};
barrels.forEach((barrelName: string) => {
  cliSystemConfigPackages[barrelName] = { main: 'index' };
});

/** Type declaration for ambient System. */
declare var System: any;

// Apply the CLI SystemJS configuration.
System.config({
  map: {
    '@angular': 'vendor/@angular',
    'rxjs': 'vendor/rxjs',
    'main': 'main.js'
  },
  packages: cliSystemConfigPackages
});

// Apply the user's configuration.
System.config({ map, packages });
