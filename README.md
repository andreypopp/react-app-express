# Another project template for React

This is the minimal project template to get started with
[react-app-controller][1] and [react-app-middleware][2] which provides
*server-side rendering*, *CommonJS modules in a browser* (via [browserify][4])
and routing via *History API*  while using [express][3] server-side.

Project structure is the following:

    ├── README.md
    ├── package.json
    ├── client.js
    └── server.js

Files `client.js` and `server.js` contain client and server code
correspondingly.

To install dependencies:

    % npm install

To start development execute:

    % npm start

and edit `client.js` or `server.js` in your favourite text editor or IDE. Code
will be automatically rebuilt after you made some changes.

If you encounter `EMFILE` error you can workaround it by raising the number of
file descriptors allowed to be open:

    % ulimit -n 10000

The code size when minified and gzipped is pretty small:

    % NODE_ENV=production browserify -r ./client.js:./app -t reactify \
      | uglifyjs -cm \
      | gzip \
      | wc -c
    29270

It's slightly more than 29KB.

[1]: https://github.com/andreypopp/react-app-controller
[2]: https://github.com/andreypopp/react-app-middleware
[3]: http://expressjs.com
[4]: http://browserify.org
