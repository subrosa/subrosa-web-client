'use strict'

describe('Game Feed Factory', function() {
    var gameFeedFactory, $httpBackend, $location, posts;

    beforeEach(module('subrosa.game'));

    beforeEach(function() {
        posts = {
            offset: 0,
            limit: 10,
            results: [
                {postId: 123, content: "Why hello there!"},
                {postId: 456, content: "HERRO!"}
            ]
        };

        module(function($provide) {
            $location = {
                path: function() { return "/raleigh-wars/feed"; }
            };
            $provide.value('$location', $location);
        });

        inject(function($injector) {
            $httpBackend = $injector.get('$httpBackend');
            gameFeedFactory = $injector.get('GameFeed');
        });
    });

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('make a request to get the posts from the API.', function() {
        $httpBackend.expectGET('/subrosa/v1/game/raleigh-wars/post?limit=20&offset=0').respond(posts);
        gameFeedFactory.get(function(response) {
            expect(response).toBe(posts);
        });
        $httpBackend.flush();
    });

    it('accepts limit and offset query string parameters.', function() {
        var limit = 100, offset = 1000;
        $httpBackend.expectGET('/subrosa/v1/game/raleigh-wars/post?limit='+limit+'&offset='+offset).respond("");
        gameFeedFactory.get({limit: limit, offset:offset});
        $httpBackend.flush();
        gameFeedFactory.get({});
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('maintains a cache of requests.', function() {
        $httpBackend.expectGET('/subrosa/v1/game/raleigh-wars/post?limit=20&offset=0').respond("");
        gameFeedFactory.get({});
        $httpBackend.flush();
        gameFeedFactory.get({});
        $httpBackend.verifyNoOutstandingRequest();
    });

});

