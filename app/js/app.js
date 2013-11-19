'use strict';

angular.module('gamestore', ['ngRoute', 'ngSanitize', 'notif',
                             'gamestore.controllers', 'gamestore.services',
                             'gamestore.filters', 'gamestore.directives'])

    .config(function($routeProvider) {

        $routeProvider.when('/catalog',   {templateUrl: 'partials/catalog.html', controller: 'CatalogCtrl'});
        $routeProvider.when('/game/:ref', {templateUrl: 'partials/game.html',    controller: 'GameCtrl'});
        $routeProvider.when('/cart',      {templateUrl: 'partials/cart.html',    controller: 'CartCtrl'});

        $routeProvider.otherwise({redirectTo: '/catalog'});

    });
