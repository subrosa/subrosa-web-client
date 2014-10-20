describe('Directive: formGroup', function () {
    var $compile, $scope, $httpBackend, element, elementScope;

    function compileDirective(info) {
        element = angular.element('<div form-group="info" data-model="user"></div>');
        $scope.info = info;
        $compile(element)($scope);
        $scope.$digest();
        elementScope = element.isolateScope();
    }

    beforeEach(module(
        'subrosa.components.form',
        '/app/components/form/views/input-feedback.html',
        '/app/components/form/views/input-messages.html',
        '/app/components/form/fields/views/form-group.html',
        '/app/components/form/fields/views/address-field.html',
        '/app/components/form/fields/views/image-field.html',
        '/app/components/form/fields/views/text-field.html'
    ));

    beforeEach(inject(function (_$compile_, _$rootScope_, _$httpBackend_) {
        $compile = _$compile_;
        $scope = _$rootScope_;
        $httpBackend = _$httpBackend_;
    }));

    beforeEach(function () {
        var info = {id: 'id', name: 'name', type: 'text', value: ''};
        compileDirective(info);
    });

    it("displays a bootstrap 3 .form-group", function () {
        expect(element.find('.form-group').length).toBe(1);
    });

    it("displays a bootstrap 3 .help-block and an error messages .help-block", function () {
        expect(element.find('.help-block').length).toBe(2);
    });

    it("displays bootstrap 3 label and input", function () {
        expect(element.find('label.control-label').length).toBe(1);
        expect(element.find('input.form-control').length).toBe(1);
    });

    it("picks the correct field based on type", function () {
        var info = {id: 'id', name: 'name', type: 'blah', value: ''};

        $httpBackend.expectGET('/app/components/form/fields/views/blah-field.html').respond({});

        compileDirective(info);
        $httpBackend.flush();

        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });
});
