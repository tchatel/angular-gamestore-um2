'use strict';

/* jasmine specs for services go here */

describe('service', function () {
    beforeEach(module('gamestore.services'));

    describe('TVA', function () {

        it('TVA should be 19.6', inject(function (TVA) {
            expect(TVA).toEqual(19.6);
        }));

    });

    describe('Cart', function () {


        it('Cart should be empty', inject(function (Cart) {
            expect(Cart.empty()).toBe(true);
        }));

        it('Rows', inject(function (Cart, TVA) {
            Cart.add({ref: 'AGOT', price: 40});
            Cart.add({ref: 'RFTG', price: 25});
            expect(Object.keys(Cart.rows).length).toBe(2);
            expect(Cart.rows['AGOT'].qty).toBe(1);
            expect(Cart.rows['RFTG'].qty).toBe(1);
            expect(Cart.rows['AGOT'].game.ref).toBe('AGOT');
            expect(Cart.rows['RFTG'].game.ref).toBe('RFTG');
        }));


        it('Increment quantity if item already in cart', inject(function (Cart) {
            Cart.add({ref: 'AGOT', price: 40});
            Cart.add({ref: 'RFTG', price: 25});
            Cart.add({ref: 'AGOT', price: 40});
            expect(Object.keys(Cart.rows).length).toBe(2);
            expect(Cart.rows['AGOT'].qty).toBe(2);
        }));

        it('Total', inject(function (Cart, TVA) {
            Cart.add({ref: 'AGOT', price: 40});
            Cart.add({ref: 'RFTG', price: 25});
            Cart.add({ref: 'AGOT', price: 40});
            expect(Cart.total()).toBe(105);
            expect(Cart.totalHT() * (100 + TVA) / 100).toBe(Cart.total());
        }));

        it('TotalHT', inject(function (Cart, TVA) {
            Cart.add({ref: 'AGOT', price: 40});
            Cart.add({ref: 'RFTG', price: 25});
            expect(Cart.totalHT() * (100 + TVA) / 100).toBe(Cart.total());
        }));

    });


});
