var mainSite = angular.module('mainSite', [])
  .config(function($routeProvider){
    $routeProvider.when('/oldIndex',{ templateUrl: '_index.html'})
                  .when('/mortgage_calculator', { templateUrl: 'mortgage_calculator/index'});
  });
