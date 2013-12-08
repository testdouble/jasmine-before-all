describe 'jasmine-before-all', ->

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

  describe "exploding occurring when afterAll is called twice", ->
    callCount = 0
    afterAll ->
      callCount++
      expect(callCount).toEqual(1)

    Then -> true
    Then -> true

    describe "foo", ->
      Then -> true
      Then -> true
