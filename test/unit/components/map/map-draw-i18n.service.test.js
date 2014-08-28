describe('Service: mapDrawI18n', function () {
    var leaflet, i18n, mapDrawI18n;

    beforeEach(module('subrosa.components.map'));

    beforeEach(module(function ($provide) {
        leaflet = {
            drawLocal: {
                draw: {
                    toolbar: {},
                    handlers: {
                        polygon: {},
                        rectangle: {}
                    }
                },
                edit: {}
            },
            Icon: {Default: {imagePath: ''}}
        };

        i18n = jasmine.createSpy('i18n');

        $provide.constant('leaflet', leaflet);
        $provide.constant('i18n', i18n);
    }));

    beforeEach(inject(function (_mapDrawI18n_) {
        mapDrawI18n = _mapDrawI18n_;
    }));

    it("sets several leaflet.draw strings", function () {
        mapDrawI18n.setStrings();
        expect(leaflet.drawLocal).toBeDefined();
        expect(i18n).toHaveBeenCalled();
    });
});
