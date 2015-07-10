describe('Filter:capitalize', function () {
    'use strict';

    var capitalizeFilter;

    beforeEach(module('subrosa.utils'));

    beforeEach(inject(function ($filter) {
        capitalizeFilter = $filter('capitalize');
    }));

    it("capitalizes a string.", function () {
        expect(capitalizeFilter("a string")).toBe('A string');
    });

    it("does not capitalize non-strings.", function () {
        expect(capitalizeFilter(1)).toBe(1);
    });

    it("handles null and undefined values", function () {
        expect(capitalizeFilter(null)).toBe(null);
        expect(capitalizeFilter(undefined)).toBe(undefined);
    });
});
