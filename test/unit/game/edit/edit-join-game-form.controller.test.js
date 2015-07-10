describe('Controller: EditJoinGameFormController', function () {
    'use strict';

    var $controller, dependencies, $scope, Address, Image;

    beforeEach(module('subrosa.game', 'mocks'));

    beforeEach(inject(function (_$controller_, $rootScope, MockResource) {
        var i18n = function (string) {
            return string;
        };

        $controller = _$controller_;
        $scope = $rootScope.$new();
        $scope.game = MockResource.$new().get({id: 1});
        $scope.game.playerInfo = [];
        $scope.saveFieldForm = {$setPristine: function () {}};

        Address = MockResource.$new();
        Image = MockResource.$new();

        dependencies = {
            $scope: $scope,
            i18n: i18n,
            Address: Address,
            Image: Image
        };

        $controller('EditJoinGameFormController', dependencies);
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
            spyOn($scope.game, '$update').and.callThrough();
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

            expect($scope.fieldNotifications.length).toBe(1);
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
                spyOn($scope.game, '$update').and.callThrough();
            });

            afterEach(function () {
                expect($scope.game.$update).toHaveBeenCalled();
            });

            it("and succeed", function () {
                spyOn($scope.saveFieldForm, '$setPristine');
                $scope.saveField('field');

                expect($scope.saveFieldNotifications.length).toBe(1);
                expect($scope.saveFieldNotifications[0].type).toBe('success');
                expect($scope.field).toEqual({});
                expect($scope.saveFieldForm.$setPristine).toHaveBeenCalled();
            });

            it("and error", function () {
                $scope.game.failed = true;
                $scope.saveField();
                expect($scope.saveFieldNotifications.length).toBe(1);
            });
        });

        describe("by removing a field", function () {
            beforeEach(function () {
                spyOn($scope.game, '$update').and.callThrough();
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
                expect($scope.fieldNotifications.length).toBe(1);
            });
        });
    });

    it("sets the current user's addresses on the $scope", function () {
        var addresss = [1, 2, 3];
        Address.setSuccessResponse({results: addresss});
        spyOn(Address, 'query').and.callThrough();

        $controller('EditJoinGameFormController', dependencies);

        expect(Address.query).toHaveBeenCalled();
        expect($scope.addresses).toBe(addresss);
    });

    it("sets the current user's images on the $scope", function () {
        var images = [1, 2, 3];
        Image.setSuccessResponse({results: images});
        spyOn(Image, 'query').and.callThrough();

        $controller('EditJoinGameFormController', dependencies);

        expect(Image.query).toHaveBeenCalled();
        expect($scope.images).toBe(images);
    });
});
