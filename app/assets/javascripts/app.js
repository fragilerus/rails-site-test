var mainSite = angular.module('mainSite', [])
  		.config(["$routeProvider", function($routeProvider){
    		$routeprovider.when('/oldindex',{ templateurl: '_index.html'})
    					  .when('/http',{ templateurl: '_index.html'})
            		      .when('/mortgage_calculator', { templateUrl: 'mortgage_calculator/index'});
  		}]);
