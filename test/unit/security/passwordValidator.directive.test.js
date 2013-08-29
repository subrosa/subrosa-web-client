'use strict'

describe('passwordChecker', function() {
    var $scope, form;

    beforeEach(module('security.directives'));

    beforeEach(inject(function($rootScope, $compile) {
        $scope = $rootScope;
        var element = angular.element('<form name="form"><input type="password" data-ng-model="user.password" name="password" data-password-validator/></form>');
        $scope.user = { password: null };
        $compile(element)($scope);
        $scope.$digest();
        form = $scope.form;
    }));

    describe('requires passwords to', function() {
        it('be at least 8 characters long.', function() {
            form.password.$setViewValue('abcde');
            expect(form.password.$valid).toBe(false);
            expect($scope.pwdValidLength).toBe(undefined);

            form.password.$setViewValue('abcdefgh');
            expect(form.password.$valid).toBe(false);
            expect($scope.pwdValidLength).toBe('valid');
        });

        it('contain at least one letter.', function() {
            form.password.$setViewValue('123456789!');
            expect(form.password.$valid).toBe(false);
            expect($scope.pwdHasLetter).toBe(undefined);

            form.password.$setViewValue('12345678a');
            expect(form.password.$valid).toBe(false);
            expect($scope.pwdHasLetter).toBe('valid');
        });

        it('contain at least one number.', function() {
            form.password.$setViewValue('abcdefg!');
            expect(form.password.$valid).toBe(false);
            expect($scope.pwdHasNumber).toBe(undefined);

            form.password.$setViewValue('12345351!');
            expect(form.password.$valid).toBe(false);
            expect($scope.pwdHasNumber).toBe('valid');
        });

        it('contain at least one special character.', function() {
            form.password.$setViewValue('ab1455fgh');
            expect(form.password.$valid).toBe(false);
            expect($scope.pwdHasSpecialChar).toBe(undefined);

            form.password.$setViewValue('12!');
            expect(form.password.$valid).toBe(false);
            expect($scope.pwdHasSpecialChar).toBe('valid');
        });
    });

    it('passwords are valid if they contain all of the above.', function() {
        form.password.$setViewValue('bitcheye1!');
        expect(form.password.$valid).toBe(true);
        expect($scope.pwdValidLength).toBe('valid');
        expect($scope.pwdHasLetter).toBe('valid');
        expect($scope.pwdHasNumber).toBe('valid');
        expect($scope.pwdHasSpecialChar).toBe('valid');
    });
});