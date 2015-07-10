describe('Controller: GameFeedController', function () {
    'use strict';

    var $scope, MockPostFactory;

    beforeEach(module('subrosa.game', 'mocks'));

    beforeEach(inject(function (_$q_, $controller, $rootScope, MockResource) {
        $scope = $rootScope.$new();
        $scope.$stateParams = {gameUrl: 'raleigh-wars'};
        MockPostFactory = MockResource.$new();

        spyOn(MockPostFactory, "query").and.callThrough();
        $controller('GameFeedController', {$scope: $scope, Post: MockPostFactory});
    }));

    it("gets the game's posts by calling the Game Feed Service.", function () {
        expect(MockPostFactory.query).toHaveBeenCalled();
        expect($scope.posts).toEqual(MockPostFactory.query());
        expect($scope.posts.results.length).toBe(1);
    });

    it("provides a way to create posts", function () {
        var postContent = 'lalala';
        $scope.post.content = postContent;

        $scope.createPost();

        expect($scope.posts.results.length).toBe(2);
        expect($scope.posts.results[0].content).toBe(postContent);
        expect($scope.post.content).toBe(undefined);
    });
});

