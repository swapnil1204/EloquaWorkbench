'use strict';
var workbench = angular.module('workbench', ['ui.router', 'ngTable', 'ngMaterial', 'ngAria']);
workbench.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        // $urlRouterProvider.otherwise('/');

        $urlRouterProvider.otherwise('/home');
        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'views/home.html',
                controller: 'homeController'
            })
            .state('main', {
                url: '/main',
                templateUrl: 'views/main.html',
                controller: 'mainController'
            })
            .state('getStarted', {
                url: '/getStarted',
                templateUrl: 'views/getStarted.html',
                controller: 'getStartedController'
            });



    }

]);