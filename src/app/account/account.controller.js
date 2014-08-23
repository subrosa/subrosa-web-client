/**
 * @ngdoc controller
 * @name subrosa.account.AccountController
 *
 * @requires $scope
 * @requires AuthService
 * @requires account
 *
 * @description
 *  Parent controller for account related functionality.
 */
angular.module('subrosa.account').controller('AccountController', function ($scope, AuthService, account) {
    var success, error;

    success = function () {
        $scope.saving = false;
    };

    error = function (response) {
        $scope.saving = false;
        $scope.notifications = response.data.notifications;
    };

    $scope.saveAccount = function () {
        $scope.account.$update(success, error);
    };

    AuthService.getCurrentUser().then(function (user) {
        $scope.account = account.get({id: user.id, expand: 'images,addresses'});
    });
});
