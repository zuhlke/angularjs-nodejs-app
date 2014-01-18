# AngularJS and Node.js best practices

This project should serve as a reference for writing web application on top of Node.js and Angular.js.

It is built on top of **AngularJS 1.2.9**, **Node.js 0.10.24** and **MongoDB 2.4.7**.

## Installation

Download Node.js from here: [http://nodejs.org/](http://nodejs.org/) or install Node.js through a packet manager
if you're using a Linux distribution. See the following Wiki page for more information:
[https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager](https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager)

Additionally, you'll need **MongoDB**.

Clone the repository

```
# git clone https://github.com/ToastShaman/angularjs-nodejs-app.git
```

and run

```
# npm install
```

## Starting the Node.js Server

Run the default Grunt task to compile the CSS and minify the resources:

```
# grunt
```

After you've made sure that your MongoDB instance is running you can start the Node.js server by entering:

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
