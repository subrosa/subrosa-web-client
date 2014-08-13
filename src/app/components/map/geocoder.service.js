/**
 * @ngdoc service
 * @name subrosa.components.map.geocoder
 *
 * @requires $q
 * @requires googleMaps
 * @requires gettext
 *
 * @description
 *  Provides a geocode pass-through to google.
 */
angular.module('subrosa.components.map').service('geocoder', function ($q, googleMaps, gettext) {

    this.geocode = function (options) {
        var deferred = $q.defer(),
            googleGeocoder = new googleMaps.maps.Geocoder();

        googleGeocoder.geocode(options, function (results, status) {
            if (status === googleMaps.maps.GeocoderStatus.OK) {
                deferred.resolve(results);
            } else {
                deferred.reject(gettext('Geocoder failed due to: ') + status);
            }
        });

        return deferred.promise;
    };

});