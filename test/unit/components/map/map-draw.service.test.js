describe('Service: mapDraw', function () {
    var leaflet, map, mapDraw, mapDrawI18n, expectedOptions;

    beforeEach(module('subrosa.components.map'));

    beforeEach(module(function ($provide) {
        expectedOptions = {
            draw: {
                circle: false,
                marker: false,
                polyline: false,
                rectangle: false
            },
            edit: {
                edit: false,
                remove: false
            }
        };

        leaflet = {
            Control: {
                Draw: function () {}
            },
            Icon: {Default: {imagePath: ''}}
        };

        map = {
            addControl: function () {},
            on: function () {}
        };

        mapDrawI18n = {
            setStrings: function () {}
        };

        $provide.constant('leaflet', leaflet);
        $provide.constant('mapDrawI18n', mapDrawI18n);
    }));

    beforeEach(inject(function (_mapDraw_) {
        mapDraw = _mapDraw_;
    }));

    it("allows getting the draw options", function () {
        expect(mapDraw.getOptions()).toEqual(expectedOptions);
    });

    it("allows adding the draw control to the map", function () {
        spyOn(leaflet.Control, 'Draw');
        spyOn(map, 'addControl');

        expectedOptions.edit.featureGroup = [];
        mapDraw.addControls(map, []);

        expect(leaflet.Control.Draw).toHaveBeenCalledWith(expectedOptions);
        expect(map.addControl).toHaveBeenCalledWith({});
    });

    describe("allows registering event handlers", function () {
        var handler = function () {};

        it("for create", function () {
            spyOn(map, 'on');
            mapDraw.registerCreateHandler(map, handler);
            expect(map.on).toHaveBeenCalledWith('draw:created', handler);
        });

        it("for delete", function () {
            spyOn(map, 'on');
            mapDraw.registerDeleteHandler(map, handler);
            expect(map.on).toHaveBeenCalledWith('draw:deleted', handler);
            expect(mapDraw.getOptions().edit.remove).toBe(true);
        });

        it("for edit", function () {
            spyOn(map, 'on');
            mapDraw.registerEditHandler(map, handler);
            expect(map.on).toHaveBeenCalledWith('draw:edited', handler);
            expect(mapDraw.getOptions().edit.edit).toBe(true);
        });
    });
});
