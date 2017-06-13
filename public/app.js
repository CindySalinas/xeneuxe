
'use strict';

/**
 *  Module
 *
 * Description
 */

angular.module('app', [
  'ui.router',
  'ui.bootstrap',
  'app.users'

]).config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {

  // any unknown URLS go to 404
  $urlRouterProvider.otherwise('/404');
  // no route goes to index
  $urlRouterProvider.when('', '/');
  // use a state provider for routing
  $stateProvider
    .state('app', {
      abstract: true,
      templateUrl: "./templates/home/home.html",
    })
    .state('app.users', {
      url: '/',
      templateUrl: './templates/users/users.html',
      controller: "UsersCtrl"
    })
    .state('404', {
      url: '/404',
      templateUrl: './templates/not_found/404.html'
    });

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
}]);
