'use strict';

/* Services */

angular.module('gamestore.services', [])

    .value('search', {})

    .value('tva', 1.20)

    .factory('cart', function (tva) {
        function Row(game) {
            this.game = game;
            this.qty = 1;
        }
        Row.prototype.label = function () {
            return this.game.name;
        };
        Row.prototype.ref = function () {
            return this.game.ref;
        };
        Row.prototype.unitPrice = function () {
            return this.game.price;
        };
        Row.prototype.totalPrice = function () {
            return this.qty * this.game.price;
        };
        return {
            rows: {},
            add: function (game) {
                var row = this.rows[game.ref];
                if (row) {
                    row.qty++;
                } else {
                    this.rows[game.ref] = new Row(game);
                }
            },
            remove: function (row) {
                delete this.rows[row.ref()];
            },
            totalWithTax: function () {
                var sum = 0;
                for (var i in this.rows) {
                    sum += this.rows[i].totalPrice();
                }
                return sum;
            },
            totalWithoutTax: function () {
                return this.totalWithTax() / tva;
            },
            empty: function () {
                return Object.keys(this.rows).length == 0;
            }
        };
    })
