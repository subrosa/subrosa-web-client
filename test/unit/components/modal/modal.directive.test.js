describe('Directive: modal', function () {
    var $scope, $compile, $q, $modal, $modalInstance, item, element, elementScope;

    beforeEach(module('subrosa.components.modal'));

    beforeEach(module(function ($provide) {
        item = {
            'remove': function () {}
        };

        $modal = {
            success: true,
            $get: function () {
                return this;
            },
            open: function () {
                var deferred = $q.defer();
                if (this.success) {
                    deferred.resolve({});
                } else {
                    deferred.reject({});
                }
                return {
                    result: deferred.promise
                };
            }
        };

        $modalInstance = {
            $get: function () {
                return this;
            },
            close: function () {
                var deferred = $q.defer();
                deferred.resolve({});
                return {
                    result: deferred.promise
                };
            },
            dismiss: function () {}
        };

        $provide.provider('$modal', $modal);
        $provide.provider('$modalInstance', $modalInstance);
    }));

    beforeEach(inject(function (_$compile_, _$rootScope_, _$q_) {
        $compile = _$compile_;
        $scope = _$rootScope_;
        $q = _$q_;
    }));

    beforeEach(function () {
        element = angular.element(
            '<span modal="someUrl.html" modal-action="item.remove(item)">' +
                '<p>Hello!</p></span>');

        $compile(element)($scope);
        $scope.$digest();

        elementScope = element.scope();
    });

    it("can open a modal dialog", function () {
        spyOn($modal, 'open').andCallThrough();
        elementScope.openModal();
        expect($modal.open).toHaveBeenCalledWith({templateUrl: 'someUrl.html', controller: 'ModalController'});
    });

    describe("Controller: ModalController", function () {
        var controller;

        beforeEach(inject(function (_$rootScope_, $controller) {
            $scope = _$rootScope_;
            $scope.item = item;
            controller = $controller('ModalController', {$scope: $scope, $modalInstance: $modalInstance});
        }));

        describe("can close the modal dialog", function () {
            it("by clicking okay and executing the provided action", function () {
                spyOn(item, 'remove');
                spyOn($modalInstance, 'close').andCallThrough();

                elementScope.openModal();
                $scope.ok();
                $scope.$digest();

                expect($modalInstance.close).toHaveBeenCalled();
                expect(item.remove).toHaveBeenCalled();
            });

            it("by clicking cancel and not executing the provided action", function () {
                spyOn(item, 'remove');
                spyOn($modalInstance, 'dismiss');

                $modal.success = false;
                elementScope.openModal();

                $scope.cancel();
                $scope.$digest();

                expect($modalInstance.dismiss).toHaveBeenCalledWith('cancel');
                expect(item.remove).not.toHaveBeenCalled();
            });
        });
    });
});