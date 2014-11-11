'use strict';

/* Directives */

angular.module('gamestore.directives', [])

    .directive('stars', function () {
        return {
            restrict: 'A',
            priority: 0,
            scope: false,
            link: function (scope, element, attrs) {
                scope.$watchGroup([attrs.stars, attrs.maxStars], function (value) {
                    var stars = value[0], max = value[1];
                    var html = '';
                    for (var i = 0 ; i < stars ; i++) {
                        html += '<img src="img/star.png"/>';
                    }
                    for (; i < max ; i++) {
                        html += '<img src="img/empty-star.png"/>';
                    }
                    element.html(html);
                });
            }
        }
    });
