describe('Factory: GameFeed', function () {
    var gameFeedFactory, $httpBackend, posts;

    beforeEach(module('subrosa.game'));

    beforeEach(function () {
        posts = {
            offset: 0,
            limit: 10,
            results: [
                {postId: 123, content: "Why hello there!"},
                {postId: 456, content: "Hi!"}
            ]
        };

        inject(function ($injector) {
            $httpBackend = $injector.get('$httpBackend');
            gameFeedFactory = $injector.get('GameFeed');
        });
    });

    afterEach(function () {
        $httpBackend.flush();
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('make a request to get the posts from the API.', function () {
        $httpBackend.expectGET('/subrosa/v1/game/raleigh-wars/post?limit=20&offset=0').respond(posts);
        gameFeedFactory.get({gameUrl: 'raleigh-wars'}, function (response) {
            expect(response.offset).toBe(posts.offset);
            expect(response.limit).toBe(posts.limit);
            expect(response.results.length).toBe(posts.results.length);
        });
    });

    it('accepts limit and offset query string parameters.', function () {
        var limit = 100, offset = 1000;
        $httpBackend.expectGET('/subrosa/v1/game/raleigh-wars/post?limit=' + limit + '&offset=' + offset).respond("");
        gameFeedFactory.get({gameUrl: 'raleigh-wars', limit: limit, offset: offset});
    });
});

