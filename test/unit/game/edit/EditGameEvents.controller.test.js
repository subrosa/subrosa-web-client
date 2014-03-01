describe('Controller: EditGameEvents', function () {
    var $controller, $scope, modalCache, timelineCache, dependencies, GameEvent;
    beforeEach(module('subrosa.game', 'mocks'));

    beforeEach(inject(function ($q, _$controller_, $rootScope, MockResource) {
        var resource = MockResource.$new();

        $controller = _$controller_;
        $scope = $rootScope.$new();

        modalCache = {
            cache: this,
            cancel: false,
            openModal: function () {
                return {
                    result: {
                        then: function (success, error) {
                            if (modalCache.cancel) {
                                error();
                            } else {
                                success();
                            }
                        }
                    }
                };
            }
        };

        timelineCache = {
            get: function () {}
        };

        GameEvent = resource;

        $scope.game = resource.get({id: 1});
        $scope.game.registrationStart = 33455092236;
        $scope.game.registrationEnd = 33455092336;
        $scope.game.gameEnd = 33455093336;
        $scope.game.gameEnd = 33455103336;
        $scope.$stateParams = {gameUrl: 'raleigh-wars'};

        dependencies = {
            $scope: $scope,
            modalCache: modalCache,
            timelineCache: timelineCache,
            GameEvent: GameEvent
        };
        $controller('EditGameEventsController', dependencies);
    }));

    it("sets up default timeline options", function () {
        var oneDay = 86400000,
            oneHour = 3600000,
            max = $scope.game.gameEnd + oneDay,
            min = $scope.game.registrationStart || $scope.game.gameStart - oneDay;

        expect($scope.options.eventMargin).toBe(10);
        expect($scope.options.min).toBe(min);
        expect($scope.options.max).toBe(max);
        expect($scope.options.zoomMax).toBe(max - min);
        expect($scope.options.zoomMin).toBe(oneHour);
    });

    it("sets the existing game events on the scope by getting them from the API", function () {
        spyOn(GameEvent, 'query').andCallThrough();

        $controller('EditGameEventsController', dependencies);

        expect(GameEvent.query).toHaveBeenCalledWith({gameUrl: 'raleigh-wars'}, jasmine.any(Function));
        expect($scope.events).toBe(GameEvent.query().results);
    });

    describe("responds to timeline event", function () {
        var gameEvent, timeline, error = {
            data: {
                notifications: 'lalala'
            }
        };

        beforeEach(function () {
            gameEvent = GameEvent.get({id: 1});
            timeline = {
                deleteItem: function () {},
                getIndex: function () {
                    return 1;
                },
                getModel: function () {
                    return gameEvent;
                },
                getSelection: function () {}
            };
            timelineCache.get = function () {
                return timeline;
            };
        });

        describe("on event added", function () {
            it("by setting the event on the scope", function () {
                $scope.eventAdded(gameEvent);
                expect($scope.event).toBe(gameEvent);
            });

            describe("by opening an edit modal,", function () {
                beforeEach(function () {
                    spyOn(modalCache, 'openModal').andCallThrough();
                    spyOn(gameEvent, '$save').andCallThrough();
                    spyOn(timeline, 'deleteItem');
                });

                afterEach(function () {
                    expect(modalCache.openModal).toHaveBeenCalledWith('gameEventModal', $scope);
                });

                it("saving the event on submit", function () {
                    $scope.eventAdded(gameEvent);
                    expect(gameEvent.$save).toHaveBeenCalledWith({gameUrl: 'raleigh-wars', id: 1},
                        jasmine.any(Function), jasmine.any(Function));
                    expect(timeline.deleteItem).not.toHaveBeenCalled();
                });

                it("not saving the event on cancel and removing the event from the timeline", function () {
                    spyOn(timelineCache, 'get').andCallThrough();
                    modalCache.cancel = true;

                    $scope.eventAdded(gameEvent);

                    expect(gameEvent.$save).not.toHaveBeenCalled();
                    expect(timeline.deleteItem).toHaveBeenCalledWith(1);
                });
            });
        });

        it("on change by saving the event and succeeding", function () {
            spyOn(gameEvent, '$save').andCallThrough();
            GameEvent.setSuccessResponse({id: 2});

            $scope.eventChanged(gameEvent);

            expect(gameEvent.$save).toHaveBeenCalledWith({gameUrl: 'raleigh-wars', id: 1},
                jasmine.any(Function), jasmine.any(Function));
            expect(gameEvent.id).toBe(2);
        });


        it("on change by saving the event and failing", function () {
            spyOn(gameEvent, '$save').andCallThrough();
            GameEvent.setErrorResponse(error);

            gameEvent.failed = true;
            $scope.eventChanged(gameEvent);

            expect(gameEvent.$save).toHaveBeenCalledWith({gameUrl: 'raleigh-wars', id: 1},
                jasmine.any(Function), jasmine.any(Function));
            expect($scope.notifications).toBe(error.data.notifications);
        });

        it("on delete by deleting the resource.", function () {
            spyOn(gameEvent, '$delete');
            $scope.eventDeleted(gameEvent);
            expect(gameEvent.$delete).toHaveBeenCalled();
        });

        it("on edit by setting the event, opening an edit modal, and saving the event on close, if the event is editable", function () {
            spyOn(modalCache, 'openModal').andCallThrough();
            spyOn(gameEvent, '$save').andCallThrough();

            gameEvent.editable = true;

            $scope.eventEdited(gameEvent);

            expect($scope.event).toBe(gameEvent);
            expect(modalCache.openModal).toHaveBeenCalledWith('gameEventModal', $scope);
            expect(gameEvent.$save).toHaveBeenCalledWith({gameUrl: 'raleigh-wars', id: 1},
                jasmine.any(Function), jasmine.any(Function));
        });

        it("on edit by doing nothing if event is editable", function () {
            spyOn(modalCache, 'openModal');

            angular.forEach([false, null, undefined, 'true', 'false'], function (test) {
                gameEvent.editable = test;
                $scope.eventEdited(gameEvent);
            });

            expect(modalCache.openModal).not.toHaveBeenCalled();
        });
    });
});