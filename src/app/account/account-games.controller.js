/**
 * @ngdoc controller
 * @name subrosa.account.AccountGamesController
 *
 * @requires $scope
 * @requires User
 *
 * @description
 *   Display games a user is participating in.
 */
angular.module('subrosa.account').controller('AccountGamesController', function ($scope, User) {
    $scope.games = User.games();
});
