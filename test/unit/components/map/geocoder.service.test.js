describe('Service: geocode', function () {
    'use strict';

    var $q, deferred, googleMaps, geocoderResult, gecoderStatus, geocoder;

    beforeEach(module('subrosa.components.map'));

    beforeEach(function () {
        deferred = {
            promise: 'promise',
            resolve: function () {},
            reject: function () {}
        };

        $q = {
            defer: function () {
                return deferred;
            }
        };
    });

    beforeEach(module(function ($provide) {
        googleMaps = {maps: {
            GeocoderStatus: {OK: 'OK'},
            Geocoder: function () {
                this.geocode = function (options, callback) {
                    callback(geocoderResult, gecoderStatus);
                };
                return this;
            }
        }};

        $provide.value('$q', $q);
        $provide.constant('googleMaps', googleMaps);
        $provide.value('gettext',  function (a) {return a; });
    }));

    beforeEach(inject(function (_geocoder_) {
        geocoder = _geocoder_;
    }));

    it("provides results on success", function () {
        gecoderStatus = 'OK';
        geocoderResult = 'result';
        spyOn(deferred, 'resolve');

        geocoder.geocode({address: 'wtf'});

        expect(deferred.resolve).toHaveBeenCalledWith(geocoderResult);
    });

    it("handles google maps geocoder errors", function () {
        gecoderStatus = 'FAIL';
        spyOn(deferred, 'reject');

        geocoder.geocode({address: 'wtf'});

        expect(deferred.reject).toHaveBeenCalledWith('Geocoder failed due to: FAIL');
    });
});
