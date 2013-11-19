'use strict';

/* Filters */

angular.module('gamestore.filters', [])

    .filter('interval', function ($parse) {

        return function (input, property, min, max) {
            if (!input) {
                return undefined;
            }

            var get = $parse(property);

            var output = [];
            for (var i = 0 ; i < input.length ; i++) {
                var item = input[i];
                var okMin = !min || get(item) >= parseInt(min);
                var okMax = !max || get(item) <= parseInt(max);
                if (okMin && okMax) {
                    output.push(item);
                }
            }
            return output;
        };

    })
