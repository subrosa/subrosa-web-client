describe('Service: flash', function () {
    'use strict';

    var $rootScope, flashService;

    beforeEach(module('subrosa.components.flash'));

    beforeEach(module(function ($provide) {
        $rootScope = {};
        $provide.value('$rootScope', $rootScope);
    }));

    beforeEach(inject(function (_flash_) {
        flashService = _flash_;
    }));

    it("can add flash messages to the $rootScope.", function () {
        flashService.add('danger', 'danger!');
        expect($rootScope.flashMessages.length).toBe(1);
        expect($rootScope.flashMessages[0].type).toBe('danger');
        expect($rootScope.flashMessages[0].message).toBe('danger!');
    });
});
