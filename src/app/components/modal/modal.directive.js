/**
 * @ngdoc controller
 * @name subrosa.components.modal.ModalController
 *
 * @requires $scope
 * @requires $modalInstance
 * @requires ngModel
 *
 * @description
 *  Handle modal submission/dismissal
 */
angular.module('subrosa.components.modal').controller('ModalController', function ($scope, $modalInstance) {
    $scope.ok = function () {
        $modalInstance.close();
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});

/**
 * @ngdoc directive
 * @name subrosa.components.modal.directive:modal
 *
 * @requires $modal
 *
 * @description
 *   Provides a reusable wrapper around angular-ui's $modal service.
 */
angular.module('subrosa.components.modal').directive('modal', function ($modal) {
    return {
        replace: true,
        scope: {
            template: '@modal',
            action: '&modalAction'
        },
        link: function (scope) {
            var modalInstance;

            scope.openModal = function (modalScope) {
                modalInstance = $modal.open({
                    controller: 'ModalController',
                    scope: modalScope,
                    templateUrl: scope.template
                });

                modalInstance.result.then(function () {
                    scope.action();
                });
            };

            // TODO figure out some other way, this is likely bad practice.
            scope.$root.openModal = scope.openModal;
        }
    };
});