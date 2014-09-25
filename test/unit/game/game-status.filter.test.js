describe('Filter:gameStatus', function () {
    var gameStatusFilter;

    beforeEach(module('subrosa.game'));

    beforeEach(inject(function ($filter) {
        gameStatusFilter = $filter('gameStatus');
    }));

    it("returns a translated string if the game status exists", function () {
        expect(gameStatusFilter("DRAFT")).toBe("Draft");
    });

    it("returns the provided value if the game status does not exist", function () {
        expect(gameStatusFilter("LALA")).toBe("LALA");
    });
});
