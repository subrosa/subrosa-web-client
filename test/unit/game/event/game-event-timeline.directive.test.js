describe('Directive: gameEventTypeIcon', function () {
    var $scope, element;

    beforeEach(module(
        'subrosa.game',
        '/app/game/event/views/game-event-timeline.html',
        '/app/game/event/views/game-event-type-icon.html'
    ));

    beforeEach(inject(function ($compile, _$rootScope_) {
        $scope = _$rootScope_;

        element = angular.element('<div game-event-timeline="events"></div>');
        $scope.events = [
            {event: "registrationStart", date: 1414728000000},
            {event: "registrationEnd", date: 1415738005000}
        ];

        $compile(element)($scope);
        $scope.$digest();
    }));

    it("displays a timeline of game events ", function () {
        expect(element.find('ul').hasClass('timeline')).toBe(true);
        expect(element.find('li').length).toBe(2);
    });
});
