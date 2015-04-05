/**
 * @ngdoc directive
 * @name subrosa.auth:loginModal
 *
 * @requires $modal
 *
 * @description
 *   Provides a login modal window.
 */
angular.module('subrosa.auth').directive('loginModal', function ($modal) {
    return {
        restrict: 'AE',
        scope: true,
        link: function (scope) {
            scope.openModal = function (user) {
                return $modal.open({
                    controller: 'LoginModalController',
                    templateUrl: '/app/auth/views/login-modal.html',
                    resolve: {
                        user: function () {
                            return user;
                        }
                    }
                });
            };

            // Open the modal when login is required
            scope.$on('auth-loginRequired', function (event, user, options) {
                if (options && options.loginViaRegisterFailed) {
                    user.loginViaRegisterFailed = true;
                }
                scope.openModal(user);
            });
        }
    };
});
