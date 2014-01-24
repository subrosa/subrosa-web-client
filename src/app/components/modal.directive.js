/**
 * @ngdoc directive
 * @name subrosa.components:modal
 * @restrict A
 *
 * @requires $modal
 *
 * @description
 *   Provides a wrapper around angular-ui's modal dialog service.
 */
angular.module('subrosa.components')
    .controller('ModalController', function ($scope, $modalInstance) {
        $scope.ok = function () {
            $modalInstance.close();
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    })
    .directive('modal', function ($modal) {
        return {
            replace: true,
            scope: {
                template: '@modal',
                action: '&modalAction'
            },
            link: function (scope) {
                var modalInstance;

                scope.openModal = function () {
                    modalInstance = $modal.open({
                        controller: 'ModalController',
                        templateUrl: scope.template
                    });

                    // TODO get this working or remove
//                    modalInstance.result.then(function () {
//                        scope.action();
//                    });
                };

                scope.$parent.openModal = scope.openModal;
            }
        };
    });
