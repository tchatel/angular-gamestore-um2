'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('angular-gamestore', function () {
    beforeEach(function () {
        browser().navigateTo('../../../angular-gamestore/app/index.html');  // l'url dépend d'où est lancé Node.js
    });

    it('should automatically redirect to /catalog when location hash/fragment is empty', function () {
        expect(browser().location().url()).toBe("/catalog");
    });

    describe('Catalog view', function () {
        beforeEach(function () {
            browser().navigateTo('#/catalog');
        });
        it('should render catalog when user navigates to /catalog', function () {
            expect(element('h1').text()).toMatch(/Game Store/);
            expect(element('#catalog').count()).toBe(1);
        });
        it('should filter games', function () {
            expect(repeater('ul#catalog li').count()).toBe(12);
            input('search').enter('lutte');
            expect(repeater('ul#catalog li').count()).toBe(2);
        });
    });

    describe('Game view', function () {
        beforeEach(function () {
            browser().navigateTo('#/game/AGOT');
        });
        it('should render game details view when user navigates to #/game/AGOT', function () {
            expect(element('h2').text()).toMatch(/Trône/);
            expect(binding("game.designer")).toEqual("Christian T. Petersen");
        });
    });

    describe('Cart view', function () {
        beforeEach(function () {
            browser().navigateTo('#/cart');
        });
        it('should render empty cart view when user navigates to #/cart', function () {
            expect(element('h2').text()).toMatch(/panier/);
            expect(element('#cart tr.game').count()).toEqual(0);
        });
    });

    describe('Add to cart ; different ways', function () {
        beforeEach(function () {
            browser().navigateTo('#/cart');
            expect(element('#cart tr.game').count()).toEqual(0);
        });

        it('should add to cart from catalog', function () {
            browser().navigateTo('#/catalog');
            expect(element('#catalog li').count()).toBeGreaterThan(1);
            element('#catalog li:nth-child(1) .add').click();
            browser().navigateTo('#/catalog');
            element('#catalog li:nth-child(2) .add').click();
            browser().navigateTo('#/cart');
            expect(element('#cart tr.game').count()).toEqual(2);
        });

        it('should add to cart from game pages', function () {
            browser().navigateTo('#/catalog');
            expect(element('#catalog li').count()).toBeGreaterThan(1);
            element('#catalog li:nth-child(1) img').click();
            element('.add').click();
            browser().navigateTo('#/catalog');
            element('#catalog li:nth-child(2) img').click();
            element('.add').click();
            browser().navigateTo('#/cart');
            expect(element('#cart tr.game').count()).toEqual(2);
        });

        it('should increment quantity for a game already in cart', function () {
            browser().navigateTo('#/catalog');
            expect(element('#catalog li').count()).toBeGreaterThan(1);
            element('#catalog li:nth-child(1) img').click();
            element('.add').click();
            browser().navigateTo('#/cart');
            expect(repeater('#cart tr.game').count()).toEqual(1);
            expect(input('row.qty').val()).toEqual("1");
            browser().navigateTo('#/catalog');
            element('#catalog li:nth-child(1) img').click();
            element('.add').click();
            browser().navigateTo('#/cart');
            expect(repeater('#cart tr.game').count()).toEqual(1);
            expect(input('row.qty').val()).toEqual("2");
        });


    });


});
