describe('Directive: notificationDisplay', function () {
    var $scope, $compile, element, elementScope;

    beforeEach(module('subrosa.notifications', '/app/notifications/views/notification-display.html'));

    beforeEach(inject(function (_$compile_, $rootScope) {
        $compile = _$compile_;
        $scope = $rootScope.$new();
    }));

    beforeEach(function () {
        element = angular.element('<div notification-display="notifications"></div>');

        $compile(element)($scope);
        elementScope = element.scope();

        $scope.notifications = [
            {severity: 'ERROR', message: 'yo error!'},
            {severity: 'SUCCESS', message: 'successful!'}
        ];
        $scope.$digest();
    });

    it("should display notifications if they are present", function () {
        expect(elementScope.notifications.length).toBe(2);
        expect(element.find('[data-alert=""]').length).toBe(2);
    });

    it("should not display notifications if they are not present", function () {
        $scope.notifications = [];
        $scope.$digest();

        expect(elementScope.notifications.length).toBe(0);
        expect(element.find('[data-alert=""]').length).toBe(0);
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
        var elementScope = element.isolateScope();
        elementScope.closeNotification(0);
        $scope.$digest();

        expect(element.find('[data-alert=""]').length).toBe(1);
        expect(elementScope.notifications.length).toBe(1);
        expect(elementScope.notifications[0].type).toBe('success');
    });
});