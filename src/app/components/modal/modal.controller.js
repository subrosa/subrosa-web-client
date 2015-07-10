/**
 * @ngdoc controller
 * @name subrosa.components.modal:ModalController
 *
 * @requires $scope
 * @requires $modalInstance
 *
 * @description
 *  Handle modal submission/dismissal
 */
angular.module('subrosa.components.modal').controller('ModalController', function ($scope, $modalInstance) {
    'use strict';

    $scope.ok = function () {
        $modalInstance.close();
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});
