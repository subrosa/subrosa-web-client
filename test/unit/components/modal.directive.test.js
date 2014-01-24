describe('Directive: modal', function () {
    var $scope, $compile, $q, $modal, $modalInstance, item, element, elementScope;

    beforeEach(module('subrosa'));

    beforeEach(module(function ($provide) {
        item = {
            'delete': function () {}
        };

        $modal = {
            $get: function () {
                return this;
            },
            open: function () {
                var deferred = $q.defer();
                deferred.resolve({});
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
            '<span modal="someUrl.html" modal-action="item.delete(item)">' +
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
            controller = $controller('ModalController', {$scope: $scope, $modalInstance: $modalInstance});
        }));

        describe("can close the modal dialog", function () {
            beforeEach(function () {
                elementScope.openModal();
            });

            // TODO get this working or remove
//            it("by clicking okay and executing the provided action", function () {
//                spyOn(item, 'delete');
//                spyOn($modalInstance, 'close').andCallThrough();
//
//                $scope.ok();
//
//                expect($modalInstance.close).toHaveBeenCalled();
//                expect(item.delete).toHaveBeenCalled();
//            });

            it("by clicking cancel and not executing the provided action", function () {
                spyOn(item, 'delete');
                spyOn($modalInstance, 'dismiss');

                $scope.cancel();

                expect($modalInstance.dismiss).toHaveBeenCalledWith('cancel');
                expect(item.delete).not.toHaveBeenCalled();
            });
        });
    });
});