describe('Directive: addressChooser', function () {
    'use strict';

    var $scope, $compile, element, elementScope, Address, address;

    beforeEach(module(
        'subrosa.account',
        '/app/account/address/views/address-chooser.html',
        '/app/components/chooser/views/chooser.html',
        '/app/components/form/views/form-feedback.html',
        '/app/components/form/views/form-group-feedback.html',
        '/app/components/form/views/input-messages.html'
    ));

    beforeEach(module(function ($provide) {
        var handler = function (address, success, error) {
            if (!this.failed) {
                success();
            } else {
                error({data: {notifications: [1]}});
            }
        };

        Address = {
            failed: false,
            save: handler,
            delete: handler,
            update: function () {}
        };

        address = {fullAddress: '123 easy street'};

        $provide.value('Address', Address);
    }));

    beforeEach(inject(function (_$compile_, $rootScope) {
        $compile = _$compile_;
        $scope = $rootScope;
    }));

    beforeEach(function () {
        var html = '<div address-chooser="addresses"></div>';

        element = angular.element(html);

        $scope.addresses = [{id: 1}, {id: 2}, {id: 3}];
        $compile(element)($scope);
        $scope.$digest();

        elementScope = element.isolateScope();
    });

    it("initializes empty notification list", function () {
        expect(elementScope.chooserFormNotifications).toEqual([]);
    });

    describe("can save the address resource", function () {
        beforeEach(function () {
            spyOn(Address, 'save').and.callThrough();
        });

        it("and succeed.", function () {
            elementScope.saveResource(address);

            expect(Address.save).toHaveBeenCalledWith(address, jasmine.any(Function), jasmine.any(Function));
            expect(elementScope.chooserFormNotifications.length).toBe(1);
            expect(elementScope.chooserFormNotifications[0].type).toBe('success');
        });

        it("and fail.", function () {
            Address.failed = true;

            elementScope.saveResource(address);

            expect(Address.save).toHaveBeenCalledWith(address, jasmine.any(Function), jasmine.any(Function));
            expect(elementScope.chooserFormNotifications.length).toBe(1);
            expect(elementScope.selectedItem.edit).toBe(true);
        });

        it("and update the address if it already exists", function () {
            spyOn(Address, 'update');

            address.id = 1;
            elementScope.saveResource(address);

            expect(Address.update).toHaveBeenCalledWith(address, jasmine.any(Function), jasmine.any(Function));
            expect(Address.save).not.toHaveBeenCalled();
        });
    });

    describe("can delete the address resource", function () {
        var expectedDelete = {id: 1};
        beforeEach(function () {
            spyOn(Address, 'delete').and.callThrough();
            address.id = 1;
        });

        it("and succeed.", function () {
            elementScope.deleteResource(address);

            expect(Address.delete).toHaveBeenCalledWith(expectedDelete, jasmine.any(Function), jasmine.any(Function));
            expect(elementScope.chooserFormNotifications.length).toBe(1);
            expect(elementScope.chooserFormNotifications[0].type).toBe('success');
        });

        it("and fail.", function () {
            Address.failed = true;

            elementScope.deleteResource(address);

            expect(Address.delete).toHaveBeenCalledWith(expectedDelete, jasmine.any(Function), jasmine.any(Function));
            expect(elementScope.chooserFormNotifications.length).toBe(1);
        });
    });
});
