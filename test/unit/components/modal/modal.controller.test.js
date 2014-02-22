describe("Controller: ModalController", function () {
    var $q, $scope, $modalInstance;

    beforeEach(module('subrosa.components.modal'));

    beforeEach(module(function ($provide) {
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

        $provide.provider('$modalInstance', $modalInstance);
    }));

    beforeEach(inject(function (_$q_, _$rootScope_, $controller) {
        $q = _$q_;
        $scope = _$rootScope_;
        $controller('ModalController', {$scope: $scope, $modalInstance: $modalInstance});
    }));

    describe("can close the modal dialog", function () {
        it("by clicking okay", function () {
            spyOn($modalInstance, 'close').andCallThrough();

            $scope.ok();

            expect($modalInstance.close).toHaveBeenCalled();
        });

        it("by clicking cancel", function () {
            spyOn($modalInstance, 'dismiss');

            $scope.cancel();

            expect($modalInstance.dismiss).toHaveBeenCalledWith('cancel');
        });
    });
});