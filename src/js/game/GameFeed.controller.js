/*global angular */
'use strict';

/*
 * Display the game feed.
 */
angular.module('subrosa.game').controller('GameFeedController', function($scope, GameFeed) {
    $scope.offset = 0;
    $scope.limit = 20;
    $scope.posts = GameFeed.get({offset: $scope.offset, limit: $scope.limit});
});