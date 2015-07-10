describe('Service: units', function () {
    'use strict';

    var $locale, units;

    beforeEach(module('i18n'));

    describe("will set", function () {
        beforeEach(module(function ($provide) {
            $locale = function () {
                this.id = 'en-us';
            };
            $provide.service('$locale', $locale);
        }));

        beforeEach(inject(function (_units_) {
            units = _units_;
        }));

        it('imperial to true and metric to false if US, LR, or MM', function () {
            expect(units.imperial).toBe(true);
            expect(units.metric).toBe(false);
        });
    });

    describe("will set", function () {
        beforeEach(module(function ($provide) {
            $locale = function () {
                this.id = 'fr-fr';
            };
            $provide.service('$locale', $locale);
        }));

        beforeEach(inject(function (_units_) {
            units = _units_;
        }));

        it('imperial to false and metric to true otherwise', function () {
            expect(units.imperial).toBe(false);
            expect(units.metric).toBe(true);
        });
    });
});

