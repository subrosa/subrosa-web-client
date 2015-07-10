describe('Service: i18n', function () {
    'use strict';

    var i18n;

    beforeEach(module('i18n'));

    beforeEach(inject(function (_i18n_) {
        i18n = _i18n_;
    }));

    it('can provide a marker for translations that returns the string provided', function () {
        expect(i18n('blah')).toBe('blah');
    });
});
