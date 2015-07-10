describe('Directive: avatar', function () {
    'use strict';

    var $compile, $scope, element, elementScope, image;

    function compileDirective() {
        $compile(element)($scope);
        $scope.$digest();

        elementScope = element.scope();
        image = element.find('img');
    }

    beforeEach(module('subrosa.player', '/app/player/views/avatar.html'));

    beforeEach(inject(function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $scope = _$rootScope_;
    }));

    beforeEach(function () {
        element = angular.element('<div data-avatar="player" data-size="{{size}}"></div>');
        $scope.player = {username: null, images: {}};
    });

    it("displays an avatar is one is present", function () {
        var expectedImg = '/images/placeholder/user.png';
        $scope.player.images.AVATAR = expectedImg;
        compileDirective();
        expect(image.attr('src')).toBe(expectedImg);
    });

    it("displays a default avatar if the avatar is not present", function () {
        compileDirective();
        expect(image.attr('src')).toBe('/images/placeholder/user.png');
    });

    it("allows the setting of an avatar size", function () {
        $scope.size = 'md';
        compileDirective();
        expect(image.attr('class')).toContain('avatar-md');
    });
});
