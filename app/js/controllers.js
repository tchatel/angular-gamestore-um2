'use strict';

/* Controllers */

angular.module('gamestore.controllers', ['gamestore.services'])

    .controller('CatalogCtrl', function ($scope, $http) {
        $http.get("data/catalog.json").success(function (data) {
            $scope.catalog = data;
        });
    })
