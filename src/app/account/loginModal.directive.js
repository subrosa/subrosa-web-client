/**
 * @ngdoc controller
 * @name subrosa.account.LoginModalController
 *
 * @requires $rootScope
 * @requires $scope
 * @requires $state
 * @requires $modalInstance
 * @requires AuthService
 * @requires user (resolved user if provided to modal)
 *
 * @description
 *  Handle submission of the login form.
 */
angular.module('subrosa.account').controller('LoginModalController',
function ($rootScope, $scope, $state, $modalInstance, AuthService, user) {
    var success, error;

    $scope.user = user || {};

    $scope.errors = {
        authError: false,
        unknownError: false
    };

    success = function () {
        $modalInstance.close();
    };

    error = function (data) {
        if (data.status === 401) {
            $scope.errors.authError = true;
        } else {
            $scope.errors.unknownError = true;
        }
    };

    $scope.login = function () {
        AuthService.login($scope.user).then(success, error);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    $scope.goToRegister = function () {
        $modalInstance.dismiss('cancel');
        $state.transitionTo('register').then(function () {
            $rootScope.$broadcast('toRegisterFromLogin', $scope.user);
        });
    };

});

/**
 * @ngdoc directive
 * @name subrosa.account:loginModal
 *
 * @requires $modal
 *
 * @description
 *   Provides a login modal window.
 */
angular.module('subrosa.account').directive('loginModal', function ($modal) {
    return {
        replace: true,
        link: function (scope) {
            scope.openModal = function (user) {
                return $modal.open({
                    controller: 'LoginModalController',
                    templateUrl: '/app/account/views/login-modal.html',
                    resolve: {
                        user: function () {
                            return user;
                        }
                    }
                });
            };

            // Open the modal when login is required
            scope.$on('auth-loginRequired', function (event, user) {
                scope.openModal(user);
            });
        }
    };
});
