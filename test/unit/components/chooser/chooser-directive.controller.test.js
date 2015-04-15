describe('Controller: ChooserDirectiveController', function () {
    var $scope, item, resource;

    beforeEach(module('subrosa.components.chooser', 'mocks'));

    beforeEach(inject(function ($q, $controller, $rootScope, MockResource) {
        var nop = function () {};

        $scope = $rootScope.$new();
        resource = MockResource.$new();

        $scope.items = [{id: 1}, {id: 3}, {id: 2}];
        $scope.onSelect = nop;
        $scope.onEdit = nop;
        $scope.onDelete = nop;
        $scope.onDeleteError = nop;
        $scope.onSave = nop;
        $scope.onSaveError = nop;

        item = $scope.items[1];

        $controller('ChooserDirectiveController', {$scope: $scope});
    }));

    it("allows the selection of an item", function () {
        spyOn($scope, 'onSelect');

        $scope.selectItem(item);
        expect($scope.selectedItem).toBe(item);
        expect($scope.onSelect).toHaveBeenCalledWith({item: item});
    });

    it("allows the creation of a new item", function () {
        spyOn($scope, 'editItem');
        $scope.newItem();
        expect($scope.editItem).toHaveBeenCalledWith({});
    });

    it("allows the editing of an item", function () {
        spyOn($scope, 'onEdit');

        $scope.editItem(item);
        expect(item.edit).toBe(true);
        expect($scope.onEdit).toHaveBeenCalledWith({item: item});
    });
    
    describe("allows the cancelling of editing an item", function () {
        it("and restores the previous value existing items", function () {
            $scope.editItem(item);
            item.value = 'blah';

            $scope.cancelEditItem(item);

            expect($scope.items[1].value).toBe(undefined);
        });

        it("and removes new items", function () {
            $scope.newItem();

            $scope.cancelEditItem($scope.selectedItem);

            expect($scope.items.length).toBe(3);
            expect(_.contains($scope.items, $scope.selectedItem)).toBe(false);
        });
    });

    describe("allows the saving of items", function () {
        beforeEach(function () {
            spyOn($scope, 'onSave');
            spyOn($scope, 'onSaveError');
        });

        afterEach(function () {
            expect(item.edit).toBe(true);
            expect($scope.saving).toBe(false);
        });

        describe("with a resource", function () {
            it("and succeed", function () {
                $scope.saveResource = resource;

                $scope.saveItem(item);

                expect($scope.onSaveError).not.toHaveBeenCalled();
                expect($scope.onSave).toHaveBeenCalledWith({item: item});
            });

            it("and fail", function () {
                resource.setErrorResponse();
                $scope.saveResource = resource;

                $scope.saveItem(item);

                expect($scope.onSave).not.toHaveBeenCalled();
                expect($scope.onSaveError).toHaveBeenCalledWith({item: item});
            });
        });

        it("without a resource", function () {
            $scope.saveItem(item);
            expect($scope.onSave).toHaveBeenCalledWith({item: item});
            expect($scope.saving).toBe(false);
        });
    });

    describe("allows the deletion of items", function () {
        beforeEach(function () {
            spyOn($scope, 'onDelete');
            spyOn($scope, 'onDeleteError');
        });

        afterEach(function () {
            expect(item.edit).toBe(false);
            expect($scope.saving).toBe(false);
        });

        describe("with a resource", function () {
            it("and succeed", function () {
                $scope.deleteResource = resource;

                $scope.deleteItem(item);

                expect($scope.items.length).toBe(2);
                expect(_.contains($scope.items, item)).toBe(false);
                expect($scope.onDeleteError).not.toHaveBeenCalled();
                expect($scope.onDelete).toHaveBeenCalledWith({item: item});
            });

            it("and fail", function () {
                resource.setErrorResponse();
                $scope.deleteResource = resource;

                $scope.deleteItem(item);

                expect($scope.onDelete).not.toHaveBeenCalled();
                expect($scope.onDeleteError).toHaveBeenCalledWith({item: item});
            });
        });

        it("without a resource", function () {
            $scope.deleteItem(item);
            expect($scope.onDelete).toHaveBeenCalledWith({item: item});
            expect(item.edit).toBe(false);
        });
    });
});
