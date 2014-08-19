describe('Filter:eventType', function () {
    var eventTypeFilter;

    beforeEach(module('subrosa.game'));

    beforeEach(module(function ($provide) {
        $provide.value('gettext',  function (a) {return a; });
    }));

    beforeEach(inject(function ($filter) {
        eventTypeFilter = $filter('eventType');
    }));

    it("returns a translated string if the event type exists", function () {
        expect(eventTypeFilter("REGISTRATION")).toBe("Registration Period");
    });

    it("returns the provided value if the event type does not exist", function () {
        expect(eventTypeFilter("LALA")).toBe("LALA");
    });
});
