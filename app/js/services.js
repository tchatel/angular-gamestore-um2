'use strict';

/* Services */

angular.module('gamestore.services', [])

    .value('search', {})

    .value('tva', 19.6)

    .factory('cart', function (tva, notification) {
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
                notification.add("Article ajouté : " + game.name, null, 3);
            },
            remove: function (row) {
                var self = this;
                delete self.rows[row.game.ref];
                notification.add("Article supprimé : " + row.game.name + ". ", function () {
                    self.rows[row.game.ref] = row;
                }, 6);
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
