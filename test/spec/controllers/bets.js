'use strict';

describe('Controller: BetsCtrl', function () {

  // load the controller's module
  beforeEach(module('mondial2014App'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('BetsCtrl', {
      $scope: scope
    });
  }));

  it('should have an empty list of matches', function () {
    expect(scope.matchSections.length).toBe(0);
  });
  it('should have an empty list of bets', function () {
    expect(scope.bets.length).toBe(0);
  });
  it('open should be defined', function () {
    expect(scope.open).toBeDefined();
  });
});
