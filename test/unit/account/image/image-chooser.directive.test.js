describe('Directive: imageChooser', function () {
    'use strict';

    var $scope, $compile, element, elementScope, Image, image;

    beforeEach(module(
        'subrosa.account',
        '/app/account/image/views/image-chooser.html',
        '/app/components/chooser/views/chooser.html',
        '/app/player/views/avatar.html',
        '/app/components/form/views/form-feedback.html',
        '/app/components/form/views/form-group-feedback.html',
        '/app/components/form/views/input-messages.html',
        '/app/components/image/views/upload-single-image.html'
    ));

    beforeEach(module(function ($provide) {
        var handler = function (image, success, error) {
            if (!this.failed) {
                success();
            } else {
                error({data: {notifications: [1]}});
            }
        };

        Image = {
            failed: false,
            update: handler,
            delete: handler
        };

        image = {url: 'walden.jpg'};

        $provide.value('Image', Image);
    }));

    beforeEach(inject(function (_$compile_, $rootScope) {
        $compile = _$compile_;
        $scope = $rootScope;
    }));

    beforeEach(function () {
        var html = '<div image-chooser="images"></div>';

        element = angular.element(html);

        $scope.images = [1, 2, 3];
        $compile(element)($scope);
        $scope.$digest();

        elementScope = element.isolateScope();
    });

    it("initializes empty notification list", function () {
        expect(elementScope.chooserFormNotifications).toEqual([]);
    });

    describe("can update the image resource", function () {
        beforeEach(function () {
            spyOn(Image, 'update').and.callThrough();
        });

        it("and succeed.", function () {
            elementScope.saveResource(image);

            expect(Image.update).toHaveBeenCalledWith(image, jasmine.any(Function), jasmine.any(Function));
            expect(elementScope.chooserFormNotifications.length).toBe(1);
            expect(elementScope.chooserFormNotifications[0].type).toBe('success');
        });

        it("and fail.", function () {
            Image.failed = true;

            elementScope.saveResource(image);

            expect(Image.update).toHaveBeenCalledWith(image, jasmine.any(Function), jasmine.any(Function));
            expect(elementScope.chooserFormNotifications.length).toBe(1);
        });
    });

    describe("can delete the image resource", function () {
        var expectedDelete = {id: 1};
        beforeEach(function () {
            spyOn(Image, 'delete').and.callThrough();
            image.id = 1;
        });

        it("and succeed.", function () {
            elementScope.deleteResource(image);

            expect(Image.delete).toHaveBeenCalledWith(expectedDelete, jasmine.any(Function), jasmine.any(Function));
            expect(elementScope.chooserFormNotifications.length).toBe(1);
            expect(elementScope.chooserFormNotifications[0].type).toBe('success');
        });

        it("and fail.", function () {
            Image.failed = true;

            elementScope.deleteResource(image);

            expect(Image.delete).toHaveBeenCalledWith(expectedDelete, jasmine.any(Function), jasmine.any(Function));
            expect(elementScope.chooserFormNotifications.length).toBe(1);
        });
    });
});
