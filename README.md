# yogi alloy

This project provides common [AlloyUI](http://alloyui.com) tasks for [yogi](http://yui.github.com/yogi) command line tool.

## Syntax

	yogi alloy [command]

## Available commands:

### 1) Alloy Twitter Bootstrap commands

Provides a set of util commands to work with [Alloy Twitter Bootstrap](http://github.com/eduardolundgren/alloy-twitter-bootstrap) project.

`yogi alloy --compile-css`
Compile SASS files to CSS.

`yogi alloy --watch-css`
Watch changes on SASS files and build them.

### 2) Other commands

`yogi alloy --namespace-css [namespace]`
Finds all CSS files in the current directory (non-recursively) and namespace them with [namespace].

Basic usage:

`.bar {}`

	yogi alloy -namespace-css bar

Result:

`.foo-bar {}`