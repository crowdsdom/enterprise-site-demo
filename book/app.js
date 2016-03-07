'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'myApp.services.dataService',
    'myApp.view1',
    'myApp.view2',
    'myApp.version',
    'myApp.progress',
    'myApp.calendar'
]).
config(['$routeProvider', function ($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/view1'});
}]).
run(function ($rootScope, data, progressService) {
    $rootScope.data = data;
    $rootScope.progressService = progressService;
    $rootScope.submit = function () {
        swal("預約成功!",
            "",
            "success");
    };
});
