/* jasmine-before-all - 0.1.0
 * Adds a done-friendly beforeAll setup to jasmine
 * https://github.com/testdouble/jasmine-before-all
 */
(function() {
  (function(jasmine) {
    var countSpecsInSuite, doneWrapperFor, findSuite, root;
    root = this;
    root.beforeAll = function(doBeforeAll) {
      var itsBeenDoneBefore;
      itsBeenDoneBefore = false;
      return jasmine.getEnv().beforeEach(doneWrapperFor(doBeforeAll, function(done) {
        if (itsBeenDoneBefore) {
          if (typeof done === "function") {
            return done();
          }
        } else {
          doBeforeAll.call(jasmine.getEnv().currentSpec, done);
          return itsBeenDoneBefore = true;
        }
      }));
    };
    root.afterAll = function(doAfterAll) {
      var callCount, specCount, suiteId;
      callCount = 0;
      specCount = null;
      suiteId = jasmine.getEnv().currentSuite.id;
      return jasmine.getEnv().afterEach(doneWrapperFor(doAfterAll, function(done) {
        if (specCount == null) {
          specCount = countSpecsInSuite(findSuite(suiteId));
        }
        callCount++;
        if (callCount === specCount) {
          return doAfterAll.call(jasmine.getEnv().currentSpec, done);
        } else {
          return typeof done === "function" ? done() : void 0;
        }
      }));
    };
    doneWrapperFor = function(func, toWrap) {
      if (func.length === 0) {
        return function() {
          return toWrap();
        };
      } else {
        return function(done) {
          return toWrap(done);
        };
      }
    };
    findSuite = function(suiteId, suite) {
      if (suite == null) {
        suite = jasmine.getEnv().currentSpec.suite;
      }
      if (suite.id === suiteId) {
        return suite;
      }
      if (suite.parentSuite == null) {
        return null;
      }
      return findSuite(suiteId, suite.parentSuite);
    };
    return countSpecsInSuite = function(suite) {
      var count, _i, _len, _ref;
      count = suite.specs().length;
      _ref = suite.suites();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        suite = _ref[_i];
        count += countSpecsInSuite(suite);
      }
      return count;
    };
  })(jasmine);

}).call(this);
