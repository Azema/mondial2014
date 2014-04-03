'use strict';

describe('Controller: HeaderCtrl', function () {

  // load the controller's module
  beforeEach(module('mondial2014App'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('HeaderCtrl', {
      $scope: scope
    });
  }));

  it('loginAction should be defined', function () {
    expect(scope.loginAction).toBeDefined();
  });
  it('connectedUser should be defined', function () {
    expect(scope.connectedUser).toBeDefined();
  });
  it('logoutAction should be defined', function () {
    expect(scope.logoutAction).toBeDefined();
  });
  it('isLoggedIn should be defined', function () {
    expect(scope.isLoggedIn).toBeDefined();
  });
  it('should have an empty username', function () {
    expect(scope.username.length).toBe(0);
  });
  it('should have an empty login', function () {
    expect(scope.login.length).toBe(0);
  });
  it('should have an empty password', function () {
    expect(scope.password.length).toBe(0);
  });
});
