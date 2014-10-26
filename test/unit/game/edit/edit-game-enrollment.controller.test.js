describe('Controller: EditGameEnrollment', function () {
    var $controller, $scope;

    beforeEach(module('subrosa.game', 'mocks'));

    beforeEach(inject(function (_$controller_, $rootScope, MockResource) {
        var i18n = function (string) {
            return string;
        };

        $controller = _$controller_;
        $scope = $rootScope.$new();
        $scope.game = MockResource.$new().get({id: 1});
        $scope.game.playerInfo = [];
        $scope.addFieldForm = {$setPristine: function () {}};

        $controller('EditGameEnrollmentController', {$scope: $scope, i18n: i18n});
    }));

    it("sets up the default field object", function () {
        expect($scope.field).toEqual(jasmine.any(Object));
    });

    it("sets up the default field types", function () {
        var expectedFieldTypes = [
            {type: 'address', label: 'Address'},
            {type: 'image', label: 'Image'},
            {type: 'text', label: 'Text'}
        ];
        expect($scope.fieldTypes).toEqual(expectedFieldTypes);
    });

    describe("updates the game on the order changed ng-sortable event", function () {
        beforeEach(function () {
            spyOn($scope.game, '$update').andCallThrough();
        });

        afterEach(function () {
            expect($scope.game.$update).toHaveBeenCalled();
        });

        it("and succeeds", function () {
            $scope.dragControlListeners.orderChanged();
            expect($scope.fieldNotifications.length).toBe(1);
            expect($scope.fieldNotifications[0].type).toBe('success');
        });

        it("and error", function () {
            var event = {
                dest: {
                    index: 2,
                    sortableScope: {
                        removeItem: function () {}
                    }
                },
                source: {
                    index: 1,
                    itemScope: {
                        task: 'lalala',
                        sortableScope: {
                            insertItem: function () {}
                        }
                    }
                }
            };
            spyOn(event.dest.sortableScope, 'removeItem');
            spyOn(event.source.itemScope.sortableScope, 'insertItem');
            $scope.game.failed = true;

            $scope.dragControlListeners.orderChanged(event);

            expect($scope.fieldNotifications.code).toBe(1000);
            expect(event.dest.sortableScope.removeItem).toHaveBeenCalledWith(event.dest.index);
            expect(event.source.itemScope.sortableScope.insertItem).toHaveBeenCalledWith(event.source.index,
                event.source.itemScope.task);
        });
    });

    describe("can modify required game information", function () {
        var expectedField;

        beforeEach(function () {
            expectedField = 'field';
        });

        it("by adding a field to the game's playerInfo array", function () {
            $scope.addField(expectedField);

            expect($scope.game.playerInfo.length).toBe(1);
            expect($scope.game.playerInfo).toContain(expectedField);
        });

        it("by setting a field as editable.", function () {
            $scope.editField(expectedField);
            expect($scope.field).toBe(expectedField);
        });

        describe("by saving a field", function () {

            beforeEach(function () {
                spyOn($scope.game, '$update').andCallThrough();
            });

            it("and succeed", function () {
                spyOn($scope.addFieldForm, '$setPristine');
                $scope.saveField('field');

                expect($scope.saveFieldNotifications.length).toBe(1);
                expect($scope.saveFieldNotifications[0].type).toBe('success');
                expect($scope.field).toEqual({});
                expect($scope.addFieldForm.$setPristine).toHaveBeenCalled();
            });

            it("and error", function () {
                $scope.game.failed = true;
                $scope.saveField();
                expect($scope.game.$update).toHaveBeenCalled();
                expect($scope.saveFieldNotifications.code).toBe(1000);
            });
        });

        describe("by removing a field", function () {
            beforeEach(function () {
                spyOn($scope.game, '$update').andCallThrough();
            });

            afterEach(function () {
                expect($scope.game.$update).toHaveBeenCalled();
            });

            it("and succeed", function () {
                $scope.game.playerInfo = ['field'];
                $scope.removeField('field');
                expect($scope.fieldNotifications.length).toBe(1);
                expect($scope.fieldNotifications[0].type).toBe('success');
            });

            it("and error", function () {
                $scope.game.failed = true;
                $scope.removeField();
                expect($scope.fieldNotifications.code).toBe(1000);
            });
        });
    });
});
