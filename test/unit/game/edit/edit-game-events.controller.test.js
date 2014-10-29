describe('Controller: EditGameEventsController', function () {
    var $controller, $scope, dependencies, GameEvent, event;
    beforeEach(module('subrosa.game', 'mocks'));

    beforeEach(inject(function ($q, _$controller_, $rootScope, MockResource) {
        var resource = MockResource.$new();

        $controller = _$controller_;
        $scope = $rootScope.$new();
        event = resource.get({id: 1});

        GameEvent = resource;

        $scope.game = resource.get({id: 1});
        $scope.game.name = 'Raleigh Wars';
        $scope.game.url = 'raleigh-wars';
        $scope.saveEventForm = {$setPristine: function () {}};

        dependencies = {
            $scope: $scope,
            GameEvent: GameEvent
        };
        $controller('EditGameEventsController', dependencies);
    }));


    it('queries the GameEvent service to populate existing events', function () {
        spyOn(GameEvent, 'query').andCallThrough();

        $controller('EditGameEventsController', dependencies);

        expect(GameEvent.query).toHaveBeenCalledWith({gameUrl: $scope.game.url}, jasmine.any(Function));
        expect($scope.events).toBe(GameEvent.query().results);
    });

    it("sets up the default event object", function () {
        expect($scope.event).toEqual(new GameEvent());
    });

    it("sets up the default event types", function () {
        var expectedEventTypes = [
            {id: 'registrationStart', name: 'Registration Start'},
            {id: 'registrationEnd', name: 'Registration End'}
        ];
        expect($scope.eventTypes).toEqual(expectedEventTypes);
    });

    describe("can modify game events", function () {
        var expectedEvent;

        beforeEach(function () {
            spyOn(GameEvent, 'query').andReturn([]);
            expectedEvent = {name: 'event', gameUrl: 'raleigh-wars'};

            $controller('EditGameEventsController', dependencies);
        });

        it("by adding a event to the event array", function () {
            $scope.addEvent(expectedEvent);
            expect($scope.events.length).toBe(1);
            expect($scope.events).toContain(expectedEvent);
        });

        it("by setting a event as editable.", function () {
            $scope.editEvent(expectedEvent);
            expect($scope.event).toBe(expectedEvent);
        });

        describe("by saving a event", function () {
            beforeEach(function () {
                spyOn(event, '$save').andCallThrough();
            });

            afterEach(function () {
                expect(event.$save).toHaveBeenCalled();
            });

            it("and succeed", function () {
                spyOn($scope.saveEventForm, '$setPristine');
                $scope.saveEvent(event);

                expect($scope.saveEventNotifications.length).toBe(1);
                expect($scope.saveEventNotifications[0].type).toBe('success');
                expect($scope.event).toEqual({});
                expect($scope.saveEventForm.$setPristine).toHaveBeenCalled();
            });

            it("and error", function () {
                event.failed = true;
                $scope.saveEvent(event);
                expect($scope.saveEventNotifications.code).toBe(1000);
            });
        });

        describe("by removing a event", function () {
            beforeEach(function () {
                spyOn(event, '$delete').andCallThrough();
            });

            afterEach(function () {
                expect(event.$delete).toHaveBeenCalled();
            });

            it("and succeed", function () {
                $scope.events = [event];
                $scope.removeEvent(event);
                expect($scope.eventNotifications.length).toBe(1);
                expect($scope.eventNotifications[0].type).toBe('success');
            });

            it("and error", function () {
                event.failed = true;
                $scope.removeEvent(event);
                expect($scope.eventNotifications.code).toBe(1000);
            });
        });
    });
});
