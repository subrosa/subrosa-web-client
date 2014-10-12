describe('Directive: avatar', function () {
    var $compile, $scope, element, elementScope, image;

    function compileDirective() {
        $compile(element)($scope);
        $scope.$digest();

        elementScope = element.scope();
        image = element.find('img');
    }

    beforeEach(module('subrosa.components.image', '/app/components/image/views/avatar.html'));

    beforeEach(inject(function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $scope = _$rootScope_;
    }));

    beforeEach(function () {
        element = angular.element('<div data-avatar="account" data-size="{{size}}"></div>');
        $scope.account = {username: null, images: {}};
    });

    it("displays an avatar is one is present", function () {
        var expectedImg = 'pic.jpg';
        $scope.account.images.AVATAR = expectedImg;
        compileDirective();
        expect(image.attr('src')).toBe(expectedImg);
    });

    it("displays a default avatar if the avatar is not present", function () {
        compileDirective();
        expect(image.attr('src')).toBe('/img/placeholder/user.png');
    });

    it("allows the setting of an avatar size", function () {
        $scope.size = 'md';
        compileDirective();
        expect(image.attr('class')).toContain('avatar-md');
    });
});
