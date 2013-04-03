'use strict'

describe('GameFeedController', function() {
    var scope;

    var MockPostService;
    beforeEach(module(function($provide) {
        MockPostService = {
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
        spyOn(MockPostService, "get").andCallThrough();
        $provide.value('Posts', MockPostService);
    }));

    beforeEach(inject(function($controller) {
        $controller('GameFeedController', {$scope: scope = {}});
    }));

    it('provides a default offset and limit.', function() {
        expect(scope.offset).toBe(0);
        expect(scope.limit).toBe(20);
    });

    it("gets the game's posts by calling the Post Service.", function() {
        expect(MockPostService.get).toHaveBeenCalled();
        expect(scope.posts).toEqual(MockPostService.get());
    });
});

