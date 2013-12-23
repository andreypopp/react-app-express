/**
 * Client application.
 *
 * @jsx React.DOM
 */
"use strict";

var React             = require('react');
var createController  = require('react-app-controller');

var MainPage = React.createClass({
  render: function() {
    return (
      <div className="MainPage">
        <h1>MainPage</h1>
        <a href="/about">about</a>
        <a href="/user/john">John's page</a>
      </div>
    );
  }
});

var AboutPage = React.createClass({
  fetchData: function(request, cb) {
    cb(null, {message: 'hello'});
  },

  render: function() {
    return (
      <div className="AboutPage">
        <h1>AboutPage</h1>
        <p>{this.props.request.data.message}</p>
        <a href="/">main</a>
        <a href="/user/john">John's page</a>
      </div>
    );
  }
});

var UserPage = React.createClass({
  render: function() {
    return (
      <div className="UserPage">
        <h1>User {this.props.username}</h1>
        <a href="/">main</a>
        <a href="/about">about</a>
      </div>
    );
  }
});

module.exports = createController({
  routes: {
    '/': MainPage,
    '/about': AboutPage,
    '/user/:username': UserPage
  },

  onClick: function(e) {
    if (e.target.tagName === 'A' && e.target.attributes.href) {
      e.preventDefault();
      this.navigate(e.target.attributes.href.value);
    }
  },

  componentDidMount: function() {
    window.addEventListener('click', this.onClick);
  },

  componentWillUnmount: function() {
    window.removeEventListener('click', this.onClick);
  }
});
