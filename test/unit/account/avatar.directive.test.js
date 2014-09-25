describe('Directive: avatar', function () {
    var $compile, $scope, element, elementScope, image, icon;

    function compileDirective() {
        $compile(element)($scope);
        $scope.$digest();

        elementScope = element.scope();
        icon = element.find('i');
        image = element.find('img');
    }

    beforeEach(module('subrosa.account', '/app/account/views/avatar.html'));

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
        expect(icon.attr('class')).toContain('ng-hide');
        expect(image.attr('src')).toBe(expectedImg);
    });

    it("displays an icon if the avatar is not present", function () {
        compileDirective();
        expect(image.attr('class')).toContain('ng-hide');
    });

    it("allows the setting of an avatar size", function () {
        $scope.size = 'md';
        compileDirective();
        expect(icon.attr('class')).toContain('avatar-md');
        expect(image.attr('class')).toContain('avatar-md');
    });
});
