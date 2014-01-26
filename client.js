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
      // you can use JSX, but if you prefer not to do that just look at the next
      // page component
      <div className="MainPage">
        <h1>MainPage</h1>
        <a href="/about">about</a>
        <a href="/user/john">John's page</a>
      </div>
    );
  }
});

var AboutPage = React.createClass({

  // This function will be called before mounting Page in the document, you can
  // do XHR from here to provide some data to a page.
  fetchData: function(request, cb) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
      var data = JSON.parse(xhr.responseText);
      cb(null, data);
    };
    xhr.open("get", "/api", true);
    xhr.send();
  },

  render: function() {
    // this component doesn't use JSX so you have different options
    return React.DOM.div({className: 'AboutPage'},
      React.DOM.h1(null, 'AboutPage'),
      React.DOM.p(null, this.props.request.data.message),
      React.DOM.a({href: '/'}, 'main'),
      React.DOM.a({href: '/user/john'}, 'John\'s page')
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

  // provide route table, route syntax is similar to express
  routes: {
    '/': MainPage,
    '/about': AboutPage,
    '/user/:username': UserPage
  },

  render: function() {
    return (
      <html>
        <head>
          <script src="/assets/bundle.js"></script>
        </head>
        <body>
          <h1>Some common markup</h1>
          {this.state.page}
        </body>
      </html>
    );
  },

  onClick: function(e) {
    if (e.target.tagName === 'A' && e.target.attributes.href) {
      e.preventDefault();
      this.navigate(e.target.attributes.href.value);
    }
  },

  // application started
  componentDidMount: function() {
    window.addEventListener('click', this.onClick);
  },

  // application will shutdown
  componentWillUnmount: function() {
    window.removeEventListener('click', this.onClick);
  }
});
