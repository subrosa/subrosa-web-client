/**
 * @ngdoc controller
 * @name subrosa.components.chooser:ChooserDirectiveController
 *
 * @requires _
 * @requires $scope
 *
 * @description
 *  The controller for chooser directives.
 */
angular.module('subrosa.components.chooser').controller('ChooserDirectiveController', function (_, $scope) {
    var beforeEdit = {}, autoSelectDefault = true, removeItem;

    this.setAutoSelectDefault = function (autoselect) {
        autoSelectDefault = autoselect;
    };

    removeItem = function (itemToRemove) {
        $scope.items = _.reject($scope.items, function (item) {
            return item.id === itemToRemove.id;
        });
    };

    $scope.saving = false;

    $scope.selectItem = function (item) {
        $scope.selectedItem = item;
        $scope.onSelect({item: item});
    };

    $scope.newItem = function () {
        var newItem = {};
        $scope.selectedItem = newItem;
        $scope.editedItem = newItem;
        $scope.items.unshift(newItem);
    };

    $scope.editItem = function (item) {
        beforeEdit[item.id] = angular.copy(item);
        $scope.editedItem = item;
        $scope.onEdit({item: item});
    };

    $scope.cancelEditItem = function (cancelledItem) {
        if (cancelledItem.hasOwnProperty('id')) {
            $scope.items = _.map($scope.items, function (item) {
                return (item.id === cancelledItem.id) ? angular.copy(beforeEdit[cancelledItem.id]) : item;
            });
        } else {
            removeItem(cancelledItem);
        }
    };

    $scope.saveItem = function (item) {
        var success, error;

        success = function (response) {
            if (response && response.hasOwnProperty('id')) {
                item.id = response.id;
            }

            $scope.onSave({item: item});
            $scope.selectItem(item);
            $scope.saving = false;
        };

        error = function () {
            $scope.saving = false;
            $scope.onSaveError({item: item});
        };

        $scope.editedItem = item;
        $scope.saving = true;

        if ($scope.hasOwnProperty('saveResource')) {
            $scope.saveResource(item).$promise.then(success, error);
        } else {
            success();
        }
    };

    $scope.deleteItem = function (item) {
        var success, error;

        success = function () {
            removeItem(item);
            $scope.onDelete({item: item});
        };

        error = function () {
            $scope.onDeleteError({item: item});
        };

        item.saving = false;

        if ($scope.hasOwnProperty('deleteResource')) {
            $scope.deleteResource(item).$promise.then(success, error);
        } else {
            success();
        }
    };

    $scope.$watch('items', function (items) {
        var item;
        if (autoSelectDefault) {
            // Select default item if it's not set
            if (items && items.length > 0 && !$scope.selectedItem) {
                item = $scope.defaultItem || items[0];
                $scope.selectItem(item);
            } else {
                $scope.selectItem(null);
            }
        }
    });
});
