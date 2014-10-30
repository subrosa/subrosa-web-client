describe('Filter:gameEventType', function () {
    var gameEventTypeFilter;

    beforeEach(module('subrosa.game'));

    beforeEach(inject(function ($filter) {
        gameEventTypeFilter = $filter('gameEventType');
    }));

    it("returns a translated string if the event type exists", function () {
        expect(gameEventTypeFilter("gameStart")).toBe("The Game Begins");
    });

    it("returns the provided value if the event type does not exist", function () {
        expect(gameEventTypeFilter("LALA")).toBe("LALA");
    });
});
