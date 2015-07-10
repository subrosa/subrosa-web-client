describe('Filter:gameEventType', function () {
    'use strict';

    var gameEventTypeFilter;

    beforeEach(module('subrosa.game'));

    beforeEach(inject(function ($filter) {
        gameEventTypeFilter = $filter('gameEventType');
    }));

    it("returns a translated string if the event type exists", function () {
        expect(gameEventTypeFilter("gameStart")).toBe("Game Begins");
    });

    it("returns the provided value if the event type does not exist", function () {
        expect(gameEventTypeFilter("LALA")).toBe("LALA");
    });
});
