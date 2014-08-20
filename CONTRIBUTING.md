# Contributing to the Subrosa Web Client

Thanks for contributing to the Subrosa Web Client!

We love issues and pull requests, thank you for taking the time to submit them.

## Contributing Code
In order for a pull request to be accepted the following conditions must be met:

* The code should be accompanied by unit tests (and e2e tests if necessary)
* The code should pass all relevant [lint checks](#linting)
* The code should be documented

We recommend that you run `grunt check` before committing code as it runs a series of checks for you as well as the entire test suite.

## Testing

To run a single run of the tests:

```
grunt test
```

To run the test server:
```
grunt test:server
```

The test server will watch the files in the project and rerun the tests when they change.  The test server also provides the ability to run tests on multiple browsers in addition to the default PhantomJS browser.
See the [grunt-contrib-jasmine documentation](https://github.com/gruntjs/grunt-contrib-jasmine) for additional information.

## Linting

You can run all lint checks by typing:

```
grunt lint
```

### JavaScript

To enforce JavaScript guidelines, we use the [JSHint](http://jshint.com/) library via [grunt-contrib-jshint](https://github.com/gruntjs/grunt-contrib-jshint).
The JSHint configuration used is located at the root of the project in the [`.jshintrc`](.jshintrc) file.

To run the JavaScript linter:

```
grunt jshint
```

### CSS
To check CSS, we use the [CSSLint](https://github.com/CSSLint/csslint) library via [grunt-contrib-csslint](https://github.com/gruntjs/grunt-contrib-csslint).
The CSSLint configuration used is located at the root of the project in the [`.csslintrc`](.csslintrc) file.

To run the CSS linter:

```
grunt csslint
```

### HTML

To check HTML, we use [grunt-htmlhint](https://github.com/yaniswang/grunt-htmlhint) which uses the lint checks from [HTMLHint](http://htmlhint.com/).

To run the HTML linter:

```
grunt htmlhint
```


## Filing Issues
When filing an issue please include a brief summary of the problem, steps to reproduce the issue, the expected result, the actual result, and the hardware (browser, OS, etc.) if deemed applicable.

Here is a template you may use:

**Summary:**

I tried this and it didn't work

**Steps to Reproduce:**

1. Do this
2. Then do this

**Expected Results:**

For it to work

**Actual Results:**

It didn't work

**Hardware:**

IE5, Windows 3.1
