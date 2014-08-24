describe('Controller: EditGameEventsController', function () {
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
        $scope.game.name = 'Raleigh Wars';
        $scope.game.registrationStart = 33455092236;
        $scope.game.registrationEnd = 33455092336;
        $scope.game.gameStart = 33455093336;
        $scope.game.gameEnd = 33455103336;
        $scope.game.isDraft = function () {};
        $scope.game.url = 'raleigh-wars';
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
        const ONE_HOUR = 3600000, ONE_YEAR = 31556952000;
        expect($scope.options.eventMargin).toBe(10);
        expect($scope.options.minHeight).toBe(200);
        expect($scope.options.zoomMax).toBe(ONE_YEAR);
        expect($scope.options.zoomMin).toBe(ONE_HOUR);
    });

    it("sets the existing game events on the scope by getting them from the API", function () {
        spyOn(GameEvent, 'query').andCallThrough();

        $controller('EditGameEventsController', dependencies);

        expect(GameEvent.query).toHaveBeenCalledWith({gameUrl: 'raleigh-wars'}, jasmine.any(Function));
        expect($scope.events).toBe(GameEvent.query().results);
    });

    describe("responds to timeline event", function () {
        var expectedEvent, timeline, error = {
            data: {
                notifications: 'lalala'
            }
        };

        beforeEach(function () {
            expectedEvent = GameEvent.get({id: 1});
            timeline = {
                deleteItem: function () {},
                getIndex: function () {
                    return 1;
                },
                getModel: function () {
                    return expectedEvent;
                },
                getSelection: function () {}
            };
            timelineCache.get = function () {
                return timeline;
            };
        });

        describe("on event added", function () {
            it("by setting the event on the scope", function () {
                $scope.eventAdded(expectedEvent);
                expect($scope.event).toBe(expectedEvent);
            });

            describe("by opening an edit modal,", function () {
                beforeEach(function () {
                    spyOn(modalCache, 'openModal').andCallThrough();
                    spyOn(expectedEvent, '$save').andCallThrough();
                    spyOn(timeline, 'deleteItem');
                });

                afterEach(function () {
                    expect(modalCache.openModal).toHaveBeenCalledWith('gameEventModal', $scope);
                });

                it("saving the event on submit", function () {
                    $scope.eventAdded(expectedEvent);
                    expect(expectedEvent.$save).toHaveBeenCalledWith({gameUrl: 'raleigh-wars', id: 1},
                        jasmine.any(Function), jasmine.any(Function));
                    expect(timeline.deleteItem).not.toHaveBeenCalled();
                });

                it("not saving the event on cancel and removing the event from the timeline", function () {
                    spyOn(timelineCache, 'get').andCallThrough();
                    modalCache.cancel = true;

                    $scope.eventAdded(expectedEvent);

                    expect(expectedEvent.$save).not.toHaveBeenCalled();
                    expect(timeline.deleteItem).toHaveBeenCalledWith(1);
                });
            });
        });

        it("on change by saving the event and succeeding", function () {
            spyOn(expectedEvent, '$save').andCallThrough();
            GameEvent.setSuccessResponse({id: 2});

            $scope.eventChanged(expectedEvent);

            expect(expectedEvent.$save).toHaveBeenCalledWith({gameUrl: 'raleigh-wars', id: 1},
                jasmine.any(Function), jasmine.any(Function));
            expect(expectedEvent.id).toBe(2);
        });


        it("on change by saving the event and failing", function () {
            spyOn(expectedEvent, '$save').andCallThrough();
            GameEvent.setErrorResponse(error);

            expectedEvent.failed = true;
            $scope.eventChanged(expectedEvent);

            expect(expectedEvent.$save).toHaveBeenCalledWith({gameUrl: 'raleigh-wars', id: 1},
                jasmine.any(Function), jasmine.any(Function));
            expect($scope.notifications).toBe(error.data.notifications);
        });

        it("on delete by deleting the resource.", function () {
            spyOn(expectedEvent, '$delete');
            $scope.eventDeleted(expectedEvent);
            expect(expectedEvent.$delete).toHaveBeenCalled();
        });

        it("on edit by setting the event, opening an edit modal, and saving the event on close, if the event is editable", function () {
            spyOn(modalCache, 'openModal').andCallThrough();
            spyOn(expectedEvent, '$save').andCallThrough();

            expectedEvent.editable = true;

            $scope.eventEdited(expectedEvent);

            expect($scope.event).toBe(expectedEvent);
            expect(modalCache.openModal).toHaveBeenCalledWith('gameEventModal', $scope);
            expect(expectedEvent.$save).toHaveBeenCalledWith({gameUrl: 'raleigh-wars', id: 1},
                jasmine.any(Function), jasmine.any(Function));
        });

        it("on edit by doing nothing if event is editable", function () {
            spyOn(modalCache, 'openModal');

            angular.forEach([false, null, undefined, 'true', 'false'], function (test) {
                GameEvent.editable = test;
                $scope.eventEdited(expectedEvent);
            });

            expect(modalCache.openModal).not.toHaveBeenCalled();
        });
    });
});
