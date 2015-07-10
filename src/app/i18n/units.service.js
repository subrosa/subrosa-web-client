/**
 * @ngdoc service
 * @name  i18n.units
 *
 * @description
 *   Determine whether a $locale uses imperial or metric units.
 */
angular.module('i18n').service('units', function ($locale) {
    'use strict';

    var IMPERIALISTS = ['us', 'lr', 'mm'],
        country = $locale.id.split('-')[1].toLowerCase();

    this.imperial = IMPERIALISTS.indexOf(country) >= 0;
    this.metric = IMPERIALISTS.indexOf(country) === -1;
});
