describe('Directive: flash', function () {
    var $scope, $compile, element;

    beforeEach(module('subrosa.components.flash', '/app/components/flash/views/flash-messages.html'));

    beforeEach(inject(function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $scope = _$rootScope_;
    }));

    beforeEach(function () {
        element = angular.element('<div flash-messages></div>');
        $compile(element)($scope);
        $scope.$digest();
    });

    it("displays a notification display for flash messages.", function () {
        expect(element.find('[data-notification-display]').length).toBe(1);
    });
});
