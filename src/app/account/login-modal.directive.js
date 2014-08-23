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
