describe('Directive: inputFeedback', function () {
    var $scope, $compile, element, elementScope;

    beforeEach(module('subrosa.forms', '/app/forms/views/input-feedback.html'));

    beforeEach(inject(function (_$compile_, $rootScope) {
        $compile = _$compile_;
        $scope = $rootScope;
    }));

    beforeEach(function () {
        element = angular.element('<div data-input-feedback="form.field">' +
                                    '<input type="text"/>' +
                                  '</div>');

        $compile(element)($scope);
        $scope.$digest();

        elementScope = element.isolateScope();
    });

    it("appends feedback icons to element", function () {
        expect(element.find('.glyphicon-ok').length).toBe(1);
        expect(element.find('.glyphicon-warning-sign').length).toBe(1);
        expect(element.find('.glyphicon-remove').length).toBe(1);
    });
});