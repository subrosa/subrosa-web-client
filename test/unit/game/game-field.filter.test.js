describe('Filter:gameField', function () {
    var gameFieldFilter;

    beforeEach(module('subrosa.game'));

    beforeEach(inject(function ($filter) {
        gameFieldFilter = $filter('gameField');
    }));

    it("returns a translated string if the game type exists", function () {
        expect(gameFieldFilter("HOME_ADDRESS")).toBe("Home Address");
    });

    it("returns the provided value if the game type does not exist", function () {
        expect(gameFieldFilter("LALA")).toBe("LALA");
    });
});
