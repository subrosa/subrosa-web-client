describe('Directive: modal', function () {
    var $scope, $compile, linksTimeline, timelineCache, timeline, element;

    beforeEach(module('subrosa.components.timeline'));

    beforeEach(module(function ($provide) {
        timeline = {
            draw: function () {},
            setData: function () {},
            setSelection: function () {},
            setVisibleChartRangeAuto: function () {}
        };

        linksTimeline = {
            events: {
                addListener: function () {}
            },
            Timeline: function () {
                return timeline;
            }
        };

        timelineCache = {
            put: function () {}
        };

        $provide.constant('linksTimeline', linksTimeline);
        $provide.value('timelineCache', timelineCache);
    }));

    beforeEach(inject(function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $scope = _$rootScope_;
    }));

    beforeEach(function () {
        element = angular.element(
            '<div timeline="myTimeline" ' +
                 'timeline-data="data"' +
                 'timeline-options="options" ' +
                 'timeline-selection="selectedEvent" ' +
                 'timeline-on-add="added(selection)" ' +
                 'timeline-on-select="selected(selection)" ' +
                 'timeline-on-change="changed(selection)" ' +
                 'timeline-on-delete="deleted(selection)" ' +
                 'timeline-on-edit="edited(selection)">' +
            '</div>'
        );
    });

    it("sets up some default timeline options", function () {
        $compile(element)($scope);
        $scope.$digest();

        expect($scope.options.locale).toBe('en');
        expect($scope.options.showCurrentTime).toBe(true);
        expect($scope.options.showCustomTime).toBe(true);
        expect($scope.options.showNavigation).toBe(true);
    });

    it("puts the timeline in the timelineCache", function () {
        spyOn(timelineCache, 'put');

        $compile(element)($scope);
        $scope.$digest();

        expect(timelineCache.put).toHaveBeenCalledWith('myTimeline', timeline);
    });

    describe("sets up a listener", function () {
        var expectedSelection, elementScope, events = {};
        
        beforeEach(function () {
            expectedSelection = {event: 'yoyoyo'};

            linksTimeline.events.addListener = function (timeline, event, success) {
                events[event] = success;
            };

            timeline.getSelection = function () {
                return expectedSelection;
            };

            spyOn(linksTimeline.events, 'addListener').andCallThrough();
            spyOn(timeline, 'getSelection').andCallThrough();

            $compile(element)($scope);
            $scope.$digest();

            $scope.added = $scope.selected = $scope.changed =
                $scope.deleted = $scope.edited = function () {};

            elementScope = element.isolateScope();
        });

        it("for the add event and calls the onAdd listener", function () {
            expect(linksTimeline.events.addListener).toHaveBeenCalledWith(timeline, 'add', jasmine.any(Function));
            
            spyOn(elementScope, 'onAdd').andCallThrough();
            spyOn($scope, 'added');

            events.add();

            expect(timeline.getSelection).toHaveBeenCalled();
            expect(elementScope.onAdd).toHaveBeenCalledWith({selection: expectedSelection});
            expect($scope.added).toHaveBeenCalledWith(expectedSelection);
        });

        it("for the changed event and calls the onChange listener.", function () {
            expect(linksTimeline.events.addListener).toHaveBeenCalledWith(timeline, 'changed', jasmine.any(Function));

            spyOn(elementScope, 'onChange').andCallThrough();
            spyOn($scope, 'changed');

            events.changed();

            expect(timeline.getSelection).toHaveBeenCalled();
            expect(elementScope.onChange).toHaveBeenCalledWith({selection: expectedSelection});
            expect($scope.changed).toHaveBeenCalledWith(expectedSelection);
        });

        it("for the delete event and calls the onDelete listener.", function () {
            expect(linksTimeline.events.addListener).toHaveBeenCalledWith(timeline, 'delete', jasmine.any(Function));

            spyOn(elementScope, 'onDelete').andCallThrough();
            spyOn($scope, 'deleted');

            events['delete']();

            expect(timeline.getSelection).toHaveBeenCalled();
            expect(elementScope.onDelete).toHaveBeenCalledWith({selection: expectedSelection});
            expect($scope.deleted).toHaveBeenCalledWith(expectedSelection);
        });

        it("for the edit event and calls the onEdit listener.", function () {
            expect(linksTimeline.events.addListener).toHaveBeenCalledWith(timeline, 'edit', jasmine.any(Function));

            spyOn(elementScope, 'onEdit').andCallThrough();
            spyOn($scope, 'edited');

            events.edit();

            expect(timeline.getSelection).toHaveBeenCalled();
            expect(elementScope.onEdit).toHaveBeenCalledWith({selection: expectedSelection});
            expect($scope.edited).toHaveBeenCalledWith(expectedSelection);
        });

        it("for the select event and calls the onSelect listener.", function () {
            expect(linksTimeline.events.addListener).toHaveBeenCalledWith(timeline, 'select', jasmine.any(Function));

            spyOn(elementScope, 'onSelect').andCallThrough();
            spyOn($scope, 'selected');

            events.select();

            expect(timeline.getSelection).toHaveBeenCalled();
            expect(elementScope.onSelect).toHaveBeenCalledWith({selection: expectedSelection});
            expect($scope.selected).toHaveBeenCalledWith(expectedSelection);
        });
    });

    describe("sets up a watcher", function () {
        beforeEach(function () {
            $scope.data = null;
            $scope.options = {};

            $compile(element)($scope);
            $scope.$digest();
        });

        it("on the model and updates the data and sets the visible range", function () {
            spyOn(timeline, 'setData');
            spyOn(timeline, 'setVisibleChartRangeAuto');

            $scope.data = 'heyhey';
            $scope.$digest();

            expect(timeline.setData).toHaveBeenCalledWith('heyhey');
            expect(timeline.setVisibleChartRangeAuto).toHaveBeenCalled();
        });

        it("on the options and redraws the map", function () {
            spyOn(timeline, 'draw');

            $scope.options = {blah: 'blah'};
            $scope.$digest();

            expect(timeline.draw).toHaveBeenCalledWith($scope.data, $scope.options);
        });
    });

});