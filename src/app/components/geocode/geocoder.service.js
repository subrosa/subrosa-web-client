/**
 * @ngdoc service
 * @name subrosa.components.geocode.geocoder
 *
 * @requires $q
 * @requires googleMaps
 * @requires i18n
 *
 * @description
 *  Provides a geocode pass-through to google.
 */
angular.module('subrosa.components.geocode').service('geocoder', function ($q, googleMaps, i18n) {
    'use strict';

    this.geocode = function (options) {
        var deferred = $q.defer(),
            googleGeocoder = new googleMaps.maps.Geocoder();

        googleGeocoder.geocode(options, function (results, status) {
            if (status === googleMaps.maps.GeocoderStatus.OK) {
                deferred.resolve(results);
            } else {
                deferred.reject(i18n('Geocoder failed due to: ') + status);
            }
        });

        return deferred.promise;
    };

});
