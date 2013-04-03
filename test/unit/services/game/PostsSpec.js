'use strict'

describe('Posts service', function() {
    var postService, $httpBackend, $location, posts;

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
                path: function () { return "/raleigh-wars/feed"; }
            };
            $provide.value('$location', $location);
        });

        inject(function($injector) {
            $httpBackend = $injector.get('$httpBackend');
            postService = $injector.get('Posts');
        });
    });

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('make a request to get the posts from the API.', function() {
        $httpBackend.expectGET('/subrosa-api/v1/game/raleigh-wars/post?limit=20&offset=0').respond(posts);
        postService.get(function (response) {
            expect(response).toBe(posts);
        });
        $httpBackend.flush();
    });

    it('accepts limit and offset query string parameters.', function() {
        var limit = 100, offset = 1000;
        $httpBackend.expectGET('/subrosa-api/v1/game/raleigh-wars/post?limit='+limit+'&offset='+offset).respond("");
        postService.get({limit: limit, offset:offset});
        $httpBackend.flush();
        postService.get({});
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('maintains a cache of requests.', function() {
        $httpBackend.expectGET('/subrosa-api/v1/game/raleigh-wars/post?limit=20&offset=0').respond("");
        postService.get({});
        $httpBackend.flush();
        postService.get({});
        $httpBackend.verifyNoOutstandingRequest();
    });

});

