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
            {type: 'danger', message: 'yo error!'},
            {type: 'success', message: 'successful!'}
        ];

        $compile(element)($scope);
        $scope.$digest();

        elementScope = element.isolateScope();
    });

    it("should display alerts if they are present", function () {
        expect(elementScope.alerts.length).toBe(2);
        expect(element.find('>.alert').length).toBe(2);
    });

    it("should not display alerts if they are not present", function () {
        $scope.notifications = [];
        $scope.$digest();

        expect(elementScope.alerts.length).toBe(0);
        expect(element.find('>.alert').length).toBe(0);
    });

    it("should allow the removal of alerts", function () {
        var firstAlert = element.find('>.alert').first();
        spyOn(elementScope, 'closeAlert').andCallThrough();

        firstAlert.find('.close').trigger('click');

        expect(element.find('>.alert').length).toBe(1);
        expect(elementScope.alerts.length).toBe(1);
        expect(elementScope.alerts[0].type).toBe('success');
    });

});