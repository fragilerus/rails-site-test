var mainSite = angular.module('mainSite', [])
  		.config(["$routeProvider", function($routeProvider){
    		$routeProvider.when('/oldindex',{ templateurl: '_index.html'})
    					  .when('/http',{ templateurl: 'http/index'})
            		      .when('/mortgage_calculator', { templateUrl: 'mortgage_calculator/index'});
  		}]);
