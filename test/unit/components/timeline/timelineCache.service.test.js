describe('Service: timelineCache', function () {
    var $cacheFactory, timelineCache, timelineCacheService, timelineObject;

    beforeEach(module('subrosa.components.timeline'));

    beforeEach(module(function ($provide) {
        timelineObject = {
            data: ['hello', 'blah'],
            getSelection: function () {}
        };

        timelineCache = {
            get: function () {},
            put: function () {}
        };

        $cacheFactory = function () {
            return timelineCache;
        };

        $provide.value('$cacheFactory', $cacheFactory);
    }));

    beforeEach(inject(function (_timelineCache_) {
        timelineCacheService = _timelineCache_;
    }));

    it("can register timelines by adding them to the cache", function () {
        spyOn(timelineCache, 'put');

        timelineCacheService.put('myTimeline', timelineObject);

        expect(timelineCache.put).toHaveBeenCalledWith('myTimeline', timelineObject);
    });

    it("adds a getIndex convenience method to the timeline object", function () {
        timelineCacheService.put('myTimeline', timelineObject);
        expect(timelineObject.getIndex).toBeDefined();
        expect(typeof timelineObject.getIndex).toBe('function');
    });

    describe("the getIndex convenience method", function () {
        beforeEach(function () {
            timelineCacheService.put('myTimeline', timelineObject);
        });

        it("can find the index if the item exists", function () {
            expect(timelineObject.getIndex('blah')).toBe(1);
        });

        it("returns null if the item does not exist", function () {
            expect(timelineObject.getIndex('lalala')).toBe(null);
        });
    });

    it("adds a getModel convenience method to the timeline object", function () {
        timelineCacheService.put('myTimeline', timelineObject);
        expect(timelineObject.getModel).toBeDefined();
        expect(typeof timelineObject.getModel).toBe('function');
    });

    describe("the getModel convenience method", function () {
        var models = ['yoyo', 'blah'];

        beforeEach(function () {
            timelineCacheService.put('myTimeline', timelineObject);
        });

        it("will return the selected models if it exists", function () {
            spyOn(timelineObject, 'getSelection').andReturn({0: {row: 1}});
            expect(timelineObject.getModel(models)).toBe('blah');
        });

        it("returns null if the models does not exist", function () {
            var notInModel = {};
            spyOn(timelineObject, 'getSelection').andReturn(notInModel);
            expect(timelineObject.getModel(models)).toBe(notInModel);
        });
    });


    it("can return cached timelines", function () {
        spyOn(timelineCache, 'get').andReturn(timelineObject);

        expect(timelineCacheService.get('myTimeline')).toBe(timelineObject);
    });
});