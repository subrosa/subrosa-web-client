describe('Directive: uploadSingleImage', function () {
    var $compile, $scope, element, elementScope;

    beforeEach(module(
        'subrosa.components.image',
        '/app/components/image/views/upload-single-image.html'
    ));

    beforeEach(inject(function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $scope = _$rootScope_;
    }));

    beforeEach(function () {
        element = angular.element('<div upload-single-image="\'/subrosa/v1/upload\'"></div>');
        $compile(element)($scope);
        $scope.$digest();
        elementScope = element.isolateScope();
        $scope.$flow = {files: []};
        elementScope.$flow = $scope.$flow;
    });

    it("displays a drag and drop area", function () {
        expect(element.find('.drop').length).toBe(1);
    });

    it("displays an upload button", function () {
        expect(element.find('[data-flow-btn=]').length).toBe(1);
    });

    it("displays a thumbnail if a file has been uploaded", function () {
        $scope.$flow.files = ['lalala'];
        $scope.$digest();
        expect(element.find('.thumbnail').length).toBe(1);
    });

    it("displays a progress bar if a file has been uploaded", function () {
        $scope.$flow.files = ['lalala'];
        $scope.$digest();
        expect(element.find('.progress').length).toBe(1);
        expect(element.find('.progress-bar').length).toBe(1);
    });
});
