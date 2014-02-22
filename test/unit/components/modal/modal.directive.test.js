describe('Directive: modal', function () {
    var $scope, $compile, modalCache, element;

    beforeEach(module('subrosa.components.modal'));

    beforeEach(module(function ($provide) {
        modalCache = {
            put: function () {},
            openModal: function () {}
        };

        $provide.value('modalCache', modalCache);
    }));

    beforeEach(inject(function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $scope = _$rootScope_;
    }));

    beforeEach(function () {
        element = angular.element(
            '<span modal="myModal" template-url="template.html">' +
                '<p>Hello!</p></span>');
    });

    it("registers the modal dialog with the modal service", function () {
        spyOn(modalCache, 'put').andCallThrough();

        $compile(element)($scope);
        $scope.$digest();

        expect(modalCache.put).toHaveBeenCalledWith('myModal', 'template.html');
    });
});