'use strict'

describe('GameFeedController', function() {
    var scope, MockGameFeedFactory;

    beforeEach(module('subrosa.game'));

    beforeEach(module(function($provide) {
        MockGameFeedFactory = {
            get: function () {
                return {
                    offset: 0,
                    limit: 10,
                    results: [
                        {postId: 123, content: "Why hello there!"},
                        {postId: 456, content: "HERRO!"}
                    ]
                };
            }
        };
        spyOn(MockGameFeedFactory, "get").andCallThrough();
        $provide.value('GameFeed', MockGameFeedFactory);
    }));

    beforeEach(inject(function($controller) {
        $controller('GameFeedController', {$scope: scope = {}});
    }));

    it('provides a default offset and limit.', function() {
        expect(scope.offset).toBe(0);
        expect(scope.limit).toBe(20);
    });

    it("gets the game's posts by calling the Game Feed Service.", function() {
        expect(MockGameFeedFactory.get).toHaveBeenCalled();
        expect(scope.posts).toEqual(MockGameFeedFactory.get());
    });
});

