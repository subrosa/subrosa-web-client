/**
 * @ngdoc service
 * @name subrosa.components.timeline.timelineCache
 *
 * @required $cacheFactory
 *
 * @description
 *  Provides a cache for timeline dialogs so they can be opened later.
 */
angular.module('subrosa.components.timeline').service('timelineCache', function ($cacheFactory) {
    var timelineCache = $cacheFactory('timeline');

    /**
     * Put a timeline object into the timeline cache.
     * Adds a convenience method for getting an item at a specified index.
     *
     * @param timelineId the id to store in the cache.
     * @param timelineObject the object to store in the cache.
     */
    this.put = function (timelineId, timelineObject) {
        timelineObject.getIndex = function (itemToFind) {
            var foundIndex = null;
            angular.forEach(timelineObject.data, function (item, index) {
                if (angular.equals(item, itemToFind)) {
                    foundIndex = index;
                }
            });

            return foundIndex;
        };

        timelineCache.put(timelineId, timelineObject);
    };

    /**
     * Get a timeline object from the timeline cache.
     *
     * @param timelineId the id to retrieve from the cache.
     * @returns Object the timeline object retrieved from the cache.
     */
    this.get = function (timelineId) {
        return timelineCache.get(timelineId);
    };
});