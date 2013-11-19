'use strict';

/* Controllers */

angular.module('gamestore.controllers', ['gamestore.services'])

    .controller('MainCtrl', function ($scope, $location, cart) {
        $scope.addCart = function (game) {
            cart.add(game);
            $location.url("/cart");
        }
    })

    .controller('CatalogCtrl', function ($scope, $http, search) {
        $scope.search = search;
        $http.get("data/catalog.json").success(function (data) {
            $scope.catalog = data;
        });
    })

    .controller('GameCtrl', function ($scope, $routeParams, $http) {
        $http.get("data/" + $routeParams.ref + ".json").success(function (data) {
            $scope.game = data;
        });
    })

    .controller('CartCtrl', function ($scope, cart) {
        $scope.cart = cart;
    })
