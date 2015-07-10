# Subrosa Web Client

## Running from Source

The following are required to run the Subrosa Web Client:

* [NodeJS](http://nodejs.org/)
* [Bower](http://bower.io/)
* [PhantomJS](http://phantomjs.org/)
* [GruntJS](http://gruntjs.com/)

#### NodeJS
You must install [NodeJS](http://nodejs.org/) in order to run from source.  Visit the [NodeJS website](http://nodejs.org/) for more information on installation.

##### NVM Setup
You may consider installing the [Node Version Manager](https://github.com/creationix/nvm) in order to easily upgrade or downgrade between versions of NodeJS.

* Install nvm [by following the nvm instructions](https://github.com/creationix/nvm#installation).
* Install the latest version of NodeJS [by following the nvm instructions](https://github.com/creationix/nvm#usage).

#### Grunt and Bower
The Subrosa Web Client uses [GruntJS](http://gruntjs.com/) for tasks, [Bower](http://bower.io/) for package management, and [PhantomJS](http://phantomjs.org/) to run tests.
You will want to install these via:

```
npm install -g bower grunt-cli phantomjs
```

#### Installing Subrosa Web Client Dependencies
To install the dependencies for the Subrosa Web Client use the following.

```
npm install
bower install
```

You'll also want to run these commands regularly (any time `package.json` or `bower.json` changes) to ensure you have the latest dependencies.

## Starting the Development Server
All you should have to do is type:

```
grunt serve
```

and the Subrosa Web Client should be displayed in your default browser.  The page will automatically reload when files are changed.

## Building a Deployment Version
In order to build a deployment version of Subrosa Web Client simply type:

```
grunt build
```

The resultant build will be placed in the `dist` directory.
