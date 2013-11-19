'use strict';

/* Directives */

angular.module('gamestore.directives', [])

    .directive('stars', function () {
        return {
            restrict: 'A',
            priority: 0,
            scope: false,
            link: function (scope, element, attrs) {
                var stars = 0, maxStars = 0;
                scope.$watch(attrs.stars, function (value) {
                    stars = value;
                    refresh();
                });
                scope.$watch(attrs.maxStars, function (value) {
                    maxStars = value;
                    refresh();
                });
                function refresh() {
                    var html = '';
                    for (var i = 0 ; i < stars ; i++) {
                        html += '<img src="img/star.png"/>';
                    }
                    for (; i < maxStars ; i++) {
                        html += '<img src="img/empty-star.png"/>';
                    }
                    element.html(html);
                }
            }
        }
    });
