describe('Directive: focus', function () {
    var element;

    beforeEach(module('subrosa.utils'));

    beforeEach(inject(function ($document, $compile, $rootScope) {
        var html = '<form>' +
                     '<input type="text" focus/>' +
                     '<input type="password"/>' +
                   '</form>';

        element = angular.element(html);
        $document.find('body').append(element);

        $compile(element)($rootScope);
        $rootScope.$digest();
    }));

    it("focuses an element", function () {
        var textInput = element.find('[type="text"]'),
            passwordInput = element.find('[type="password"]');

        //see https://github.com/guard/guard-jasmine/issues/48
        //expect(textInput.is(':focus')).toBe(true);
        //expect(passwordInput.is(':focus')).toBe(false);

        expect(textInput.get(0)).toBe(element.get(0).ownerDocument.activeElement);
        expect(passwordInput.get(0)).not.toBe(element.get(0).ownerDocument.activeElement);
    });
});
