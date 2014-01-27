# AngularJS and Node.js good practices

[![Build Status](https://travis-ci.org/ToastShaman/angularjs-nodejs-app.png?branch=master)](https://travis-ci.org/ToastShaman/angularjs-nodejs-app)
[![Build Status](https://david-dm.org/Toastshaman/angularjs-nodejs-app.png)](https://david-dm.org/Toastshaman/angularjs-nodejs-app.png)

This project should serve as a reference for writing web application on top of Node.js and Angular.js.

It is built on top of **AngularJS 1.2.9**, **Node.js 0.10.24**, **Redis** and **MongoDB 2.4.7**.

## Concepts

### Currently Implemented

* Build Infrastructure
* Application Skeleton

### TBD

* User Authentication and Authorization
* File Uploads
* ...

## Installation

Download Node.js from here: [http://nodejs.org/](http://nodejs.org/) or install Node.js through a packet manager
if you're using a Linux distribution. See the following Wiki page for more information:
[https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager](https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager)

Additionally, you'll need **MongoDB** and **Redis**.

Clone the repository

```
# git clone https://github.com/ToastShaman/angularjs-nodejs-app.git
```

and run

```
# npm install -g bower grunt grunt-cli
```

```
# npm install
```

## Starting the Node.js Server

Run the `default` Grunt task to compile the CSS and minify the resources:

```
# grunt
```

After you've made sure that your MongoDB and Redis instance is running you can start the Node.js server by entering:

```
# node server.js
```

You can now see the application running under the following url: [http://localhost:3000](http://localhost:3000)

## Passing Environment Variables to the Node.js Server

If you want to start the server on a different port you can do that by passing environment variables to the
Node command

```
# PORT=5000 node server.js
```

## Running the Tests

To run the tests, simply run the Grunt `test` task like so:

```
# grunt test
```

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Added some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request


## Contributors

Many thanks go to the following who have contributed to making this even better:

* **[@nmoorcroft](https://github.com/nmoorcroft)**


## License

**angularjs-nodejs-app**

* Freely distributable and licensed under the [MIT license](http://phlipper.mit-license.org/2011-2013/license.html).
