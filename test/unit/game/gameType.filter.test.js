describe('Filter:gameType', function () {
    var gameTypeFilter;

    beforeEach(module('subrosa.game'));

    beforeEach(module(function($provide) {
        $provide.value('gettext',  function(a) {return a});
    }));

    beforeEach(inject(function ($filter) {
        gameTypeFilter = $filter('gameType');
    }));

    it("returns a translated string if the game type exists", function () {
        expect(gameTypeFilter("ASSASSIN")).toBe("Assassins");
    });

    it("returns the provided value if the game type does not exist", function () {
        expect(gameTypeFilter("LALA")).toBe("LALA");
    });
});