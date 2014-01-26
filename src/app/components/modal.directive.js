/**
 * @ngdoc directive
 * @name subrosa.components:modal
 * @restrict A
 *
 * @requires $modal
 * @requires $modalInstance
 * @requires modelName
 * @requires model
 *
 * @description
 *   Provides a wrapper around angular-ui's modal dialog service.
 */
angular.module('subrosa.components')
    .controller('ModalController', function ($scope, $modalInstance, modelName, model) {
        $scope[modelName] = model;

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
                action: '&modalAction',
                modelName: '@model',
                model: '='
            },
            link: function (scope) {
                var modalInstance;

                scope.openModal = function () {
                    modalInstance = $modal.open({
                        controller: 'ModalController',
                        templateUrl: scope.template,
                        resolve: {
                            modelName: function () {
                                return scope.modelName;
                            },
                            model: function () {
                                return scope.model;
                            }
                        }
                    });

                    modalInstance.result.then(function () {
                        scope.action();
                    });
                };

                scope.$parent.openModal = scope.openModal;
            }
        };
    });
