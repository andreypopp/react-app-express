"use strict";
/**
 * Server application.
 *
 * @jsx React.DOM
 */

var express     = require('express');
var browserify  = require('browserify');
var reactify    = require('reactify');
var ui          = require('react-app-middleware');
var serveJS     = require('connect-browserify');

var opts = {
  debug: true,
  watch: true
}

function createBundler() {
  return browserify()
    .require('./client.js', {expose: './app'}) // DO NOT CHANGE!!!
    .transform(reactify);
}

var app = express();

app.get('/assets/bundle.js', serveJS(createBundler(), {
  debug: opts.debug,
  watch: opts.watch
}));

app.use(ui.serveRenderedPage(createBundler(), {
  // populate <head>
  meta: [{charset: 'utf8'}],
  script: [{src: '/assets/bundle.js'}],
  link: [{href: '/assets/styles.css', rel: 'stylesheet'}],

  debug: opts.debug,
  watch: opts.watch
}));

app.listen(3000);
