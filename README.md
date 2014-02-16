**WARNING: This plugin relies on internal Jasmine code that was refactored or removed in Jasmine 2.0. Currently compatible with Jasmine 1.x only**

# jasmine-before-all

[![Build Status](https://travis-ci.org/testdouble/jasmine-before-all.png?branch=master)](https://travis-ci.org/testdouble/jasmine-before-all)

jasmine-before-all is a standalone plugin that you can load *after* jasmine that adds global `beforeAll` and `afterAll` functions that call `beforeEach` and `afterEach`, respectively, at most one time per callback definition.

Importantly, they play nicely with `done` mechanisms like those found in [minijasminenode](https://github.com/juliemr/minijasminenode).

Using `beforeAll`/`afterAll` is typically a *bad idea* for unit tests, but if you're using Jasmine for integration tests, it'll probably come in handy as soon as your setup becomes expensive.

**[Download the latest version here](https://github.com/testdouble/jasmine-before-all/releases)**.

# examples

Does what it says on the tin. This would pass, for instance:

```coffeescript
describe 'intentional pollution', ->
  foo = 0
  beforeAll -> foo += 1

  context '1', ->
    Then -> foo == 1

  context '2', ->
    Then -> foo == 1

  context '3', ->
    Then -> foo == 1

  afterAll -> foo++; expect(foo).toEqual(2)
```

And if your test runner includes a "done" callback (or you've included one as a helper), this should also work:

``` coffeescript
describe '(asynchronous) intentional pollution', ->
  bar = 3
  beforeAll (done) ->
    setTimeout ->
      bar -= 1
      done()
    , 100

  context '1', ->
    Then -> bar == 2

  context '2', ->
    Then -> bar == 2

  context '3', ->
    Then -> bar == 2
```
