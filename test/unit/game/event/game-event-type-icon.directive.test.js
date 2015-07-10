describe('Directive: gameEventTypeIcon', function () {
    'use strict';

    var $compile, $scope, element, elementScope, icon;

    function compileDirective() {
        $compile(element)($scope);
        $scope.$digest();

        elementScope = element.scope();
        icon = element.find('i');
    }

    beforeEach(module('subrosa.game', '/app/game/event/views/game-event-type-icon.html'));

    beforeEach(inject(function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $scope = _$rootScope_;
    }));

    beforeEach(function () {
        element = angular.element('<div game-event-type-icon="event"></div>');
    });

    it("displays an icon for the event if  the event type exists", function () {
        $scope.event  = {event: "registrationStart", date: 1414728000000};
        compileDirective();
        expect(icon.hasClass('fa-cc-visa')).toBe(true);
    });

    it("displays an default icon if the event type does not exist", function () {
        $scope.event  = {event: "somethingElse", date: 1414728000000};
        compileDirective();
        expect(icon.hasClass('fa-cubes')).toBe(true);
    });
});
