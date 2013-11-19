'use strict';

/* Services */

angular.module('gamestore.services', [])

    .value('search', {})

    .value('tva', 19.6)

    .factory('cart', function (tva) {
        return {
            rows: {},
            add: function (game) {
                var row = this.rows[game.ref];
                if (row) {
                    row.qty++;
                } else {
                    this.rows[game.ref] = {
                        game: game,
                        qty: 1
                    };
                }
            },
            remove: function (row) {
                delete this.rows[row.game.ref];
            },
            total: function () {
                var sum = 0;
                for (var i in this.rows) {
                    sum += this.rows[i].qty * this.rows[i].game.price;
                }
                return sum;
            },
            totalHT: function () {
                return this.total() * 100 / (100 + tva);
            },
            empty: function () {
                return Object.keys(this.rows).length == 0;
            }
        };
    })
