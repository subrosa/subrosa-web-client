describe('Directive: formFeedback', function () {
    var $scope, $compile, element, elementScope;

    beforeEach(module('subrosa.forms', '/app/forms/views/form-feedback.html'));

    beforeEach(inject(function (_$compile_, $rootScope) {
        $compile = _$compile_;
        $scope = $rootScope;
    }));

    beforeEach(function () {
        element = angular.element('<div form-feedback="notifications"></div>');
        $scope.notifications = [
            {severity: 'ERROR', message: 'yo error!'},
            {severity: 'SUCCESS', message: 'successful!'}
        ];

        $compile(element)($scope);
        $scope.$digest();

        elementScope = element.isolateScope();
    });

    it("should display notifications if they are present", function () {
        expect(elementScope.notifications.length).toBe(2);
        expect(element.find('>.alert').length).toBe(2);
    });

    it("should not display notifications if they are not present", function () {
        $scope.notifications = [];
        $scope.$digest();

        expect(elementScope.notifications.length).toBe(0);
        expect(element.find('>.alert').length).toBe(0);
    });

    it("should set the notification type as danger if the severity is error", function () {
        $scope.notifications = [{severity: 'ERROR'}];
        $scope.$digest();
        expect(elementScope.notifications[0].type).toBe('danger');
    });

    it("should set the notification type to lower case severity otherwise", function () {
        $scope.notifications = [{severity: 'WARNING'}];
        $scope.$digest();
        expect(elementScope.notifications[0].type).toBe('warning');
    });

    it("should allow the removal of notifications", function () {
        var firstNotification = element.find('>.alert').first();
        spyOn(elementScope, 'closeNotification').andCallThrough();

        firstNotification.find('.close').trigger('click');

        expect(element.find('>.alert').length).toBe(1);
        expect(elementScope.notifications.length).toBe(1);
        expect(elementScope.notifications[0].type).toBe('success');
    });
});