/**
 * @ngdoc controller
 * @name subrosa.game.GameFeedController
 *
 * @requires $scope
 * @requires post
 *
 * @description
 *  Controller for game feed related functionality.
 */
angular.module('subrosa.game').controller('GameFeedController', function ($scope, post) {
    var success, error;

    $scope.errors = null;
    $scope.post = new post();
    $scope.posts = post.query({gameUrl: $scope.$stateParams.gameUrl});

    success = function (data) {
        $scope.posts.results.unshift(data);
    };

    error = function (response) {
        $scope.notifications = response.data.notifications;
    };

    $scope.createPost = function () {
        $scope.post.$save({gameUrl: $scope.$stateParams.gameUrl}, success, error);
        $scope.post = new post();
    };
});
