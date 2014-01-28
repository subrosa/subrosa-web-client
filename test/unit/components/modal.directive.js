describe('Directive: modal', function () {
    var $scope, $compile, $q, $modal, $modalInstance, controller, element, elementScope;

    beforeEach(module('subrosa'));

    beforeEach(module(function ($provide) {
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
            close: function () {},
            dismiss: function () {}
        };

        $provide.provider('$modal', $modal);
        $provide.provider('$modalInstance', $modalInstance);
    }));

    beforeEach(inject(function (_$compile_, _$rootScope_, $controller, _$q_) {
        $compile = _$compile_;
        $scope = _$rootScope_;
        controller = $controller('ModalController', {$scope: $scope,
            modelName: name, model: {}});
        $q = _$q_;
    }));

    beforeEach(function () {
        element = angular.element(
            '<span modal="someUrl.html" modal-action="delete()">' +
                '<p>Hello!</p>' +
            '</span>');

        $compile(element)($scope);
        $scope.$digest();

        $scope.delete = function () {};

        elementScope = element.scope();
    });

    it("can open a modal dialog", function () {
        spyOn($modal, 'open').andCallThrough();
        elementScope.openModal();
        expect($modal.open).toHaveBeenCalledWith({templateUrl: 'someUrl.html',
            controller: 'ModalController', resolve: jasmine.any(Object)});
    });

    it("executes the provided function when closed.", function () {
        spyOn($scope, 'delete');
        elementScope.openModal();

        $scope.ok();
        $scope.$digest();

        expect($scope.delete).toHaveBeenCalled();
    });

    describe("Controller: ModalController", function () {
        describe("can close the modal dialog", function () {
            beforeEach(function () {
                elementScope.openModal();
            });

            it("by clicking okay and executing the provided action", function () {
                spyOn($modalInstance, 'close');
                $scope.ok();
                expect($modalInstance.close).toHaveBeenCalled();
            });

            it("by clicking cancel and not executing the provided action", function () {
                spyOn($modalInstance, 'dismiss').andCallThrough();
                $scope.cancel();
                expect($modalInstance.dismiss).toHaveBeenCalledWith('cancel');
            });
        });
    });
});