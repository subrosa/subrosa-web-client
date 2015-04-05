/**
 * @ngdoc controller
 * @name subrosa.account.AccountController
 *
 * @requires $scope
 *
 * @description
 *  Parent controller for account related functionality.
 */
angular.module('subrosa.account').controller('AccountController', function ($scope) {
    $scope.account = $scope.currentUser;

    $scope.updateAccount = function () {
        var success, error;

        success = function () {
            $scope.saving = false;
        };

        error = function (response) {
            $scope.saving = false;
            $scope.notifications = response.data.notifications;
        };

        $scope.account.$update(success, error);
    };
});
