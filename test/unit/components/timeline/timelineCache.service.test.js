describe('Service: timelineCache', function () {
    var $cacheFactory, timelineCache, timelineCacheService, timelineObject;

    beforeEach(module('subrosa.components.timeline'));

    beforeEach(module(function ($provide) {
        timelineObject = {
            data: ['hello', 'blah']
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

    it("can return cached timelines", function () {
        spyOn(timelineCache, 'get').andReturn(timelineObject);

        expect(timelineCacheService.get('myTimeline')).toBe(timelineObject);
    });
});