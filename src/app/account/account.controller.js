/**
 * @ngdoc controller
 * @name subrosa.account.AccountController
 *
 * @requires $scope
 * @requires authService
 * @requires Account
 *
 * @description
 *  Parent controller for account related functionality.
 */
angular.module('subrosa.account').controller('AccountController', function ($scope, authService, Account) {
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

    authService.getCurrentUser().then(function (user) {
        $scope.account = Account.get({id: user.id, expansion: 'player'});
    });
});
