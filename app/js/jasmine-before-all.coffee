((jasmine) ->
  root = this

  root.beforeAll = (doBeforeAll) ->
    itsBeenDoneBefore = false
    jasmine.getEnv().beforeEach doneWrapperFor doBeforeAll, (done) ->
      if itsBeenDoneBefore
        done() if typeof done == "function"
      else
        doBeforeAll.call(jasmine.getEnv().currentSpec, done)
        itsBeenDoneBefore = true

  root.afterAll = (doAfterAll) ->
    callCount = 0
    specCount = null
    suiteId = jasmine.getEnv().currentSuite.id

    jasmine.getEnv().afterEach doneWrapperFor doAfterAll, (done) ->
      specCount = countSpecsInSuite(findSuite(suiteId)) unless specCount?
      callCount++
      if callCount == specCount
        doAfterAll.call(jasmine.getEnv().currentSpec, done)
      else
        done?()

  doneWrapperFor = (func, toWrap) ->
    if func.length == 0
      -> toWrap()
    else
      (done) -> toWrap(done)

  findSuite = (suiteId, suite = jasmine.getEnv().currentSpec.suite) ->
    return suite if suite.id == suiteId
    return null unless suite.parentSuite?
    findSuite(suiteId, suite.parentSuite)

  countSpecsInSuite = (suite) ->
    count = suite.specs().length
    count += countSpecsInSuite(suite) for suite in suite.suites()
    count

)(jasmine)
